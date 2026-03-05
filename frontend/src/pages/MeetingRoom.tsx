import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function MeetingRoom() {
  const { meetingId } = useParams()
  const [meeting, setMeeting] = useState<any>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [participants, setParticipants] = useState(0)

  useEffect(() => {
    // Simulate meeting data
    setMeeting({
      id: meetingId,
      title: 'SmartMeet AI Premium Meeting',
      code: 'ABC123',
      status: 'ongoing'
    })
  }, [meetingId])

  const startRecording = () => {
    setIsRecording(true)
    // Simulate recording
    setTimeout(() => {
      setTranscript('Meeting started. Welcome to SmartMeet AI Premium!')
    }, 2000)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setTranscript(prev => prev + '\nMeeting recording stopped.')
  }

  const joinMeeting = () => {
    setParticipants(prev => prev + 1)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #334155 100%)',
      color: '#f1f5f9'
    }}>
      {/* Header */}
      <nav style={{
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #475569',
        padding: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>✨ SmartMeet AI</span>
            <span style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: '#10b981',
              color: '#ffffff',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>PREMIUM</span>
          </div>
          <Link to="/dashboard" style={{ color: '#94a3b8', textDecoration: 'none' }}>
            Back to Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '2rem' }}>
        {/* Meeting Info */}
        <div style={{
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          padding: '1.5rem',
          borderRadius: '1rem',
          marginBottom: '2rem',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#10b981' }}>
            {meeting?.title}
          </h2>
          <div style={{ display: 'flex', gap: '2rem', color: '#94a3b8' }}>
            <span>📅 Meeting ID: {meeting?.id}</span>
            <span>🔢 Code: {meeting?.code}</span>
            <span>👥 Participants: {participants}</span>
            <span>🟢 Status: {meeting?.status}</span>
          </div>
        </div>

        {/* Video Area */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Main Video */}
          <div style={{
            backgroundColor: '#0f172a',
            borderRadius: '1rem',
            aspectRatio: '16/9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '1.25rem'
          }}>
            📹 Main Video Feed
          </div>

          {/* Self Video */}
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '1rem',
            aspectRatio: '16/9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '1rem'
          }}>
            📹 Your Video
          </div>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={joinMeeting}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = 'scale(1)'}
            style={{
              padding: '1rem 2rem',
              borderRadius: '9999px',
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              minWidth: '150px'
            }}
          >
            🎤 Join Audio
          </button>

          <button
            onClick={isRecording ? stopRecording : startRecording}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = 'scale(1)'}
            style={{
              padding: '1rem 2rem',
              borderRadius: '9999px',
              backgroundColor: isRecording ? '#ef4444' : '#3b82f6',
              color: '#ffffff',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              minWidth: '150px'
            }}
          >
            {isRecording ? '⏹️ Stop Recording' : '⏺️ Start Recording'}
          </button>

          <button
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = 'scale(1)'}
            style={{
              padding: '1rem 2rem',
              borderRadius: '9999px',
              backgroundColor: '#6b7280',
              color: '#ffffff',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              minWidth: '150px'
            }}
          >
            📹 Share Screen
          </button>
        </div>

        {/* Transcript */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            📝 Live Transcript
          </h3>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '1rem',
            borderRadius: '0.5rem',
            minHeight: '150px',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            border: '1px solid #e2e8f0'
          }}>
            {transcript || 'Transcript will appear here when recording starts...'}
          </div>
        </div>
      </main>
    </div>
  )
}
