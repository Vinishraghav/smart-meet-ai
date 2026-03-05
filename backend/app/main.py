from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.api.routes import meetings, video, railway_storage
from app.db.session import engine
from app.models.meeting import Base
import os

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
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
    return {"status": "healthy", "message": "SmartMeet AI Backend is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
