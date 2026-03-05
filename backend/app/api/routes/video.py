"""
Video Upload API for SmartMeet AI (FREE Supabase Storage)
"""

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Optional
import uuid
import os
from datetime import datetime

from app.db.session import get_db
from app.core.supabase_config import supabase_config
from app.models.meeting import Meeting
from app.schemas.meeting import VideoUploadResponse

router = APIRouter()

@router.post("/upload", response_model=VideoUploadResponse)
async def upload_video(
    meeting_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Upload video recording to Supabase Storage (FREE)"""
    
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
    
    # Check file size (10MB limit for free tier)
    file_content = await file.read()
    file_size = len(file_content)
    
    if file_size > 10 * 1024 * 1024:  # 10MB
        raise HTTPException(
            status_code=400, 
            detail="File too large. Maximum size is 10MB for free tier"
        )
    
    # Generate unique file path
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{meeting_id}/{uuid.uuid4()}{file_extension}"
    
    # Upload to Supabase Storage
    try:
        video_url = supabase_config.upload_file(
            file_content, 
            unique_filename, 
            file.content_type
        )
        
        if not video_url:
            raise HTTPException(
                status_code=500, 
                detail="Failed to upload video to storage"
            )
        
        # Update meeting with video URL
        meeting.recording_url = video_url
        meeting.recording_size = file_size
        meeting.status = "completed"
        db.commit()
        
        return VideoUploadResponse(
            success=True,
            video_url=video_url,
            file_size=file_size,
            meeting_id=meeting_id,
            message="Video uploaded successfully to FREE Supabase Storage"
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
    
    # Read and upload thumbnail
    file_content = await file.read()
    
    # Generate unique file path
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{meeting_id}/thumbnail{file_extension}"
    
    # Upload to Supabase Storage
    try:
        thumbnail_url = supabase_config.upload_file(
            file_content, 
            unique_filename, 
            file.content_type
        )
        
        if not thumbnail_url:
            raise HTTPException(
                status_code=500, 
                detail="Failed to upload thumbnail"
            )
        
        # Update meeting with thumbnail URL
        meeting.thumbnail_url = thumbnail_url
        db.commit()
        
        return {
            "success": True,
            "thumbnail_url": thumbnail_url,
            "meeting_id": meeting_id,
            "message": "Thumbnail uploaded successfully"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Thumbnail upload failed: {str(e)}"
        )

@router.get("/storage-info")
async def get_storage_info():
    """Get FREE Supabase Storage information"""
    return {
        "provider": "Supabase Storage",
        "plan": "FREE Tier",
        "storage_limit": "1GB",
        "bandwidth_limit": "2GB/month",
        "features": [
            "Unlimited users",
            "Built-in CDN",
            "Row Level Security",
            "Auto-thumbnails",
            "Video streaming"
        ],
        "cost": "$0/month",
        "upgrade_available": "Pro tier: $25/month (100GB storage)"
    }

@router.delete("/delete/{meeting_id}")
async def delete_video(
    meeting_id: str,
    db: Session = Depends(get_db)
):
    """Delete video recording from Supabase Storage"""
    
    # Verify meeting exists
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    if not meeting.recording_url:
        raise HTTPException(status_code=404, detail="No video found for this meeting")
    
    # Extract file path from URL
    file_path = meeting.recording_url.split("/storage/v1/object/public/")[-1]
    
    # Delete from Supabase Storage
    try:
        success = supabase_config.delete_file(file_path)
        
        if success:
            # Update meeting record
            meeting.recording_url = None
            meeting.recording_size = 0
            db.commit()
            
            return {
                "success": True,
                "message": "Video deleted successfully from FREE Supabase Storage"
            }
        else:
            raise HTTPException(
                status_code=500, 
                detail="Failed to delete video from storage"
            )
            
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Delete failed: {str(e)}"
        )
