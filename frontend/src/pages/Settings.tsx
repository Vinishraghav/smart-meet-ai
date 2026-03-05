import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Settings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'english',
    notifications: true,
    autoRecording: false,
    videoQuality: 'hd',
    audioQuality: 'high',
    defaultDuration: 60
  })

  const handleSave = () => {
    alert('Settings saved successfully!')
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
        <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
            ⚙️ Settings
          </h1>

          {/* General Settings */}
          <div style={{ 
            marginBottom: '2rem', 
            padding: '2rem', 
            backgroundColor: '#f8fafc', 
            borderRadius: '1rem',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              🌐 General
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Language
                </label>
                <select 
                  value={settings.language}
                  onChange={(e) => setSettings({...settings, language: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '1rem'
                  }}
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="chinese">Chinese</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Theme
                </label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => setSettings({...settings, theme: 'light'})}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      backgroundColor: settings.theme === 'light' ? '#0f172a' : '#f8fafc',
                      color: settings.theme === 'light' ? '#ffffff' : '#0f172a',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    ☀️ Light
                  </button>
                  <button
                    onClick={() => setSettings({...settings, theme: 'dark'})}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      backgroundColor: settings.theme === 'dark' ? '#0f172a' : '#f8fafc',
                      color: settings.theme === 'dark' ? '#ffffff' : '#0f172a',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    🌙 Dark
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Meeting Settings */}
          <div style={{ 
            marginBottom: '2rem', 
            padding: '2rem', 
            backgroundColor: '#f8fafc', 
            borderRadius: '1rem',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              📹 Meeting
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Video Quality
                </label>
                <select 
                  value={settings.videoQuality}
                  onChange={(e) => setSettings({...settings, videoQuality: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '1rem'
                  }}
                >
                  <option value="hd">HD (1080p)</option>
                  <option value="sd">SD (480p)</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Audio Quality
                </label>
                <select 
                  value={settings.audioQuality}
                  onChange={(e) => setSettings({...settings, audioQuality: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '1rem'
                  }}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Default Meeting Duration (minutes)
                </label>
                <input 
                  type="number"
                  value={settings.defaultDuration}
                  onChange={(e) => setSettings({...settings, defaultDuration: parseInt(e.target.value)})}
                  min="15"
                  max="480"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div style={{ 
            marginBottom: '2rem', 
            padding: '2rem', 
            backgroundColor: '#f8fafc', 
            borderRadius: '1rem',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              🔔 Notifications
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
                <button
                  onClick={() => setSettings({...settings, notifications: !settings.notifications})}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.25rem',
                    backgroundColor: settings.notifications ? '#10b981' : '#6b7280',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {settings.notifications ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1rem 0'
              }}>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Auto-Recording</div>
                  <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Automatically record all meetings
                  </div>
                </div>
                <button
                  onClick={() => setSettings({...settings, autoRecording: !settings.autoRecording})}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.25rem',
                    backgroundColor: settings.autoRecording ? '#10b981' : '#6b7280',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {settings.autoRecording ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleSave}
              style={{
                padding: '1rem 3rem',
                borderRadius: '0.5rem',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                cursor: 'pointer',
                boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)',
                transition: 'all 0.15s ease'
              }}
            >
              💾 Save Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
