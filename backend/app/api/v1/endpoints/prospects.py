"""Prospect management API endpoints"""

from fastapi import APIRouter

router = APIRouter()

@router.post("/search")
async def search_prospects():
    return {"message": "Prospect search endpoint"}