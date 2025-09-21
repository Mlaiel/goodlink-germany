"""Pydantic schemas for product management"""

from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
from enum import Enum

from app.models.database import ProductStatus


class ProductBase(BaseModel):
    """Base product schema"""
    sku: str = Field(..., min_length=1, max_length=100)
    brand: str = Field(..., min_length=1, max_length=100)
    category: str = Field(..., min_length=1, max_length=100)
    title: str = Field(..., min_length=1, max_length=500)
    description: Optional[str] = None
    specifications: Optional[Dict[str, Any]] = None
    attributes: Optional[Dict[str, Any]] = None
    images: Optional[List[str]] = None
    weight: Optional[float] = Field(None, ge=0)
    dimensions: Optional[Dict[str, float]] = None
    compliance_flags: Optional[List[str]] = None
    certifications: Optional[Dict[str, Any]] = None
    cost_price: Optional[float] = Field(None, ge=0)
    suggested_price: Optional[float] = Field(None, ge=0)
    min_price: Optional[float] = Field(None, ge=0)
    reorder_point: Optional[int] = Field(10, ge=0)
    lead_time_days: Optional[int] = Field(14, ge=0)
    keywords: Optional[List[str]] = None
    meta_description: Optional[str] = Field(None, max_length=500)

    @validator('images')
    def validate_images(cls, v):
        if v and len(v) > 20:
            raise ValueError('Maximum 20 images allowed')
        return v

    @validator('keywords')
    def validate_keywords(cls, v):
        if v and len(v) > 50:
            raise ValueError('Maximum 50 keywords allowed')
        return v


class ProductCreate(ProductBase):
    """Schema for creating a product"""
    status: ProductStatus = ProductStatus.DRAFT


class ProductUpdate(BaseModel):
    """Schema for updating a product"""
    sku: Optional[str] = Field(None, min_length=1, max_length=100)
    brand: Optional[str] = Field(None, min_length=1, max_length=100)
    category: Optional[str] = Field(None, min_length=1, max_length=100)
    title: Optional[str] = Field(None, min_length=1, max_length=500)
    description: Optional[str] = None
    specifications: Optional[Dict[str, Any]] = None
    attributes: Optional[Dict[str, Any]] = None
    images: Optional[List[str]] = None
    weight: Optional[float] = Field(None, ge=0)
    dimensions: Optional[Dict[str, float]] = None
    status: Optional[ProductStatus] = None
    compliance_flags: Optional[List[str]] = None
    certifications: Optional[Dict[str, Any]] = None
    cost_price: Optional[float] = Field(None, ge=0)
    suggested_price: Optional[float] = Field(None, ge=0)
    min_price: Optional[float] = Field(None, ge=0)
    reorder_point: Optional[int] = Field(None, ge=0)
    lead_time_days: Optional[int] = Field(None, ge=0)
    keywords: Optional[List[str]] = None
    meta_description: Optional[str] = Field(None, max_length=500)


class ProductResponse(ProductBase):
    """Schema for product responses"""
    id: uuid.UUID
    status: ProductStatus
    total_stock: int
    reserved_stock: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


class ProductList(BaseModel):
    """Schema for product list responses"""
    items: List[ProductResponse]
    total: int
    skip: int
    limit: int


class ProductSummary(BaseModel):
    """Schema for product summary (lightweight)"""
    id: uuid.UUID
    sku: str
    brand: str
    title: str
    status: ProductStatus
    total_stock: int
    suggested_price: Optional[float]
    created_at: datetime

    class Config:
        from_attributes = True


class BulkOperationType(str, Enum):
    """Types of bulk operations"""
    UPDATE_STATUS = "update_status"
    UPDATE_PRICES = "update_prices"
    UPDATE_INVENTORY = "update_inventory"
    DELETE = "delete"
    EXPORT = "export"


class BulkProductOperation(BaseModel):
    """Schema for bulk product operations"""
    operation_type: BulkOperationType
    product_ids: List[uuid.UUID]
    parameters: Optional[Dict[str, Any]] = None

    @validator('product_ids')
    def validate_product_ids(cls, v):
        if len(v) == 0:
            raise ValueError('At least one product ID is required')
        if len(v) > 1000:
            raise ValueError('Maximum 1000 products per bulk operation')
        return v


class ProductAnalytics(BaseModel):
    """Schema for product analytics"""
    product_id: uuid.UUID
    period_start: datetime
    period_end: datetime
    total_views: int
    total_orders: int
    total_revenue: float
    conversion_rate: float
    average_rating: Optional[float]
    review_count: int
    marketplace_performance: Dict[str, Dict[str, Any]]
    top_keywords: List[str]
    competitor_analysis: Optional[Dict[str, Any]]


class AIEnhancedContent(BaseModel):
    """Schema for AI-enhanced product content"""
    enhanced_title: str
    enhanced_description: str
    suggested_keywords: List[str]
    bullet_points: List[str]
    meta_description: str
    confidence_score: float
    language: str
    marketplace_specific: Dict[str, Dict[str, Any]]


class ProductImportResult(BaseModel):
    """Schema for product import results"""
    total_processed: int
    successful_imports: int
    failed_imports: int
    errors: List[Dict[str, Any]]
    warnings: List[Dict[str, Any]]
    imported_product_ids: List[uuid.UUID]


class ProductSearchRequest(BaseModel):
    """Schema for product search requests"""
    query: str = Field(..., min_length=1, max_length=500)
    filters: Optional[Dict[str, Any]] = None
    sort_by: Optional[str] = "relevance"
    sort_order: Optional[str] = "desc"
    include_similar: bool = False
    limit: int = Field(50, ge=1, le=200)


class ProductSearchResult(BaseModel):
    """Schema for product search results"""
    products: List[ProductSummary]
    total_results: int
    search_time_ms: float
    suggestions: List[str]
    filters_applied: Dict[str, Any]