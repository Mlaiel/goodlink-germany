"""Database models for Goodlink Germany"""

from sqlalchemy import (
    Column, Integer, String, Text, JSON, DateTime, Boolean, 
    Float, ForeignKey, Index, Enum as SQLEnum
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from pgvector.sqlalchemy import Vector
import uuid
import enum
from datetime import datetime

from app.core.database import Base


class MarketplaceType(enum.Enum):
    AMAZON = "amazon"
    EBAY = "ebay"
    OTTO = "otto"
    KAUFLAND = "kaufland"
    CDISCOUNT = "cdiscount"
    BOL_COM = "bol_com"
    ALLEGRO = "allegro"
    WALMART = "walmart"
    NOON = "noon"
    JUMIA = "jumia"
    GOODLINK_SHOP = "goodlink_shop"


class ProductStatus(enum.Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    INACTIVE = "inactive"
    DISCONTINUED = "discontinued"


class ListingStatus(enum.Enum):
    DRAFT = "draft"
    PENDING = "pending"
    ACTIVE = "active"
    INACTIVE = "inactive"
    ERROR = "error"
    SUSPENDED = "suspended"


class OrderStatus(enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"


class Product(Base):
    __tablename__ = "products"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sku = Column(String(100), unique=True, nullable=False, index=True)
    brand = Column(String(100), nullable=False)
    category = Column(String(100), nullable=False)
    title = Column(String(500), nullable=False)
    description = Column(Text)
    specifications = Column(JSON)  # Technical specs, dimensions, etc.
    attributes = Column(JSON)  # Flexible product attributes
    images = Column(ARRAY(String))  # Image URLs
    weight = Column(Float)  # kg
    dimensions = Column(JSON)  # length, width, height in cm
    status = Column(SQLEnum(ProductStatus), default=ProductStatus.DRAFT)
    
    # Compliance & Certifications
    compliance_flags = Column(ARRAY(String))  # CE, MDR, RoHS, etc.
    certifications = Column(JSON)
    
    # Pricing
    cost_price = Column(Float)  # Purchase cost
    suggested_price = Column(Float)  # Suggested retail price
    min_price = Column(Float)  # Minimum selling price
    
    # Inventory
    total_stock = Column(Integer, default=0)
    reserved_stock = Column(Integer, default=0)
    reorder_point = Column(Integer, default=10)
    lead_time_days = Column(Integer, default=14)
    
    # SEO & Content
    keywords = Column(ARRAY(String))
    meta_description = Column(String(500))
    
    # Vector embedding for AI similarity search
    embedding = Column(Vector(1536))  # OpenAI ada-002 embedding size
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    listings = relationship("Listing", back_populates="product", cascade="all, delete-orphan")
    inventory_items = relationship("Inventory", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")
    
    __table_args__ = (
        Index("ix_products_brand_category", "brand", "category"),
        Index("ix_products_status_updated", "status", "updated_at"),
        Index("ix_products_embedding", "embedding", postgresql_using="ivfflat"),
    )


class Listing(Base):
    __tablename__ = "listings"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    marketplace = Column(SQLEnum(MarketplaceType), nullable=False)
    
    # Marketplace-specific IDs
    external_id = Column(String(100))  # ASIN, Item ID, etc.
    parent_id = Column(String(100))  # For variations
    
    # Listing content (marketplace-specific)
    title = Column(String(500), nullable=False)
    description = Column(Text)
    bullet_points = Column(ARRAY(String))
    keywords = Column(ARRAY(String))
    images = Column(ARRAY(String))
    
    # Pricing
    price = Column(Float, nullable=False)
    sale_price = Column(Float)
    currency = Column(String(3), default="EUR")
    
    # Marketplace-specific attributes
    marketplace_data = Column(JSON)  # Category-specific attributes
    compliance_flags = Column(ARRAY(String))
    
    # Status & Performance
    status = Column(SQLEnum(ListingStatus), default=ListingStatus.DRAFT)
    is_buy_box_winner = Column(Boolean, default=False)
    rank = Column(Integer)
    views = Column(Integer, default=0)
    clicks = Column(Integer, default=0)
    conversions = Column(Integer, default=0)
    
    # Error handling
    errors = Column(ARRAY(String))
    last_sync_at = Column(DateTime(timezone=True))
    sync_status = Column(String(50))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    published_at = Column(DateTime(timezone=True))
    
    # Relationships
    product = relationship("Product", back_populates="listings")
    reviews = relationship("Review", back_populates="listing")
    
    __table_args__ = (
        Index("ix_listings_marketplace_external", "marketplace", "external_id"),
        Index("ix_listings_status_marketplace", "status", "marketplace"),
        Index("ix_listings_product_marketplace", "product_id", "marketplace"),
    )


class Inventory(Base):
    __tablename__ = "inventory"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    warehouse = Column(String(100), nullable=False, default="main")
    
    # Stock levels
    quantity = Column(Integer, nullable=False, default=0)
    reserved = Column(Integer, default=0)
    incoming = Column(Integer, default=0)  # Purchase orders
    
    # Thresholds
    reorder_point = Column(Integer, default=10)
    max_stock = Column(Integer, default=1000)
    
    # Location
    location = Column(String(100))  # Bin location in warehouse
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_count_at = Column(DateTime(timezone=True))
    
    # Relationships
    product = relationship("Product", back_populates="inventory_items")
    
    __table_args__ = (
        Index("ix_inventory_product_warehouse", "product_id", "warehouse"),
        Index("ix_inventory_reorder", "reorder_point", "quantity"),
    )


class Order(Base):
    __tablename__ = "orders"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    marketplace = Column(SQLEnum(MarketplaceType), nullable=False)
    external_order_id = Column(String(100), nullable=False)
    
    # Customer information
    customer_name = Column(String(200))
    customer_email = Column(String(200))
    
    # Shipping address
    shipping_address = Column(JSON)
    billing_address = Column(JSON)
    
    # Order details
    total = Column(Float, nullable=False)
    tax = Column(Float, default=0)
    shipping_cost = Column(Float, default=0)
    currency = Column(String(3), default="EUR")
    
    # Status & Tracking
    status = Column(SQLEnum(OrderStatus), default=OrderStatus.PENDING)
    tracking_number = Column(String(100))
    carrier = Column(String(100))
    
    # Timestamps
    placed_at = Column(DateTime(timezone=True), nullable=False)
    shipped_at = Column(DateTime(timezone=True))
    delivered_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Marketplace-specific data
    marketplace_data = Column(JSON)
    
    # Relationships
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    
    __table_args__ = (
        Index("ix_orders_marketplace_external", "marketplace", "external_order_id"),
        Index("ix_orders_status_placed", "status", "placed_at"),
    )


class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    
    # Item details
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)
    
    # Marketplace-specific data
    external_item_id = Column(String(100))
    marketplace_data = Column(JSON)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")


class Review(Base):
    __tablename__ = "reviews"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    listing_id = Column(UUID(as_uuid=True), ForeignKey("listings.id"), nullable=False)
    
    # Review content
    rating = Column(Integer, nullable=False)  # 1-5 stars
    title = Column(String(500))
    body = Column(Text)
    reviewer_name = Column(String(200))
    
    # Analysis
    sentiment = Column(Float)  # -1 to 1
    aspects = Column(JSON)  # Extracted aspects and sentiments
    language = Column(String(5))
    
    # Metadata
    verified_purchase = Column(Boolean, default=False)
    helpful_votes = Column(Integer, default=0)
    
    # Timestamps
    review_date = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Marketplace data
    external_review_id = Column(String(100))
    marketplace_data = Column(JSON)
    
    # Relationships
    listing = relationship("Listing", back_populates="reviews")
    
    __table_args__ = (
        Index("ix_reviews_listing_rating", "listing_id", "rating"),
        Index("ix_reviews_sentiment", "sentiment"),
    )


class BlogPost(Base):
    __tablename__ = "blog_posts"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug = Column(String(200), unique=True, nullable=False)
    
    # Content
    title = Column(String(500), nullable=False)
    body = Column(Text, nullable=False)
    excerpt = Column(String(500))
    
    # SEO
    keywords = Column(ARRAY(String))
    meta_description = Column(String(500))
    
    # Localization
    language = Column(String(5), nullable=False, default="en")
    
    # Images
    featured_image = Column(String(500))
    images = Column(ARRAY(String))
    
    # Performance metrics
    performance = Column(JSON)  # Views, shares, etc.
    
    # Status
    published = Column(Boolean, default=False)
    
    # AI generation data
    ai_generated = Column(Boolean, default=False)
    generation_prompt = Column(Text)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    published_at = Column(DateTime(timezone=True))
    
    __table_args__ = (
        Index("ix_blog_posts_language_published", "language", "published"),
        Index("ix_blog_posts_published_at", "published_at"),
    )


class Lead(Base):
    __tablename__ = "leads"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source = Column(String(100), nullable=False)  # scraping, manual, etc.
    
    # Company information
    company = Column(String(200), nullable=False)
    website = Column(String(500))
    industry = Column(String(100))
    size = Column(String(50))  # employees
    
    # Contact information
    contact_name = Column(String(200))
    contact_email = Column(String(200))
    contact_phone = Column(String(50))
    contact_title = Column(String(100))
    
    # Location
    country = Column(String(5), nullable=False)
    city = Column(String(100))
    address = Column(Text)
    
    # Scoring
    score = Column(Integer, default=0)  # 0-100
    status = Column(String(50), default="new")  # new, contacted, qualified, etc.
    
    # Notes & Activities
    notes = Column(Text)
    activities = Column(JSON)  # Track interactions
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_contact_at = Column(DateTime(timezone=True))
    
    __table_args__ = (
        Index("ix_leads_score_status", "score", "status"),
        Index("ix_leads_country_industry", "country", "industry"),
    )