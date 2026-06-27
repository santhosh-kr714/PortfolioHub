from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth import router as auth_router
from app.db.session import engine, Base
from app.db import models

# Create all tables in the SQLite database
Base.metadata.create_all(bind=engine)

app = FastAPI(title="PortfolioHub API")

origins = [
    "https://portfolio-hub-azure.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])

@app.get("/")
def read_root():
    return {"message": "Welcome to PortfolioHub API"}
