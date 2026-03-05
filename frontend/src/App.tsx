import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './index.css'
import SimpleDashboard from './pages/SimpleDashboard'
import SimpleLanding from './pages/SimpleLanding'

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
