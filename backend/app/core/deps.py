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
    print("========== DEPS: GET CURRENT USER ==========")
    print("TOKEN:", token)
    print("SECRET_KEY:", settings.SECRET_KEY)
    print("ALGORITHM:", settings.ALGORITHM)
    
    user_id = None
    
    # Method 1: Try local JWT decoding with our own secret key
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        print("DECODED PAYLOAD:", payload)
        token_data = TokenPayload(**payload)
        print("TOKEN DATA:", token_data)
        user_id = token_data.sub
    except Exception as local_err:
        print("Local JWT decode failed. Trying Supabase Auth verification...")
        # Method 2: Try verifying the token with Supabase Auth
        try:
            sb_user_resp = supabase.auth.get_user(token)
            if sb_user_resp and sb_user_resp.user:
                print("Supabase Auth Verification Successful. User ID:", sb_user_resp.user.id)
                user_id = sb_user_resp.user.id
            else:
                raise ValueError("No user object returned from Supabase")
        except Exception as sb_err:
            print("Both local JWT decode and Supabase token verification failed.")
            print("Local error:", str(local_err))
            print("Supabase error:", str(sb_err))
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Could not validate credentials",
            )
            
    # Fetch user from supabase database
    try:
        response = supabase.table("users").select("*").eq("id", user_id).execute()
        if not response.data:
            # If Supabase connection fails due to empty placeholder, mock a user for now
            # so frontend testing doesn't completely break before real credentials
            if "placeholder" in settings.SUPABASE_URL:
                return UserResponse(
                    id=user_id,
                    username="mockuser",
                    email="mock@example.com",
                    full_name="Mock User",
                    created_at="2026-01-01T00:00:00Z"
                )
            raise HTTPException(status_code=404, detail="User not found")
        user = response.data[0]
        return UserResponse(**user)
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        # If Supabase connection fails due to empty placeholder, mock a user for now
        if "placeholder" in settings.SUPABASE_URL:
            return UserResponse(
                id=user_id,
                username="mockuser",
                email="mock@example.com",
                full_name="Mock User",
                created_at="2026-01-01T00:00:00Z"
            )
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
