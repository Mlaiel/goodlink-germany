"""Amazon SP-API adapter implementation"""

import asyncio
import boto3
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
import json
import httpx

from app.adapters.base import (
    MarketplaceAdapter, 
    MarketplaceCredentials,
    ListingData,
    InventoryUpdate,
    OrderData,
    ReviewData,
    AdCampaignData
)
from app.models.database import MarketplaceType
from app.core.config import settings
from app.core.exceptions import MarketplaceException


class AmazonAdapter(MarketplaceAdapter):
    """Amazon SP-API adapter"""
    
    BASE_URL = "https://sellingpartnerapi-eu.amazon.com"
    
    def __init__(self, credentials: MarketplaceCredentials):
        super().__init__(credentials)
        self.client_id = credentials.credentials.get("client_id")
        self.client_secret = credentials.credentials.get("client_secret")
        self.refresh_token = credentials.credentials.get("refresh_token")
        self.marketplace_id = credentials.credentials.get("marketplace_id", settings.AMAZON_MARKETPLACE_ID)
        self._access_token = None
        self._token_expires_at = None
    
    async def authenticate(self) -> bool:
        """Authenticate with Amazon SP-API"""
        try:
            # Get LWA access token
            auth_url = "https://api.amazon.com/auth/o2/token"
            auth_data = {
                "grant_type": "refresh_token",
                "refresh_token": self.refresh_token,
                "client_id": self.client_id,
                "client_secret": self.client_secret
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.post(auth_url, data=auth_data)
                response.raise_for_status()
                
                token_data = response.json()
                self._access_token = token_data["access_token"]
                expires_in = token_data.get("expires_in", 3600)
                self._token_expires_at = datetime.now() + timedelta(seconds=expires_in - 60)
                
                return True
                
        except Exception as e:
            raise MarketplaceException("Amazon", f"Authentication failed: {str(e)}")
    
    async def test_connection(self) -> bool:
        """Test Amazon SP-API connection"""
        try:
            if not await self._ensure_authenticated():
                return False
            
            # Test with a simple API call
            url = f"{self.BASE_URL}/listings/2021-08-01/items/{self.marketplace_id}"
            headers = await self._get_headers()
            
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=headers, params={"limit": 1})
                return response.status_code == 200
                
        except Exception:
            return False
    
    async def publish_listing(self, listing_data: ListingData) -> Dict[str, Any]:
        """Publish listing to Amazon"""
        await self._ensure_authenticated()
        
        # Convert to Amazon format
        amazon_listing = self._convert_to_amazon_format(listing_data)
        
        url = f"{self.BASE_URL}/listings/2021-08-01/items/{self.marketplace_id}"
        headers = await self._get_headers()
        
        async with httpx.AsyncClient() as client:
            response = await client.put(
                url,
                headers=headers,
                json=amazon_listing
            )
            
            if response.status_code not in [200, 201]:
                raise MarketplaceException("Amazon", f"Failed to publish listing: {response.text}")
            
            return response.json()
    
    async def update_listing(self, external_id: str, listing_data: ListingData) -> Dict[str, Any]:
        """Update Amazon listing"""
        await self._ensure_authenticated()
        
        amazon_listing = self._convert_to_amazon_format(listing_data)
        
        url = f"{self.BASE_URL}/listings/2021-08-01/items/{self.marketplace_id}/{external_id}"
        headers = await self._get_headers()
        
        async with httpx.AsyncClient() as client:
            response = await client.patch(
                url,
                headers=headers,
                json=amazon_listing
            )
            
            if response.status_code != 200:
                raise MarketplaceException("Amazon", f"Failed to update listing: {response.text}")
            
            return response.json()
    
    async def delete_listing(self, external_id: str) -> bool:
        """Delete Amazon listing"""
        await self._ensure_authenticated()
        
        url = f"{self.BASE_URL}/listings/2021-08-01/items/{self.marketplace_id}/{external_id}"
        headers = await self._get_headers()
        
        async with httpx.AsyncClient() as client:
            response = await client.delete(url, headers=headers)
            return response.status_code == 200
    
    async def get_listing(self, external_id: str) -> Optional[Dict[str, Any]]:
        """Get Amazon listing details"""
        await self._ensure_authenticated()
        
        url = f"{self.BASE_URL}/listings/2021-08-01/items/{self.marketplace_id}/{external_id}"
        headers = await self._get_headers()
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers)
            
            if response.status_code == 404:
                return None
            
            response.raise_for_status()
            return response.json()
    
    async def update_inventory(self, sku: str, quantity: int) -> bool:
        """Update Amazon inventory"""
        await self._ensure_authenticated()
        
        url = f"{self.BASE_URL}/fba/inventory/v1/summaries"
        headers = await self._get_headers()
        
        # Amazon inventory update logic here
        # This is simplified - actual implementation would depend on FBA vs FBM
        
        return True
    
    async def get_inventory(self, sku: str) -> Optional[Dict[str, Any]]:
        """Get Amazon inventory levels"""
        await self._ensure_authenticated()
        
        url = f"{self.BASE_URL}/fba/inventory/v1/summaries"
        headers = await self._get_headers()
        params = {"sellerSkus": sku}
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers, params=params)
            
            if response.status_code != 200:
                return None
            
            data = response.json()
            inventories = data.get("payload", {}).get("inventorySummaries", [])
            
            return inventories[0] if inventories else None
    
    async def bulk_update_inventory(self, updates: List[InventoryUpdate]) -> Dict[str, Any]:
        """Bulk update Amazon inventory"""
        results = {"success": [], "errors": []}
        
        # Process in batches (Amazon has limits)
        batch_size = 100
        for i in range(0, len(updates), batch_size):
            batch = updates[i:i + batch_size]
            
            for update in batch:
                try:
                    success = await self.update_inventory(update.sku, update.quantity)
                    if success:
                        results["success"].append(update.sku)
                    else:
                        results["errors"].append({"sku": update.sku, "error": "Update failed"})
                except Exception as e:
                    results["errors"].append({"sku": update.sku, "error": str(e)})
        
        return results
    
    async def fetch_orders(self, since: datetime) -> List[OrderData]:
        """Fetch Amazon orders"""
        await self._ensure_authenticated()
        
        url = f"{self.BASE_URL}/orders/v0/orders"
        headers = await self._get_headers()
        params = {
            "MarketplaceIds": self.marketplace_id,
            "CreatedAfter": since.isoformat(),
            "OrderStatuses": ["Pending", "Unshipped", "PartiallyShipped", "Shipped"]
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers, params=params)
            response.raise_for_status()
            
            data = response.json()
            orders = data.get("payload", {}).get("Orders", [])
            
            # Convert to standardized format
            order_data_list = []
            for order in orders:
                order_items = await self._get_order_items(order["AmazonOrderId"])
                order_data = self._convert_amazon_order(order, order_items)
                order_data_list.append(order_data)
            
            return order_data_list
    
    async def get_order(self, external_order_id: str) -> Optional[OrderData]:
        """Get specific Amazon order"""
        await self._ensure_authenticated()
        
        url = f"{self.BASE_URL}/orders/v0/orders/{external_order_id}"
        headers = await self._get_headers()
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers)
            
            if response.status_code == 404:
                return None
            
            response.raise_for_status()
            order = response.json().get("payload")
            
            order_items = await self._get_order_items(external_order_id)
            return self._convert_amazon_order(order, order_items)
    
    async def update_order_status(self, external_order_id: str, status: str, tracking_number: Optional[str] = None) -> bool:
        """Update Amazon order status"""
        # Amazon order status updates are typically done through shipping confirmation
        if status == "shipped" and tracking_number:
            return await self._confirm_shipment(external_order_id, tracking_number)
        return True
    
    async def fetch_reviews(self, external_id: str, since: Optional[datetime] = None) -> List[ReviewData]:
        """Fetch Amazon product reviews"""
        # Note: Amazon doesn't provide direct review API access through SP-API
        # This would typically require Product Advertising API or web scraping
        # For now, return empty list
        return []
    
    async def create_ad_campaign(self, campaign: AdCampaignData) -> Dict[str, Any]:
        """Create Amazon advertising campaign"""
        # Amazon Advertising API implementation
        # This is a simplified placeholder
        return {"campaign_id": campaign.campaign_id, "status": "created"}
    
    async def update_ad_campaign(self, campaign_id: str, updates: Dict[str, Any]) -> Dict[str, Any]:
        """Update Amazon advertising campaign"""
        # Amazon Advertising API implementation
        return {"campaign_id": campaign_id, "status": "updated"}
    
    async def get_ad_performance(self, campaign_id: str, start_date: datetime, end_date: datetime) -> Dict[str, Any]:
        """Get Amazon advertising performance"""
        # Amazon Advertising API implementation
        return {"campaign_id": campaign_id, "impressions": 0, "clicks": 0, "cost": 0}
    
    async def get_listing_performance(self, external_id: str, start_date: datetime, end_date: datetime) -> Dict[str, Any]:
        """Get Amazon listing performance"""
        # Business Reports API implementation
        return {"asin": external_id, "sessions": 0, "page_views": 0, "units_ordered": 0}
    
    # Private helper methods
    async def _ensure_authenticated(self) -> bool:
        """Ensure we have a valid access token"""
        if not self._access_token or (self._token_expires_at and datetime.now() > self._token_expires_at):
            return await self.authenticate()
        return True
    
    async def _get_headers(self) -> Dict[str, str]:
        """Get request headers with authentication"""
        return {
            "Authorization": f"Bearer {self._access_token}",
            "Content-Type": "application/json",
            "x-amz-access-token": self._access_token
        }
    
    def _convert_to_amazon_format(self, listing_data: ListingData) -> Dict[str, Any]:
        """Convert standardized listing data to Amazon format"""
        return {
            "productType": "PRODUCT",  # This would be category-specific
            "attributes": {
                "item_name": [{"value": listing_data.title, "language_tag": "de_DE"}],
                "description": [{"value": listing_data.description, "language_tag": "de_DE"}],
                "bullet_point": [{"value": bp, "language_tag": "de_DE"} for bp in listing_data.bullet_points],
                "main_image_url": listing_data.images[0] if listing_data.images else None,
                "other_image_url": listing_data.images[1:] if len(listing_data.images) > 1 else [],
                "generic_keyword": listing_data.keywords,
                "list_price": [{"value": listing_data.price, "currency": listing_data.currency}]
            }
        }
    
    def _convert_amazon_order(self, amazon_order: Dict[str, Any], order_items: List[Dict[str, Any]]) -> OrderData:
        """Convert Amazon order format to standardized format"""
        return OrderData(
            external_order_id=amazon_order["AmazonOrderId"],
            customer_name=amazon_order.get("BuyerName", ""),
            customer_email=amazon_order.get("BuyerEmail"),
            shipping_address=amazon_order.get("ShippingAddress", {}),
            billing_address=None,
            total=float(amazon_order.get("OrderTotal", {}).get("Amount", 0)),
            items=order_items,
            placed_at=datetime.fromisoformat(amazon_order["PurchaseDate"].replace("Z", "+00:00")),
            status=amazon_order["OrderStatus"]
        )
    
    async def _get_order_items(self, order_id: str) -> List[Dict[str, Any]]:
        """Get order items for an Amazon order"""
        url = f"{self.BASE_URL}/orders/v0/orders/{order_id}/orderItems"
        headers = await self._get_headers()
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers)
            response.raise_for_status()
            
            data = response.json()
            return data.get("payload", {}).get("OrderItems", [])
    
    async def _confirm_shipment(self, order_id: str, tracking_number: str) -> bool:
        """Confirm shipment for Amazon order"""
        url = f"{self.BASE_URL}/orders/v0/orders/{order_id}/shipmentConfirmation"
        headers = await self._get_headers()
        
        payload = {
            "packageDetail": {
                "packageReferenceId": "1",
                "carrierCode": "DHL",  # This should be configurable
                "trackingNumber": tracking_number
            }
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=payload)
            return response.status_code == 200


# Register the adapter
from app.adapters.base import MarketplaceAdapterFactory
MarketplaceAdapterFactory.register_adapter(MarketplaceType.AMAZON, AmazonAdapter)