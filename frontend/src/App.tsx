import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './index.css'
import SimpleDashboard from './pages/SimpleDashboard'
import SimpleLanding from './pages/SimpleLanding'

// SmartMeet AI Frontend - Updated: 2026-03-05 23:22
// This will force Vercel to use the latest commit

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<SimpleLanding />} />
          <Route path="/dashboard" element={<SimpleDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
