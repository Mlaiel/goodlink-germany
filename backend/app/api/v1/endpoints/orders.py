"""Order management API endpoints"""

from fastapi import APIRouter

router = APIRouter()

# Placeholder
@router.get("/")
async def list_orders():
    return {"message": "Orders endpoint"}