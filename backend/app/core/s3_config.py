"""
S3 Configuration for SmartMeet AI Video Storage
"""

import os
import boto3
from botocore.exceptions import NoCredentialsError
from dotenv import load_dotenv

load_dotenv()

class S3Config:
    def __init__(self):
        self.aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
        self.aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")
        self.aws_region = os.getenv("AWS_REGION", "us-east-1")
        self.bucket_name = os.getenv("S3_BUCKET_NAME", "smart-meet-ai-videos")
        
        # Initialize S3 client
        self.s3_client = boto3.client(
            's3',
            aws_access_key_id=self.aws_access_key_id,
            aws_secret_access_key=self.aws_secret_access_key,
            region_name=self.aws_region
        )
    
    def upload_file(self, file_data, file_name, content_type='video/mp4'):
        """Upload file to S3 bucket"""
        try:
            self.s3_client.upload_fileobj(
                file_data,
                self.bucket_name,
                file_name,
                ExtraArgs={
                    'ContentType': content_type,
                    'ServerSideEncryption': 'AES256'
                }
            )
            
            # Generate public URL (if bucket is public) or signed URL
            file_url = f"https://{self.bucket_name}.s3.{self.aws_region}.amazonaws.com/{file_name}"
            return file_url
            
        except NoCredentialsError:
            print("AWS credentials not available")
            return None
        except Exception as e:
            print(f"Error uploading to S3: {e}")
            return None
    
    def generate_presigned_url(self, file_name, expiration=3600):
        """Generate presigned URL for private files"""
        try:
            url = self.s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': self.bucket_name, 'Key': file_name},
                ExpiresIn=expiration
            )
            return url
        except Exception as e:
            print(f"Error generating presigned URL: {e}")
            return None
    
    def delete_file(self, file_name):
        """Delete file from S3"""
        try:
            self.s3_client.delete_object(Bucket=self.bucket_name, Key=file_name)
            return True
        except Exception as e:
            print(f"Error deleting file from S3: {e}")
            return False

# Global S3 instance
s3_config = S3Config()
