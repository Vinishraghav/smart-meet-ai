-- SmartMeet AI Database Schema for Supabase PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (for Supabase auth integration)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Meetings table with user ownership
CREATE TABLE IF NOT EXISTS meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meeting_code VARCHAR(8) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    host_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    duration INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ongoing' CHECK (status IN ('upcoming', 'ongoing', 'completed')),
    type VARCHAR(20) DEFAULT 'general' CHECK (type IN ('general', 'interview')),
    recording_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Participants table
CREATE TABLE IF NOT EXISTS participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meeting_id UUID NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    mic_on BOOLEAN DEFAULT FALSE,
    camera_on BOOLEAN DEFAULT FALSE,
    is_host BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transcripts table
CREATE TABLE IF NOT EXISTS transcripts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meeting_id UUID NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    speaker VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_meetings_meeting_code ON meetings(meeting_code);
CREATE INDEX IF NOT EXISTS idx_meetings_host_id ON meetings(host_id);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);
CREATE INDEX IF NOT EXISTS idx_meetings_date ON meetings(date);
CREATE INDEX IF NOT EXISTS idx_participants_meeting_id ON participants(meeting_id);
CREATE INDEX IF NOT EXISTS idx_participants_user_id ON participants(user_id);
CREATE INDEX IF NOT EXISTS idx_transcripts_meeting_id ON transcripts(meeting_id);
CREATE INDEX IF NOT EXISTS idx_transcripts_timestamp ON transcripts(timestamp);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_meetings_updated_at BEFORE UPDATE ON meetings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_participants_updated_at BEFORE UPDATE ON participants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Users can only access their own data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read/write their own data
CREATE POLICY "Users can view own profile" ON users
    FOR ALL USING (auth.uid() = id);

-- Policy: Users can create meetings (they become hosts)
CREATE POLICY "Users can create meetings" ON meetings
    FOR INSERT WITH CHECK (auth.uid() = host_id);

-- Policy: Hosts can update their own meetings
CREATE POLICY "Hosts can update own meetings" ON meetings
    FOR UPDATE USING (auth.uid() = host_id);

-- Policy: Anyone can join meetings (read access)
CREATE POLICY "Anyone can view meetings" ON meetings
    FOR SELECT USING (true);

-- Policy: Participants can be added to meetings
CREATE POLICY "Users can join meetings" ON participants
    FOR INSERT WITH CHECK (true);

-- Policy: Users can view participants of meetings they're in
CREATE POLICY "Users can view meeting participants" ON participants
    FOR SELECT USING (
        meeting_id IN (
            SELECT id FROM meetings WHERE 
            (host_id = auth.uid() OR id IN (
                SELECT meeting_id FROM participants WHERE user_id = auth.uid()
            ))
        )
    );

-- Policy: Users can update their own participant records
CREATE POLICY "Users can update own participation" ON participants
    FOR UPDATE USING (user_id = auth.uid());

-- Policy: Transcripts are tied to meeting participation
CREATE POLICY "Users can view meeting transcripts" ON transcripts
    FOR SELECT USING (
        meeting_id IN (
            SELECT meeting_id FROM participants WHERE user_id = auth.uid()
        )
    );

-- Policy: Users can add transcripts to meetings they're in
CREATE POLICY "Users can add transcripts" ON transcripts
    FOR INSERT WITH CHECK (
        meeting_id IN (
            SELECT meeting_id FROM participants WHERE user_id = auth.uid()
        )
    );
