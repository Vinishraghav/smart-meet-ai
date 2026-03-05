import { Link } from 'react-router-dom'

export default function Profile() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: 'Pro',
    meetingsHosted: 24,
    meetingsJoined: 45,
    totalHours: 156
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
          <Link to="/dashboard" style={{ color: '#64748b', textDecoration: 'none' }}>
            Back to Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          {/* Profile Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '3rem',
            padding: '2rem',
            backgroundColor: '#f8fafc',
            borderRadius: '1rem',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '8rem',
              height: '8rem',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0f172a 0%, #f8fafc 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              color: '#ffffff'
            }}>
              👤
            </div>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {user.name}
              </h1>
              <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                {user.email}
              </p>
              <div style={{
                display: 'inline-block',
                padding: '0.25rem 1rem',
                backgroundColor: '#10b981',
                color: '#ffffff',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}>
                {user.plan} Plan
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8fafc',
              borderRadius: '1rem',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏠</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0f172a' }}>
                {user.meetingsHosted}
              </div>
              <div style={{ color: '#64748b' }}>Meetings Hosted</div>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8fafc',
              borderRadius: '1rem',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0f172a' }}>
                {user.meetingsJoined}
              </div>
              <div style={{ color: '#64748b' }}>Meetings Joined</div>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8fafc',
              borderRadius: '1rem',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏱️</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0f172a' }}>
                {user.totalHours}
              </div>
              <div style={{ color: '#64748b' }}>Total Hours</div>
            </div>
          </div>

          {/* Settings Section */}
          <div style={{
            padding: '2rem',
            backgroundColor: '#f8fafc',
            borderRadius: '1rem',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              ⚙️ Settings
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 0',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Email Notifications</div>
                  <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Receive meeting reminders and updates
                  </div>
                </div>
                <button style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}>
                  Enabled
                </button>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 0',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Auto-Recording</div>
                  <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Automatically record all meetings
                  </div>
                </div>
                <button style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  backgroundColor: '#6b7280',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}>
                  Disabled
                </button>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 0'
              }}>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Language</div>
                  <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Meeting interface language
                  </div>
                </div>
                <select style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  fontSize: '0.875rem'
                }}>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
