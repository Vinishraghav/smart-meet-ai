from sqlalchemy import Column, String, DateTime, Boolean, Integer, Text, ForeignKey, BigInteger
from sqlalchemy.orm import relationship
from app.db.session import Base
import uuid

class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(String, primary_key=True, default=lambda: f"m{uuid.uuid4().hex}")
    meeting_code = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    host_id = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    duration = Column(Integer, default=0)
    status = Column(String, default="ongoing")  # upcoming, ongoing, completed
    type = Column(String, default="general")  # general, interview
    recording_enabled = Column(Boolean, default=True)

    # Video storage fields (FREE Supabase Storage)
    recording_url = Column(String, nullable=True)  # Supabase Storage URL
    recording_size = Column(BigInteger, default=0)  # File size in bytes
    recording_duration = Column(Integer, default=0)  # Video duration in seconds
    recording_format = Column(String, default="mp4")  # Video format
    thumbnail_url = Column(String, nullable=True)  # Thumbnail URL

    participants = relationship("Participant", back_populates="meeting")
    transcripts = relationship("Transcript", back_populates="meeting")

class Participant(Base):
    __tablename__ = "participants"

    id = Column(String, primary_key=True, default=lambda: f"p{uuid.uuid4().hex}")
    meeting_id = Column(String, ForeignKey("meetings.id"), nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, nullable=True)
    joined_at = Column(DateTime, nullable=False)
    mic_on = Column(Boolean, default=False)
    camera_on = Column(Boolean, default=False)
    is_host = Column(Boolean, default=False)

    meeting = relationship("Meeting", back_populates="participants")

class Transcript(Base):
    __tablename__ = "transcripts"

    id = Column(String, primary_key=True, default=lambda: f"t{uuid.uuid4().hex}")
    meeting_id = Column(String, ForeignKey("meetings.id"), nullable=False)
    content = Column(Text, nullable=False)
    speaker = Column(String, nullable=False)
    timestamp = Column(DateTime, nullable=False)

    meeting = relationship("Meeting", back_populates="transcripts")
