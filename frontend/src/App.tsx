import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './index.css'
import SimpleDashboard from './pages/SimpleDashboard'
import SimpleLanding from './pages/SimpleLanding'

// SmartMeet AI Frontend - Updated: 2026-03-06 00:25
// Force Vercel to use latest commit - NO MORE CACHE

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#0f172a' }}>
        <Routes>
          <Route path="/" element={<SimpleLanding />} />
          <Route path="/dashboard" element={<SimpleDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
