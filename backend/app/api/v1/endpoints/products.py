"""Product management API endpoints"""

from fastapi import APIRouter, Depends, HTTPException, Query, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional, Dict, Any
import uuid

from app.core.database import get_db
from app.schemas.products import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,
    ProductList,
    BulkProductOperation
)
from app.services.products import ProductService
from app.services.ai_content import AIContentService
from app.core.exceptions import ValidationException

router = APIRouter()


@router.post("/", response_model=ProductResponse)
async def create_product(
    product: ProductCreate,
    db: AsyncSession = Depends(get_db)
):
    """Create a new product"""
    try:
        product_service = ProductService(db)
        created_product = await product_service.create_product(product)
        return created_product
    except ValidationException as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=ProductList)
async def list_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    search: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    brand: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    """List products with filtering and pagination"""
    product_service = ProductService(db)
    
    filters = {}
    if category:
        filters["category"] = category
    if brand:
        filters["brand"] = brand
    if status:
        filters["status"] = status
    
    products = await product_service.list_products(
        skip=skip,
        limit=limit,
        search=search,
        filters=filters
    )
    
    return products


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    """Get a specific product by ID"""
    product_service = ProductService(db)
    product = await product_service.get_product(product_id)
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return product


@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: uuid.UUID,
    product_update: ProductUpdate,
    db: AsyncSession = Depends(get_db)
):
    """Update a product"""
    try:
        product_service = ProductService(db)
        updated_product = await product_service.update_product(product_id, product_update)
        
        if not updated_product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        return updated_product
    except ValidationException as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{product_id}")
async def delete_product(
    product_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    """Delete a product"""
    product_service = ProductService(db)
    success = await product_service.delete_product(product_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {"message": "Product deleted successfully"}


@router.post("/{product_id}/images")
async def upload_product_images(
    product_id: uuid.UUID,
    files: List[UploadFile] = File(...),
    db: AsyncSession = Depends(get_db)
):
    """Upload images for a product"""
    product_service = ProductService(db)
    
    # Validate file types
    allowed_types = ["image/jpeg", "image/png", "image/webp"]
    for file in files:
        if file.content_type not in allowed_types:
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid file type: {file.content_type}"
            )
    
    try:
        image_urls = await product_service.upload_images(product_id, files)
        return {"image_urls": image_urls}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{product_id}/ai-enhance")
async def ai_enhance_product(
    product_id: uuid.UUID,
    language: str = Query("en", regex="^(en|de|zh)$"),
    target_audience: str = Query("general"),
    db: AsyncSession = Depends(get_db)
):
    """Use AI to enhance product content (title, description, keywords)"""
    try:
        product_service = ProductService(db)
        ai_content_service = AIContentService()
        
        # Get the product
        product = await product_service.get_product(product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Generate enhanced content
        enhanced_content = await ai_content_service.enhance_product_content(
            product=product,
            language=language,
            target_audience=target_audience
        )
        
        return enhanced_content
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/bulk")
async def bulk_product_operations(
    operation: BulkProductOperation,
    db: AsyncSession = Depends(get_db)
):
    """Perform bulk operations on products"""
    try:
        product_service = ProductService(db)
        result = await product_service.bulk_operations(operation)
        return result
    except ValidationException as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{product_id}/similar")
async def find_similar_products(
    product_id: uuid.UUID,
    limit: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db)
):
    """Find similar products using AI embeddings"""
    try:
        product_service = ProductService(db)
        similar_products = await product_service.find_similar_products(
            product_id, limit
        )
        return {"similar_products": similar_products}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/import/csv")
async def import_products_csv(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    """Import products from CSV file"""
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="File must be a CSV")
    
    try:
        product_service = ProductService(db)
        result = await product_service.import_from_csv(file)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/export/csv")
async def export_products_csv(
    category: Optional[str] = Query(None),
    brand: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    """Export products to CSV file"""
    try:
        product_service = ProductService(db)
        
        filters = {}
        if category:
            filters["category"] = category
        if brand:
            filters["brand"] = brand
        
        csv_data = await product_service.export_to_csv(filters)
        
        from fastapi.responses import StreamingResponse
        import io
        
        return StreamingResponse(
            io.StringIO(csv_data),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=products.csv"}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{product_id}/analytics")
async def get_product_analytics(
    product_id: uuid.UUID,
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    """Get analytics data for a product"""
    try:
        product_service = ProductService(db)
        analytics = await product_service.get_product_analytics(
            product_id, start_date, end_date
        )
        return analytics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))