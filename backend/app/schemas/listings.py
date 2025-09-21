"""Pydantic schemas for listing management"""

from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
from enum import Enum

from app.models.database import MarketplaceType, ListingStatus


class ListingBase(BaseModel):
    """Base listing schema"""
    product_id: uuid.UUID
    marketplace: MarketplaceType
    title: str = Field(..., min_length=1, max_length=500)
    description: Optional[str] = None
    bullet_points: Optional[List[str]] = None
    keywords: Optional[List[str]] = None
    images: Optional[List[str]] = None
    price: float = Field(..., ge=0)
    sale_price: Optional[float] = Field(None, ge=0)
    currency: str = Field("EUR", regex="^[A-Z]{3}$")
    marketplace_data: Optional[Dict[str, Any]] = None
    compliance_flags: Optional[List[str]] = None

    @validator('bullet_points')
    def validate_bullet_points(cls, v):
        if v and len(v) > 10:
            raise ValueError('Maximum 10 bullet points allowed')
        return v

    @validator('keywords')
    def validate_keywords(cls, v):
        if v and len(v) > 20:
            raise ValueError('Maximum 20 keywords allowed')
        return v

    @validator('sale_price')
    def validate_sale_price(cls, v, values):
        if v and 'price' in values and v >= values['price']:
            raise ValueError('Sale price must be less than regular price')
        return v


class ListingCreate(ListingBase):
    """Schema for creating a listing"""
    status: ListingStatus = ListingStatus.DRAFT


class ListingUpdate(BaseModel):
    """Schema for updating a listing"""
    title: Optional[str] = Field(None, min_length=1, max_length=500)
    description: Optional[str] = None
    bullet_points: Optional[List[str]] = None
    keywords: Optional[List[str]] = None
    images: Optional[List[str]] = None
    price: Optional[float] = Field(None, ge=0)
    sale_price: Optional[float] = Field(None, ge=0)
    currency: Optional[str] = Field(None, regex="^[A-Z]{3}$")
    status: Optional[ListingStatus] = None
    marketplace_data: Optional[Dict[str, Any]] = None
    compliance_flags: Optional[List[str]] = None


class ListingResponse(ListingBase):
    """Schema for listing responses"""
    id: uuid.UUID
    external_id: Optional[str]
    parent_id: Optional[str]
    status: ListingStatus
    is_buy_box_winner: bool
    rank: Optional[int]
    views: int
    clicks: int
    conversions: int
    errors: Optional[List[str]]
    last_sync_at: Optional[datetime]
    sync_status: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]
    published_at: Optional[datetime]

    class Config:
        from_attributes = True


class ListingList(BaseModel):
    """Schema for listing list responses"""
    items: List[ListingResponse]
    total: int
    skip: int
    limit: int


class ListingGenerationRequest(BaseModel):
    """Schema for AI listing generation requests"""
    product_id: uuid.UUID
    marketplace: MarketplaceType
    language: str = Field("en", regex="^(en|de|zh)$")
    target_audience: str = "general"
    optimization_focus: Optional[str] = "conversion"
    include_translations: bool = False
    auto_publish: bool = False

    class Config:
        use_enum_values = True


class GeneratedListing(BaseModel):
    """Schema for AI-generated listing content"""
    title: str
    description: str
    bullet_points: List[str]
    keywords: List[str]
    compliance_notes: str
    confidence_score: float
    marketplace_specific_attributes: Dict[str, Any]
    translations: Optional[Dict[str, Dict[str, Any]]] = None


class ListingGenerationResponse(BaseModel):
    """Schema for listing generation responses"""
    task_id: str
    status: str
    generated_content: Optional[GeneratedListing] = None
    validation_results: Optional[Dict[str, Any]] = None
    recommendations: Optional[List[str]] = None


class BulkListingOperationType(str, Enum):
    """Types of bulk listing operations"""
    PUBLISH = "publish"
    UNPUBLISH = "unpublish"
    UPDATE_PRICES = "update_prices"
    SYNC = "sync"
    DELETE = "delete"
    UPDATE_STATUS = "update_status"


class BulkListingOperation(BaseModel):
    """Schema for bulk listing operations"""
    operation_type: BulkListingOperationType
    listing_ids: List[uuid.UUID]
    parameters: Optional[Dict[str, Any]] = None

    @validator('listing_ids')
    def validate_listing_ids(cls, v):
        if len(v) == 0:
            raise ValueError('At least one listing ID is required')
        if len(v) > 500:
            raise ValueError('Maximum 500 listings per bulk operation')
        return v


class ListingPerformance(BaseModel):
    """Schema for listing performance metrics"""
    listing_id: uuid.UUID
    period_start: datetime
    period_end: datetime
    impressions: int
    clicks: int
    click_through_rate: float
    conversions: int
    conversion_rate: float
    revenue: float
    average_order_value: float
    buy_box_percentage: float
    rank_average: Optional[float]
    review_count: int
    average_rating: Optional[float]


class ListingOptimizationSuggestion(BaseModel):
    """Schema for listing optimization suggestions"""
    suggestion_type: str
    priority: str  # high, medium, low
    title: str
    description: str
    current_value: Optional[str]
    suggested_value: str
    expected_impact: str
    confidence_score: float
    implementation_effort: str  # easy, medium, hard


class ListingOptimizationReport(BaseModel):
    """Schema for listing optimization reports"""
    listing_id: uuid.UUID
    overall_score: float
    suggestions: List[ListingOptimizationSuggestion]
    benchmark_comparison: Dict[str, Any]
    priority_actions: List[str]
    estimated_impact: Dict[str, float]


class MarketplaceListingRequirements(BaseModel):
    """Schema for marketplace-specific listing requirements"""
    marketplace: MarketplaceType
    category: str
    required_fields: List[str]
    optional_fields: List[str]
    field_limits: Dict[str, Dict[str, Any]]
    compliance_rules: List[str]
    style_guidelines: Dict[str, str]
    examples: Dict[str, str]


class ListingSyncStatus(BaseModel):
    """Schema for listing sync status"""
    listing_id: uuid.UUID
    marketplace: MarketplaceType
    last_sync_at: Optional[datetime]
    sync_status: str
    sync_errors: Optional[List[str]]
    next_sync_at: Optional[datetime]
    manual_sync_required: bool


class ListingComplianceCheck(BaseModel):
    """Schema for listing compliance check results"""
    listing_id: uuid.UUID
    marketplace: MarketplaceType
    is_compliant: bool
    compliance_score: float
    violations: List[Dict[str, Any]]
    warnings: List[Dict[str, Any]]
    recommendations: List[str]
    last_checked: datetime