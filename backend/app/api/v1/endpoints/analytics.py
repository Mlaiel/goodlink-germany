"""Analytics API endpoints"""

from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_analytics():
    return {"message": "Analytics dashboard endpoint"}