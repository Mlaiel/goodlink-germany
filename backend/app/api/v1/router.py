"""Main API router for Goodlink Germany"""

from fastapi import APIRouter
from app.api.v1.endpoints import (
    products,
    listings,
    marketplaces,
    orders,
    inventory,
    pricing,
    blog,
    prospects,
    chat,
    agents,
    analytics,
    auth
)

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(listings.router, prefix="/listings", tags=["listings"])
api_router.include_router(marketplaces.router, prefix="/marketplaces", tags=["marketplaces"])
api_router.include_router(orders.router, prefix="/orders", tags=["orders"])
api_router.include_router(inventory.router, prefix="/inventory", tags=["inventory"])
api_router.include_router(pricing.router, prefix="/pricing", tags=["pricing"])
api_router.include_router(blog.router, prefix="/blog", tags=["blog"])
api_router.include_router(prospects.router, prefix="/prospects", tags=["prospects"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(agents.router, prefix="/agents", tags=["ai-agents"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])