import { Link } from 'react-router-dom'

export default function About() {
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
          <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              About SmartMeet AI
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '40rem', margin: '0 auto', lineHeight: 1.6 }}>
              The future of intelligent meetings. Powered by artificial intelligence, designed for collaboration.
            </p>
          </div>

          {/* Features Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem', 
            marginBottom: '4rem' 
          }}>
            <div style={{ 
              padding: '2rem', 
              backgroundColor: '#f8fafc', 
              borderRadius: '1rem',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                AI-Powered
              </h3>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>
                Advanced AI transcription, summarization, and intelligent insights for every meeting.
              </p>
            </div>

            <div style={{ 
              padding: '2rem', 
              backgroundColor: '#f8fafc', 
              borderRadius: '1rem',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📹</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                HD Recording
              </h3>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>
                Crystal-clear video recording with automatic cloud storage and easy sharing.
              </p>
            </div>

            <div style={{ 
              padding: '2rem', 
              backgroundColor: '#f8fafc', 
              borderRadius: '1rem',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Secure & Private
              </h3>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>
                End-to-end encryption and enterprise-grade security for your meetings.
              </p>
            </div>

            <div style={{ 
              padding: '2rem', 
              backgroundColor: '#f8fafc', 
              borderRadius: '1rem',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Global Scale
              </h3>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>
                Join meetings from anywhere in the world with reliable, low-latency connections.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div style={{ 
            backgroundColor: '#f8fafc', 
            padding: '3rem', 
            borderRadius: '1rem', 
            marginBottom: '4rem',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
              Trusted by Teams Worldwide
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '2rem' 
            }}>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem' }}>
                  50K+
                </div>
                <div style={{ color: '#64748b' }}>Active Users</div>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem' }}>
                  1M+
                </div>
                <div style={{ color: '#64748b' }}>Meetings Hosted</div>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem' }}>
                  99.9%
                </div>
                <div style={{ color: '#64748b' }}>Uptime</div>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem' }}>
                  150+
                </div>
                <div style={{ color: '#64748b' }}>Countries</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Ready to Transform Your Meetings?
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '2rem' }}>
              Join thousands of teams already using SmartMeet AI
            </p>
            <Link
              to="/dashboard"
              style={{
                display: 'inline-block',
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
              🚀 Get Started Free
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
