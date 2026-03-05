-- SmartMeet AI Database Schema for SQLite

-- Meetings table
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
);

-- Participants table
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
);

-- Transcripts table
CREATE TABLE IF NOT EXISTS transcripts (
    id TEXT PRIMARY KEY DEFAULT (substr(hex(randomblob(16)), 1, 24)),
    meeting_id TEXT NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    speaker TEXT NOT NULL,
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_meetings_meeting_code ON meetings(meeting_code);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);
CREATE INDEX IF NOT EXISTS idx_meetings_date ON meetings(date);
CREATE INDEX IF NOT EXISTS idx_participants_meeting_id ON participants(meeting_id);
CREATE INDEX IF NOT EXISTS idx_transcripts_meeting_id ON transcripts(meeting_id);
CREATE INDEX IF NOT EXISTS idx_transcripts_timestamp ON transcripts(timestamp);

-- Triggers to auto-update updated_at
CREATE TRIGGER IF NOT EXISTS update_meetings_updated_at 
    AFTER UPDATE ON meetings
    FOR EACH ROW
    BEGIN
        UPDATE meetings SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_participants_updated_at 
    AFTER UPDATE ON participants
    FOR EACH ROW
    BEGIN
        UPDATE participants SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;
