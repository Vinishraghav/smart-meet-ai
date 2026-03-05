"""
Railway Configuration for SmartMeet AI (FREE Deployment)
"""

import os
from dotenv import load_dotenv

load_dotenv()

class RailwayConfig:
    def __init__(self):
        # Railway provides DATABASE_URL automatically
        self.database_url = os.getenv("DATABASE_URL", "sqlite:///./smartmeet.db")
        
        # Railway storage path
        self.upload_dir = "/app/uploads"
        self.video_dir = f"{self.upload_dir}/videos"
        self.thumbnail_dir = f"{self.upload_dir}/thumbnails"
        
        # Create directories if they don't exist
        os.makedirs(self.upload_dir, exist_ok=True)
        os.makedirs(self.video_dir, exist_ok=True)
        os.makedirs(self.thumbnail_dir, exist_ok=True)
        
        # Railway app URL
        self.app_url = os.getenv("RAILWAY_PUBLIC_URL", "http://localhost:8000")
        self.port = int(os.getenv("PORT", "8000"))
    
    def get_video_path(self, meeting_id: str, filename: str) -> str:
        """Get full path for video file"""
        return f"{self.video_dir}/{meeting_id}/{filename}"
    
    def get_thumbnail_path(self, meeting_id: str, filename: str) -> str:
        """Get full path for thumbnail file"""
        return f"{self.thumbnail_dir}/{meeting_id}/{filename}"
    
    def get_public_url(self, file_path: str) -> str:
        """Get public URL for uploaded file"""
        relative_path = file_path.replace("/app/uploads/", "")
        return f"{self.app_url}/uploads/{relative_path}"

# Global Railway config
railway_config = RailwayConfig()
