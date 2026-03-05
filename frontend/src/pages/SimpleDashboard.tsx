import { Link } from 'react-router-dom'

export default function SimpleDashboard() {
  const handleStartMeeting = async () => {
    try {
      const response = await fetch('https://smart-meet-ai-production.up.railway.app/api/v1/meetings/create', {
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', color: '#0f172a' }}>
      <nav style={{ backgroundColor: 'rgba(248, 250, 252, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e2e8f0', padding: '1rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#0f172a' }}>✨ SmartMeet AI</span>
          </div>
          <Link to="/" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }}>
            Back to Home
          </Link>
        </div>
      </nav>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '28rem' }}>
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
            <span style={{ fontSize: '3rem', color: '#ffffff' }}>✨</span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: 1.2 }}>
            Welcome to Smart<span style={{ background: 'linear-gradient(135deg, #0f172a 0%, #f8fafc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Meet</span> AI
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '2rem', lineHeight: 1.6 }}>
            Start your first AI-powered meeting
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            <button
              onClick={handleStartMeeting}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)',
                transition: 'all 0.15s ease'
              }}
            >
              ▶️ Start Instant Meeting
            </button>
            <button
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: '#f8fafc',
                color: '#0f172a',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              👥 Join Meeting
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
