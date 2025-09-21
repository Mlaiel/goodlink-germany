"""Listing management API endpoints"""

from fastapi import APIRouter, Depends, HTTPException, Query, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional, Dict, Any
import uuid

from app.core.database import get_db
from app.schemas.listings import (
    ListingCreate,
    ListingUpdate,
    ListingResponse,
    ListingList,
    BulkListingOperation,
    ListingGenerationRequest
)
from app.services.listings import ListingService
from app.agents.base import agent_manager, AgentTask
from app.core.exceptions import ValidationException, AIAgentException

router = APIRouter()


@router.post("/generate")
async def generate_listing(
    request: ListingGenerationRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    """Generate marketplace-specific listings using AI"""
    try:
        listing_service = ListingService(db)
        
        # Get the listing generator agent
        agent = await agent_manager.get_agent("listing_generator")
        if not agent:
            raise HTTPException(
                status_code=503, 
                detail="Listing generator agent not available"
            )
        
        # Create task for AI agent
        task = AgentTask(
            task_id=str(uuid.uuid4()),
            agent_id="listing_generator",
            task_type="generate_listing",
            input_data=request.dict()
        )
        
        # Submit task
        task_id = await agent.submit_task(task)
        
        return {
            "task_id": task_id,
            "status": "processing",
            "message": "Listing generation started. Check task status for results."
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/generate/status/{task_id}")
async def get_generation_status(task_id: str):
    """Get the status of a listing generation task"""
    try:
        agent = await agent_manager.get_agent("listing_generator")
        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")
        
        task = await agent.get_task_status(task_id)
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        
        return {
            "task_id": task_id,
            "status": task.status,
            "progress": task.progress_percentage,
            "progress_message": task.progress_message,
            "result": task.result,
            "error": task.error_message,
            "confidence_score": task.confidence_score
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", response_model=ListingResponse)
async def create_listing(
    listing: ListingCreate,
    db: AsyncSession = Depends(get_db)
):
    """Create a new listing"""
    try:
        listing_service = ListingService(db)
        created_listing = await listing_service.create_listing(listing)
        return created_listing
    except ValidationException as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=ListingList)
async def list_listings(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    marketplace: Optional[str] = Query(None),
    product_id: Optional[uuid.UUID] = Query(None),
    status: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    """List listings with filtering and pagination"""
    listing_service = ListingService(db)
    
    filters = {}
    if marketplace:
        filters["marketplace"] = marketplace
    if product_id:
        filters["product_id"] = product_id
    if status:
        filters["status"] = status
    
    listings = await listing_service.list_listings(
        skip=skip,
        limit=limit,
        filters=filters
    )
    
    return listings


@router.get("/{listing_id}", response_model=ListingResponse)
async def get_listing(
    listing_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    """Get a specific listing by ID"""
    listing_service = ListingService(db)
    listing = await listing_service.get_listing(listing_id)
    
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    return listing


@router.put("/{listing_id}", response_model=ListingResponse)
async def update_listing(
    listing_id: uuid.UUID,
    listing_update: ListingUpdate,
    db: AsyncSession = Depends(get_db)
):
    """Update a listing"""
    try:
        listing_service = ListingService(db)
        updated_listing = await listing_service.update_listing(listing_id, listing_update)
        
        if not updated_listing:
            raise HTTPException(status_code=404, detail="Listing not found")
        
        return updated_listing
    except ValidationException as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/{listing_id}/publish")
async def publish_listing(
    listing_id: uuid.UUID,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    """Publish a listing to its marketplace"""
    try:
        listing_service = ListingService(db)
        
        # Add background task for publishing
        background_tasks.add_task(
            listing_service.publish_to_marketplace, 
            listing_id
        )
        
        return {
            "message": "Listing publication started",
            "listing_id": str(listing_id)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{listing_id}/sync")
async def sync_listing(
    listing_id: uuid.UUID,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    """Sync listing data from marketplace"""
    try:
        listing_service = ListingService(db)
        
        # Add background task for syncing
        background_tasks.add_task(
            listing_service.sync_from_marketplace, 
            listing_id
        )
        
        return {
            "message": "Listing sync started",
            "listing_id": str(listing_id)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{listing_id}")
async def delete_listing(
    listing_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    """Delete a listing"""
    listing_service = ListingService(db)
    success = await listing_service.delete_listing(listing_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    return {"message": "Listing deleted successfully"}


@router.post("/bulk")
async def bulk_listing_operations(
    operation: BulkListingOperation,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    """Perform bulk operations on listings"""
    try:
        listing_service = ListingService(db)
        
        # Add background task for bulk operations
        background_tasks.add_task(
            listing_service.bulk_operations, 
            operation
        )
        
        return {
            "message": "Bulk operation started",
            "operation_type": operation.operation_type,
            "listing_count": len(operation.listing_ids)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{listing_id}/performance")
async def get_listing_performance(
    listing_id: uuid.UUID,
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    """Get performance metrics for a listing"""
    try:
        listing_service = ListingService(db)
        performance = await listing_service.get_listing_performance(
            listing_id, start_date, end_date
        )
        return performance
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{listing_id}/optimize")
async def optimize_listing(
    listing_id: uuid.UUID,
    optimization_type: str = Query("full", regex="^(title|description|keywords|images|full)$"),
    db: AsyncSession = Depends(get_db)
):
    """Optimize a listing using AI recommendations"""
    try:
        listing_service = ListingService(db)
        
        # Get optimization agent
        agent = await agent_manager.get_agent("listing_optimizer")
        if not agent:
            raise HTTPException(
                status_code=503, 
                detail="Listing optimizer agent not available"
            )
        
        # Create optimization task
        task = AgentTask(
            task_id=str(uuid.uuid4()),
            agent_id="listing_optimizer",
            task_type="optimize_listing",
            input_data={
                "listing_id": str(listing_id),
                "optimization_type": optimization_type
            }
        )
        
        task_id = await agent.submit_task(task)
        
        return {
            "task_id": task_id,
            "status": "processing",
            "optimization_type": optimization_type
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{listing_id}/reviews")
async def get_listing_reviews(
    listing_id: uuid.UUID,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    rating_filter: Optional[int] = Query(None, ge=1, le=5),
    db: AsyncSession = Depends(get_db)
):
    """Get reviews for a listing"""
    try:
        listing_service = ListingService(db)
        reviews = await listing_service.get_listing_reviews(
            listing_id, skip, limit, rating_filter
        )
        return reviews
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))