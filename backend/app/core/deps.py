from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError
from app.core.config import settings
from app.models.user import TokenPayload, UserResponse
from app.db.database import supabase

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"/api/auth/login"
)

def get_current_user(token: str = Depends(oauth2_scheme)) -> UserResponse:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    
    # In a real app with Supabase DB acting as DB
    try:
        response = supabase.table("users").select("*").eq("id", token_data.sub).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="User not found")
        user = response.data[0]
        return UserResponse(**user)
    except Exception as e:
        # If Supabase connection fails due to empty placeholder, mock a user for now
        # so frontend testing doesn't completely break before real credentials
        if "placeholder" in settings.SUPABASE_URL:
            return UserResponse(
                id=token_data.sub,
                username="mockuser",
                email="mock@example.com",
                full_name="Mock User",
                created_at="2026-01-01T00:00:00Z"
            )
        raise HTTPException(status_code=500, detail="Database error")
