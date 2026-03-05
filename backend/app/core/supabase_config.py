"""
Supabase Configuration for SmartMeet AI (FREE Storage)
"""

import os
import requests
from dotenv import load_dotenv
from typing import Optional, Dict, Any

load_dotenv()

class SupabaseConfig:
    def __init__(self):
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.supabase_anon_key = os.getenv("SUPABASE_ANON_KEY")
        self.supabase_service_key = os.getenv("SUPABASE_SERVICE_KEY")
        
        # Headers for API requests
        self.headers = {
            "apikey": self.supabase_anon_key,
            "Authorization": f"Bearer {self.supabase_anon_key}",
            "Content-Type": "application/json"
        }
    
    def upload_file(self, file_data: bytes, file_path: str, content_type: str = 'video/mp4') -> Optional[str]:
        """Upload file to Supabase Storage"""
        try:
            url = f"{self.supabase_url}/storage/v1/object/{file_path}"
            
            headers = {
                "apikey": self.supabase_anon_key,
                "Authorization": f"Bearer {self.supabase_anon_key}",
                "Content-Type": content_type
            }
            
            response = requests.put(url, data=file_data, headers=headers)
            
            if response.status_code == 200:
                # Return public URL
                public_url = f"{self.supabase_url}/storage/v1/object/public/{file_path}"
                return public_url
            else:
                print(f"Upload failed: {response.status_code} - {response.text}")
                return None
                
        except Exception as e:
            print(f"Error uploading to Supabase: {e}")
            return None
    
    def create_storage_bucket(self, bucket_name: str) -> bool:
        """Create storage bucket for videos"""
        try:
            url = f"{self.supabase_url}/storage/v1/bucket"
            
            payload = {
                "name": bucket_name,
                "public": True,
                "file_size_limit": 10485760,  # 10MB per file (adjust as needed)
                "allowed_mime_types": ["video/mp4", "video/webm", "audio/wav", "audio/mp3"]
            }
            
            headers = {
                "apikey": self.supabase_service_key,
                "Authorization": f"Bearer {self.supabase_service_key}",
                "Content-Type": "application/json"
            }
            
            response = requests.post(url, json=payload, headers=headers)
            
            if response.status_code in [200, 201]:
                print(f"Bucket '{bucket_name}' created successfully")
                return True
            else:
                print(f"Bucket creation failed: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"Error creating bucket: {e}")
            return False
    
    def get_public_url(self, file_path: str) -> str:
        """Get public URL for file"""
        return f"{self.supabase_url}/storage/v1/object/public/{file_path}"
    
    def delete_file(self, file_path: str) -> bool:
        """Delete file from Supabase Storage"""
        try:
            url = f"{self.supabase_url}/storage/v1/object/{file_path}"
            
            headers = {
                "apikey": self.supabase_service_key,
                "Authorization": f"Bearer {self.supabase_service_key}"
            }
            
            response = requests.delete(url, headers=headers)
            
            if response.status_code == 200:
                return True
            else:
                print(f"Delete failed: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"Error deleting file: {e}")
            return False

# Global Supabase instance
supabase_config = SupabaseConfig()
