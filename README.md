# SmartMeet AI

AI-powered meeting intelligence platform.

## Architecture

- **Frontend**: React + Vite + Tailwind CSS (dark purple theme)
- **Backend**: FastAPI + SQLAlchemy
- **Database**: Neon Postgres (currently SQLite for development)

## Quick Start

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
# Runs on http://localhost:8000
```

## MVP Features

- ✅ Create meeting
- ✅ Join meeting  
- ✅ Recording toggle
- ✅ Transcript extraction (stub)

## Project Structure

```
smart-meet-ai/
├── frontend/          # React SPA
│   ├── src/
│   │   ├── pages/     # Landing, Dashboard, MeetingRoom
│   │   └── App.tsx
├── backend/           # FastAPI
│   ├── app/
│   │   ├── api/routes/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── main.py
└── legacy-next/       # Original Next.js code (preserved)
```

## Next Steps

1. Add Neon Postgres connection
2. Implement real transcript extraction with Whisper
3. Add WebRTC for real-time meetings
4. Implement AI summaries and action items
