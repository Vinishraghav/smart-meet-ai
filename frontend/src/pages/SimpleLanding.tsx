import { Link } from 'react-router-dom'

export default function SimpleLanding() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', color: '#0f172a' }}>
      <nav style={{ backgroundColor: 'rgba(248, 250, 252, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e2e8f0', padding: '1rem', position: 'sticky', top: 0 }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#0f172a' }}>✨ SmartMeet AI</span>
          </div>
          <Link
            to="/dashboard"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'all 0.15s ease'
            }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '64rem' }}>
          <div style={{
            width: '8rem',
            height: '8rem',
            borderRadius: '1.5rem',
            background: 'linear-gradient(135deg, #0f172a 0%, #f8fafc 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
            margin: '0 auto 2rem'
          }}>
            <span style={{ fontSize: '4rem', color: '#ffffff' }}>✨</span>
          </div>

          <h1 style={{ fontSize: '3.75rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: 1 }}>
            Meetings that <span style={{ background: 'linear-gradient(135deg, #0f172a 0%, #f8fafc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>think</span> for you
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#64748b', marginBottom: '2rem', lineHeight: 1.6 }}>
            AI-powered meeting platform with video recording, transcription, and intelligent insights
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <Link
              to="/dashboard"
              style={{
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)',
                transition: 'all 0.15s ease'
              }}
            >
              Start Free Trial
            </Link>
            <a
              href="https://smart-meet-ai-production.up.railway.app/docs"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                backgroundColor: '#f8fafc',
                color: '#0f172a',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                border: '1px solid #e2e8f0',
                transition: 'all 0.15s ease'
              }}
            >
              View API Docs
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
