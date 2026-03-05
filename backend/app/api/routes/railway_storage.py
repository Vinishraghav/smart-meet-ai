"""
Railway Local Storage API for SmartMeet AI (FREE)
"""

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import Optional
import uuid
import os
import shutil
from datetime import datetime

from app.db.session import get_db
from app.core.railway_config import railway_config
from app.models.meeting import Meeting
from app.schemas.meeting import VideoUploadResponse

router = APIRouter()

@router.post("/upload", response_model=VideoUploadResponse)
async def upload_video(
    meeting_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Upload video recording to Railway local storage (FREE)"""
    
    # Verify meeting exists
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    # Validate file type
    allowed_types = ["video/mp4", "video/webm", "video/quicktime"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file type. Allowed: {', '.join(allowed_types)}"
        )
    
    # Create meeting directory
    meeting_dir = f"{railway_config.video_dir}/{meeting_id}"
    os.makedirs(meeting_dir, exist_ok=True)
    
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(meeting_dir, unique_filename)
    
    # Save file locally
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        file_size = os.path.getsize(file_path)
        
        # Update meeting with video info
        meeting.recording_url = railway_config.get_public_url(file_path)
        meeting.recording_size = file_size
        meeting.status = "completed"
        db.commit()
        
        return VideoUploadResponse(
            success=True,
            video_url=meeting.recording_url,
            file_size=file_size,
            meeting_id=meeting_id,
            message="Video uploaded successfully to FREE Railway Storage"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Upload failed: {str(e)}"
        )

@router.post("/upload-thumbnail")
async def upload_thumbnail(
    meeting_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Upload thumbnail image for meeting"""
    
    # Verify meeting exists
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    # Validate image type
    allowed_types = ["image/jpeg", "image/png", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid image type. Allowed: {', '.join(allowed_types)}"
        )
    
    # Create thumbnail directory
    thumbnail_dir = f"{railway_config.thumbnail_dir}/{meeting_id}"
    os.makedirs(thumbnail_dir, exist_ok=True)
    
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"thumb{file_extension}"
    file_path = os.path.join(thumbnail_dir, unique_filename)
    
    # Save thumbnail locally
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Update meeting with thumbnail URL
        meeting.thumbnail_url = railway_config.get_public_url(file_path)
        db.commit()
        
        return {
            "success": True,
            "thumbnail_url": meeting.thumbnail_url,
            "meeting_id": meeting_id,
            "message": "Thumbnail uploaded successfully to FREE Railway Storage"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Thumbnail upload failed: {str(e)}"
        )

@router.get("/storage-info")
async def get_storage_info():
    """Get FREE Railway Storage information"""
    return {
        "provider": "Railway Local Storage",
        "plan": "FREE Tier",
        "storage_limit": "500MB per project",
        "bandwidth_limit": "100GB/month",
        "features": [
            "Unlimited deployments",
            "Automatic HTTPS",
            "Custom domain",
            "Built-in CDN",
            "PostgreSQL database",
            "Local file storage",
            "Zero cost"
        ],
        "cost": "$0/month",
        "upgrade_available": "Pro tier: $5/month (unlimited storage)"
    }

@router.get("/uploads/{file_path:path}")
async def serve_uploaded_file(file_path: str):
    """Serve uploaded files (videos, thumbnails)"""
    full_path = f"{railway_config.upload_dir}/{file_path}"
    
    if not os.path.exists(full_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(full_path)

@router.delete("/delete/{meeting_id}")
async def delete_video(
    meeting_id: str,
    db: Session = Depends(get_db)
):
    """Delete video recording from Railway local storage"""
    
    # Verify meeting exists
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    if not meeting.recording_url:
        raise HTTPException(status_code=404, detail="No video found for this meeting")
    
    # Extract file path from URL
    try:
        file_path = meeting.recording_url.split("/uploads/")[-1]
        full_path = f"{railway_config.upload_dir}/{file_path}"
        
        # Delete file if exists
        if os.path.exists(full_path):
            os.remove(full_path)
        
        # Update meeting record
        meeting.recording_url = None
        meeting.recording_size = 0
        db.commit()
        
        return {
            "success": True,
            "message": "Video deleted successfully from FREE Railway Storage"
        }
            
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Delete failed: {str(e)}"
        )
