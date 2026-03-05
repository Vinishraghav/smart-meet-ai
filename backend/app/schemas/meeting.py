from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class MeetingCreate(BaseModel):
    title: str = "Instant Meeting"

class MeetingResponse(BaseModel):
    id: str
    meeting_code: str
    title: str
    host_id: str
    date: datetime
    duration: int
    status: str
    type: str
    recording_enabled: bool
    recording_url: Optional[str] = None
    recording_size: Optional[int] = None
    thumbnail_url: Optional[str] = None

    class Config:
        from_attributes = True

class ParticipantCreate(BaseModel):
    meeting_code: str
    name: str
    email: Optional[str] = None

class ParticipantResponse(BaseModel):
    id: str
    meeting_id: str
    name: str
    email: Optional[str]
    joined_at: datetime
    mic_on: bool
    camera_on: bool
    is_host: bool

    class Config:
        from_attributes = True

class TranscriptCreate(BaseModel):
    transcript_lines: List[str]

class TranscriptResponse(BaseModel):
    id: str
    meeting_id: str
    content: str
    speaker: str
    timestamp: datetime

    class Config:
        from_attributes = True

class VideoUploadResponse(BaseModel):
    success: bool
    video_url: Optional[str] = None
    file_size: int
    meeting_id: str
    message: str
