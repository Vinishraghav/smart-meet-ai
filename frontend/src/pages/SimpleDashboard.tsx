import { Link } from 'react-router-dom'

export default function SimpleDashboard() {
  const handleStartMeeting = async () => {
    try {
      const response = await fetch('https://smart-meet-ai-production.up.railway.app/api/meetings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Instant Meeting' })
      })

      if (response.ok) {
        const data = await response.json()
        window.location.href = `/meeting/${data.meeting_id}`
      } else {
        alert('Failed to create meeting')
      }
    } catch (error) {
      alert('Connection error. Please try again.')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #334155 100%)',
      color: '#f1f5f9'
    }}>
      <nav style={{
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #475569',
        padding: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.15s ease' }}>
              Home
            </Link>
            <Link to="/about" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.15s ease' }}>
              About
            </Link>
            <Link to="/profile" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.15s ease' }}>
              Profile
            </Link>
            <Link to="/settings" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.15s ease' }}>
              Settings
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '28rem' }}>
          <div style={{
            width: '6rem',
            height: '6rem',
            borderRadius: '1.5rem',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.25)',
            margin: '0 auto 2rem',
            position: 'relative'
          }}>
            <span style={{ fontSize: '3rem', color: '#ffffff' }}>✨</span>
            <div style={{
              position: 'absolute',
              top: '-0.5rem',
              right: '-0.5rem',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              fontSize: '0.625rem',
              fontWeight: 'bold',
              padding: '0.125rem 0.5rem',
              borderRadius: '9999px'
            }}>LIVE</div>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: 1.2 }}>
            Welcome to <span style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>SmartMeet</span> AI
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
            Start your first AI-powered meeting with premium features
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            <button
              onClick={handleStartMeeting}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                cursor: 'pointer',
                boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>▶️</span>
              <span>Start Premium Meeting</span>
            </button>
            <Link
              to="/join"
              style={{
                width: '100%',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                border: '2px solid #10b981',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>👥</span>
              <span>Join Premium Meeting</span>
            </Link>
          </div>

          {/* Premium Features */}
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            borderRadius: '1rem',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#10b981' }}>
              🚀 Premium Features
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                color: '#10b981',
                textAlign: 'center'
              }}>
                🤖 AI Transcription
              </div>
              <div style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                color: '#10b981',
                textAlign: 'center'
              }}>
                📹 HD Recording
              </div>
              <div style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                color: '#10b981',
                textAlign: 'center'
              }}>
                🌍 Global Access
              </div>
              <div style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                color: '#10b981',
                textAlign: 'center'
              }}>
                🔒 End-to-End Encryption
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            borderRadius: '1rem',
            border: '1px solid #475569'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#f1f5f9' }}>
              Quick Links
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <Link
                to="/profile"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  textAlign: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                👤 Profile
              </Link>
              <Link
                to="/settings"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  textAlign: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                ⚙️ Settings
              </Link>
              <Link
                to="/about"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  textAlign: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                📖 About
              </Link>
              <a
                href="https://smart-meet-ai-production.up.railway.app/docs"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  textAlign: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                📚 API Docs
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
