from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.meeting import Meeting, Participant
from app.schemas.meeting import MeetingCreate, MeetingResponse, ParticipantCreate, TranscriptCreate
import random
import string
from datetime import datetime

router = APIRouter()

def generate_meeting_code():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))

@router.post("/meetings/create", response_model=dict)
async def create_meeting(meeting: MeetingCreate, db: Session = Depends(get_db)):
    meeting_code = generate_meeting_code()
    meeting_id = f"m{datetime.now().timestamp():.0f}"

    db_meeting = Meeting(
        id=meeting_id,
        meeting_code=meeting_code,
        title=meeting.title,
        host_id="host-1",  # TODO: replace with real user ID
        date=datetime.utcnow(),
        status="ongoing"
    )

    db.add(db_meeting)
    db.commit()
    db.refresh(db_meeting)

    return {
        "meeting_code": meeting_code,
        "meeting_id": meeting_id,
        "status": "created"
    }

@router.post("/meetings/join", response_model=dict)
async def join_meeting(participant: ParticipantCreate, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.meeting_code == participant.meeting_code).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    # Generate participant ID
    participant_id = f"p{datetime.now().timestamp():.0f}"

    db_participant = Participant(
        meeting_id=meeting.id,
        id=participant_id,
        name=participant.name,
        email=participant.email or "user@example.com",
        joined_at=datetime.utcnow(),
        is_host=False,
        mic_on=True,
        camera_on=True
    )

    db.add(db_participant)
    db.commit()
    db.refresh(db_participant)

    return {
        "meeting_id": meeting.id,
        "participant_id": db_participant.id,
        "status": "joined"
    }

@router.post("/meetings/{meeting_id}/recording/start", response_model=dict)
async def start_recording(meeting_id: str, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    meeting.recording_enabled = True
    db.commit()

    return {"status": "recording_started", "meeting_id": meeting_id}

@router.post("/meetings/{meeting_id}/recording/stop", response_model=dict)
async def stop_recording(meeting_id: str, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    meeting.recording_enabled = False
    db.commit()

    return {"status": "recording_stopped", "meeting_id": meeting_id}

@router.post("/meetings/{meeting_id}/transcript/extract", response_model=dict)
async def extract_transcript(meeting_id: str, transcript: TranscriptCreate, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    # TODO: Implement actual transcript extraction with Whisper
    # For now, just return the transcript lines as processed
    processed_transcript = []
    for i, line in enumerate(transcript.transcript_lines):
        processed_transcript.append({
            "speaker": f"Speaker {i % 2 + 1}",
            "content": line,
            "timestamp": datetime.utcnow()
        })

    return {
        "status": "extracted",
        "meeting_id": meeting_id,
        "transcript": processed_transcript,
        "message": "Transcript extracted successfully (stub implementation)"
    }

@router.get("/meetings/{meeting_id}", response_model=MeetingResponse)
async def get_meeting(meeting_id: str, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return meeting
