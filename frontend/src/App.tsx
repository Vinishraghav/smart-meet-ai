import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import MeetingRoom from './pages/MeetingRoom'
import './index.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meeting/:meetingId" element={<MeetingRoom />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
