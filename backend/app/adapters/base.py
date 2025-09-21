"""Base marketplace adapter interface"""

from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Any
from datetime import datetime
from pydantic import BaseModel

from app.models.database import MarketplaceType, Listing, Order


class MarketplaceCredentials(BaseModel):
    """Base credentials model for marketplace authentication"""
    marketplace: MarketplaceType
    credentials: Dict[str, Any]


class ListingData(BaseModel):
    """Standardized listing data across marketplaces"""
    title: str
    description: str
    bullet_points: List[str]
    keywords: List[str]
    images: List[str]
    price: float
    currency: str = "EUR"
    category: str
    attributes: Dict[str, Any]
    compliance_flags: List[str] = []


class InventoryUpdate(BaseModel):
    """Inventory update data"""
    sku: str
    quantity: int
    location: Optional[str] = None


class OrderData(BaseModel):
    """Standardized order data"""
    external_order_id: str
    customer_name: str
    customer_email: Optional[str]
    shipping_address: Dict[str, Any]
    billing_address: Optional[Dict[str, Any]]
    total: float
    items: List[Dict[str, Any]]
    placed_at: datetime
    status: str


class ReviewData(BaseModel):
    """Standardized review data"""
    external_review_id: str
    rating: int
    title: Optional[str]
    body: str
    reviewer_name: str
    review_date: datetime
    verified_purchase: bool = False


class AdCampaignData(BaseModel):
    """Advertisement campaign data"""
    campaign_id: str
    name: str
    budget: float
    bid_amount: float
    keywords: List[str]
    status: str


class MarketplaceAdapter(ABC):
    """Abstract base class for marketplace adapters"""
    
    def __init__(self, credentials: MarketplaceCredentials):
        self.credentials = credentials
        self.marketplace = credentials.marketplace
        self._client = None
    
    @abstractmethod
    async def authenticate(self) -> bool:
        """Authenticate with the marketplace API"""
        pass
    
    @abstractmethod
    async def test_connection(self) -> bool:
        """Test the API connection"""
        pass
    
    # Product & Listing Management
    @abstractmethod
    async def publish_listing(self, listing_data: ListingData) -> Dict[str, Any]:
        """Publish a new listing"""
        pass
    
    @abstractmethod
    async def update_listing(self, external_id: str, listing_data: ListingData) -> Dict[str, Any]:
        """Update an existing listing"""
        pass
    
    @abstractmethod
    async def delete_listing(self, external_id: str) -> bool:
        """Delete a listing"""
        pass
    
    @abstractmethod
    async def get_listing(self, external_id: str) -> Optional[Dict[str, Any]]:
        """Get listing details"""
        pass
    
    # Inventory Management
    @abstractmethod
    async def update_inventory(self, sku: str, quantity: int) -> bool:
        """Update inventory quantity"""
        pass
    
    @abstractmethod
    async def get_inventory(self, sku: str) -> Optional[Dict[str, Any]]:
        """Get current inventory levels"""
        pass
    
    @abstractmethod
    async def bulk_update_inventory(self, updates: List[InventoryUpdate]) -> Dict[str, Any]:
        """Bulk update inventory for multiple SKUs"""
        pass
    
    # Order Management
    @abstractmethod
    async def fetch_orders(self, since: datetime) -> List[OrderData]:
        """Fetch orders since a specific date"""
        pass
    
    @abstractmethod
    async def get_order(self, external_order_id: str) -> Optional[OrderData]:
        """Get specific order details"""
        pass
    
    @abstractmethod
    async def update_order_status(self, external_order_id: str, status: str, tracking_number: Optional[str] = None) -> bool:
        """Update order status and tracking"""
        pass
    
    # Reviews
    @abstractmethod
    async def fetch_reviews(self, external_id: str, since: Optional[datetime] = None) -> List[ReviewData]:
        """Fetch product reviews"""
        pass
    
    # Advertising
    @abstractmethod
    async def create_ad_campaign(self, campaign: AdCampaignData) -> Dict[str, Any]:
        """Create advertising campaign"""
        pass
    
    @abstractmethod
    async def update_ad_campaign(self, campaign_id: str, updates: Dict[str, Any]) -> Dict[str, Any]:
        """Update advertising campaign"""
        pass
    
    @abstractmethod
    async def get_ad_performance(self, campaign_id: str, start_date: datetime, end_date: datetime) -> Dict[str, Any]:
        """Get advertising performance metrics"""
        pass
    
    # Analytics
    @abstractmethod
    async def get_listing_performance(self, external_id: str, start_date: datetime, end_date: datetime) -> Dict[str, Any]:
        """Get listing performance metrics"""
        pass
    
    # Utility methods
    def get_marketplace_specific_attributes(self, category: str) -> Dict[str, Any]:
        """Get marketplace-specific required attributes for a category"""
        return {}
    
    def validate_listing_data(self, listing_data: ListingData) -> List[str]:
        """Validate listing data for marketplace compliance"""
        errors = []
        
        # Basic validation
        if not listing_data.title:
            errors.append("Title is required")
        if not listing_data.description:
            errors.append("Description is required")
        if listing_data.price <= 0:
            errors.append("Price must be greater than 0")
        
        return errors
    
    def format_price(self, price: float, currency: str = "EUR") -> str:
        """Format price according to marketplace requirements"""
        return f"{price:.2f}"
    
    def sanitize_text(self, text: str) -> str:
        """Sanitize text for marketplace compliance"""
        # Remove prohibited characters/words
        # Handle HTML encoding
        return text.strip()


class MarketplaceAdapterFactory:
    """Factory for creating marketplace adapters"""
    
    _adapters = {}
    
    @classmethod
    def register_adapter(cls, marketplace: MarketplaceType, adapter_class):
        """Register an adapter for a marketplace"""
        cls._adapters[marketplace] = adapter_class
    
    @classmethod
    def create_adapter(cls, credentials: MarketplaceCredentials) -> MarketplaceAdapter:
        """Create an adapter instance for the specified marketplace"""
        adapter_class = cls._adapters.get(credentials.marketplace)
        if not adapter_class:
            raise ValueError(f"No adapter registered for marketplace: {credentials.marketplace}")
        
        return adapter_class(credentials)
    
    @classmethod
    def get_supported_marketplaces(cls) -> List[MarketplaceType]:
        """Get list of supported marketplaces"""
        return list(cls._adapters.keys())