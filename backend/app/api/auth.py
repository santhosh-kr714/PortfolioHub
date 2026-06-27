from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.models.user import UserCreate, UserResponse, Token
from app.core.security import get_password_hash, verify_password, create_access_token
from app.core.config import settings
from app.db.database import supabase
from app.core.deps import get_current_user

router = APIRouter()

@router.post("/signup", response_model=UserResponse)
def signup(user_in: UserCreate):
    # Mock behavior if placeholder
    if "placeholder" in settings.SUPABASE_URL:
        return UserResponse(
            id="mock-id-123",
            username=user_in.username,
            email=user_in.email,
            full_name=user_in.full_name,
            created_at="2026-01-01T00:00:00Z"
        )
    
    # Check if user exists (Supabase might raise an exception on duplicate unique keys)
    try:
        user_resp = supabase.table("users").select("*").eq("email", user_in.email).execute()
        if user_resp.data:
            raise HTTPException(
                status_code=400,
                detail="Email already exists."
            )
            
        user_resp_name = supabase.table("users").select("*").eq("username", user_in.username).execute()
        if user_resp_name.data:
            raise HTTPException(
                status_code=400,
                detail="Username already exists."
            )
            
        hashed_password = get_password_hash(user_in.password)
        
        new_user = {
            "username": user_in.username,
            "email": user_in.email,
            "full_name": user_in.full_name,
            "password_hash": hashed_password
        }
        
        insert_resp = supabase.table("users").insert(new_user).execute()
        if not insert_resp.data:
            raise HTTPException(status_code=500, detail="Error creating user.")
            
        return insert_resp.data[0]
    except Exception as e:
        # If it's already an HTTPException, just raise it
        if isinstance(e, HTTPException):
            raise e
            
        error_msg = str(e)
        if "users_email_key" in error_msg or "duplicate key value violates unique constraint" in error_msg and "email" in error_msg:
             raise HTTPException(status_code=400, detail="Email already exists.")
        if "users_username_key" in error_msg or "duplicate key value violates unique constraint" in error_msg and "username" in error_msg:
             raise HTTPException(status_code=400, detail="Username already exists.")
             
        # Log unexpected error to console but return generic message to user
        print(f"Supabase Signup Error: {error_msg}")
        raise HTTPException(status_code=500, detail="Database connection failed or Server unavailable.")

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if "placeholder" in settings.SUPABASE_URL:
        # Mock token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            subject="mock-id-123", expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}

    user_resp = supabase.table("users").select("*").eq("email", form_data.username).execute()
    if not user_resp.data:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
        
    user = user_resp.data[0]
    if not verify_password(form_data.password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
        
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user["id"], expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
def get_me(current_user: UserResponse = Depends(get_current_user)):
    return current_user
