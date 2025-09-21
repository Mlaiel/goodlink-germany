"""AI Agents management API endpoints"""

from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_agents():
    return {"message": "AI Agents list endpoint"}