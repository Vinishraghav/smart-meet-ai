#!/usr/bin/env python3
"""
Fixed SQLite setup script - executes statements one by one
"""

import os
import sys
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def setup_sqlite_database():
    # Load environment variables
    load_dotenv()

    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("DATABASE_URL not found in .env file")
        return False

    print("Connecting to SQLite database...")

    try:
        # Create engine
        engine = create_engine(database_url)

        # Individual SQL statements for SQLite
        statements = [
            # Meetings table
            """
            CREATE TABLE IF NOT EXISTS meetings (
                id TEXT PRIMARY KEY DEFAULT (substr(hex(randomblob(16)), 1, 24)),
                meeting_code TEXT UNIQUE NOT NULL,
                title TEXT NOT NULL,
                host_id TEXT NOT NULL,
                date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                duration INTEGER DEFAULT 0,
                status TEXT DEFAULT 'ongoing' CHECK (status IN ('upcoming', 'ongoing', 'completed')),
                type TEXT DEFAULT 'general' CHECK (type IN ('general', 'interview')),
                recording_enabled BOOLEAN DEFAULT TRUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            """,

            # Participants table
            """
            CREATE TABLE IF NOT EXISTS participants (
                id TEXT PRIMARY KEY DEFAULT (substr(hex(randomblob(16)), 1, 24)),
                meeting_id TEXT NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
                name TEXT NOT NULL,
                email TEXT,
                joined_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                mic_on BOOLEAN DEFAULT FALSE,
                camera_on BOOLEAN DEFAULT FALSE,
                is_host BOOLEAN DEFAULT FALSE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            """,

            # Transcripts table
            """
            CREATE TABLE IF NOT EXISTS transcripts (
                id TEXT PRIMARY KEY DEFAULT (substr(hex(randomblob(16)), 1, 24)),
                meeting_id TEXT NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
                content TEXT NOT NULL,
                speaker TEXT NOT NULL,
                timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            """,

            # Indexes
            "CREATE INDEX IF NOT EXISTS idx_meetings_meeting_code ON meetings(meeting_code)",
            "CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status)",
            "CREATE INDEX IF NOT EXISTS idx_meetings_date ON meetings(date)",
            "CREATE INDEX IF NOT EXISTS idx_participants_meeting_id ON participants(meeting_id)",
            "CREATE INDEX IF NOT EXISTS idx_transcripts_meeting_id ON transcripts(meeting_id)",
            "CREATE INDEX IF NOT EXISTS idx_transcripts_timestamp ON transcripts(timestamp)"
        ]

        print("Creating SQLite database schema...")

        # Execute each statement separately
        with engine.connect() as conn:
            for i, statement in enumerate(statements, 1):
                print(f"Executing statement {i}/{len(statements)}...")
                conn.execute(text(statement))
                conn.commit()

        print("SQLite database schema created successfully!")

        # Test connection
        with engine.connect() as conn:
            result = conn.execute(text("SELECT COUNT(*) FROM meetings"))
            count = result.scalar()
            print(f"Current meetings count: {count}")

        return True

    except Exception as e:
        print(f"Error setting up SQLite database: {e}")
        return False

if __name__ == "__main__":
    print("SmartMeet AI - SQLite Database Setup")
    print("=" * 50)

    if setup_sqlite_database():
        print("\nSetup complete! You can now run the FastAPI backend:")
        print("   uvicorn app.main:app --reload")
        print("\nFeatures ready:")
        print("  + SQLite database")
        print("  + Meeting management")
        print("  + Participant tracking")
        print("  + Transcript storage")
        print("  + API endpoints")
    else:
        print("\nSetup failed. Please check your configuration.")
        sys.exit(1)
