from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

# Import models and schemas
from app import database
from app.routers import applications, payments, approval_letters, support

# Create FastAPI app
app = FastAPI(
    title="Campa Beverages Dealership Management System",
    description="API for managing dealership applications, approvals, and payments",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, this should be restricted to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(applications.router)
app.include_router(payments.router)
app.include_router(approval_letters.router)
app.include_router(support.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Campa Beverages Dealership Management System API"}

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Create database tables on startup
@app.on_event("startup")
def startup_event():
    database.create_tables()
