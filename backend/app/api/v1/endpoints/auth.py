"""Authentication API endpoints"""

from fastapi import APIRouter

router = APIRouter()

# Placeholder - authentication endpoints would be implemented here
@router.post("/login")
async def login():
    return {"message": "Login endpoint"}

@router.post("/register")
async def register():
    return {"message": "Register endpoint"}