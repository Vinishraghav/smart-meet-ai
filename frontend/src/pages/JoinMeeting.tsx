import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function JoinMeeting() {
  const navigate = useNavigate()
  const [meetingCode, setMeetingCode] = useState('')
  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleJoinMeeting = async () => {
    if (!meetingCode || !userName) {
      alert('Please enter both meeting code and your name')
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call to join meeting
      const response = await fetch(`https://smart-meet-ai-production.up.railway.app/api/v1/meetings/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          meeting_code: meetingCode,
          participant_name: userName 
        })
      })

      if (response.ok) {
        const data = await response.json()
        navigate(`/meeting/${data.meeting_id}`)
      } else {
        alert('Invalid meeting code. Please check and try again.')
      }
    } catch (error) {
      alert('Connection error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: '#ffffff', 
      color: '#0f172a' 
    }}>
      {/* Header */}
      <nav style={{ 
        backgroundColor: 'rgba(248, 250, 252, 0.8)', 
        backdropFilter: 'blur(12px)', 
        borderBottom: '1px solid #e2e8f0', 
        padding: '1rem' 
      }}>
        <div style={{ 
          maxWidth: '80rem', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#0f172a' }}>✨ SmartMeet AI</span>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '9999px', 
              backgroundColor: '#f8fafc', 
              color: '#0f172a',
              border: '1px solid #e2e8f0',
              textDecoration: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '2rem' 
      }}>
        <div style={{ 
          textAlign: 'center', 
          maxWidth: '28rem', 
          width: '100%' 
        }}>
          <div style={{ 
            width: '6rem', 
            height: '6rem', 
            borderRadius: '1.5rem', 
            background: 'linear-gradient(135deg, #0f172a 0%, #f8fafc 100%)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
            margin: '0 auto 2rem'
          }}>
            <span style={{ fontSize: '3rem', color: '#ffffff' }}>👥</span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: 1.2 }}>
            Join Meeting
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '2rem', lineHeight: 1.6 }}>
            Enter the meeting code to join your AI-powered meeting
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0',
                fontSize: '1rem',
                backgroundColor: '#ffffff',
                color: '#0f172a'
              }}
            />

            <input
              type="text"
              placeholder="Meeting Code"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value.toUpperCase())}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0',
                fontSize: '1rem',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                textTransform: 'uppercase'
              }}
            />

            <button
              onClick={handleJoinMeeting}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                backgroundColor: isLoading ? '#94a3b8' : '#0f172a',
                color: '#ffffff',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)',
                transition: 'all 0.15s ease',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'Joining...' : '🚀 Join Meeting'}
            </button>
          </div>

          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            backgroundColor: '#f8fafc', 
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
              💡 <strong>Tip:</strong> Meeting codes are 8 characters long and contain letters and numbers.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
