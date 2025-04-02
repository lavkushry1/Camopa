from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Camopa Beverages Dealership API",
    description="API for the Camopa Beverages Dealership Management System",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy", "message": "API is running"}

# Root endpoint
@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to Camopa Beverages Dealership API",
        "documentation": "/docs",
    }

# Import and include routers
from app.routers import applications
app.include_router(applications.router)

# Set up database connection
from app.database import engine, Base
Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
