import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './index.css'
import About from './pages/About'
import JoinMeeting from './pages/JoinMeeting'
import MeetingRoom from './pages/MeetingRoom'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import SimpleDashboard from './pages/SimpleDashboard'
import SimpleLanding from './pages/SimpleLanding'

// SmartMeet AI Frontend - Premium Theme Complete
// Build Fix: npx vite build - 2026-03-06 01:40:00 UTC
// All CORS issues resolved - Premium hackathon features ready

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#0f172a' }}>
        <Routes>
          <Route path="/" element={<SimpleLanding />} />
          <Route path="/dashboard" element={<SimpleDashboard />} />
          <Route path="/meeting/:meetingId" element={<MeetingRoom />} />
          <Route path="/join" element={<JoinMeeting />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
