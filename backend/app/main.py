from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.api.routes import meetings, video, railway_storage
from app.db.session import engine
from app.models.meeting import Base
import os
import time

# Create database tables
try:
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully")
except Exception as e:
    print(f"Database connection error: {e}")
    print("Continuing without database connection...")

app = FastAPI(title=settings.PROJECT_NAME)

# Set up CORS - allow all origins for Railway deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for Railway deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for Railway
if os.path.exists("/app/uploads"):
    app.mount("/uploads", StaticFiles(directory="/app/uploads"), name="uploads")

# Include routers
app.include_router(meetings.router, prefix=settings.API_V1_STR)
app.include_router(video.router, prefix=f"{settings.API_V1_STR}/video")
app.include_router(railway_storage.router, prefix=f"{settings.API_V1_STR}/railway")

@app.get("/health")
async def health_check():
    """Health check endpoint for Railway"""
    return {
        "status": "healthy",
        "message": "SmartMeet AI Backend is running",
        "timestamp": time.time(),
        "environment": os.getenv("RAILWAY_ENVIRONMENT", "development")
    }

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "SmartMeet AI API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
