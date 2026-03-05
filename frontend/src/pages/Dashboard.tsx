import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Play, Calendar, Clock, Activity, Users, Sparkles, Plus } from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const [isInitializing, setIsInitializing] = useState(false)
  const [meetings] = useState([]) // TODO: fetch from backend

  const handleStartMeeting = async () => {
    setIsInitializing(true)
    try {
      const response = await fetch('http://localhost:8000/api/meetings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Instant Sync' })
      })

      if (!response.ok) throw new Error('API failed')

      const { meeting_code, meeting_id } = await response.json()
      navigate(`/meeting/${meeting_id}`)
    } catch (error) {
      console.error("Failed to start meeting:", error)
      alert("Connection error. Please ensure the backend is running.")
    } finally {
      setIsInitializing(false)
    }
  }

  const handleJoinMeeting = () => {
    const code = prompt("Enter meeting code:")
    if (code) {
      // TODO: validate code and navigate
      navigate(`/meeting/${code}`)
    }
  }

  const hasMeetings = meetings.length > 0

  // Empty State
  if (!hasMeetings) {
    return (
      <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
        <nav className="bg-surface/80 backdrop-blur-md border-b border-border px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary" size={28} />
              <span className="text-xl font-bold text-foreground">SmartMeet AI</span>
            </div>
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Back to Home
            </Link>
          </div>
        </nav>

        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-700">
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full -z-10" />
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/40 relative z-10 mx-auto">
              <Sparkles className="text-white" size={48} />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Welcome to Smart<span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Meet</span> AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mb-10 font-light">
            Start your first AI-powered meeting to unlock intelligent insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <button
              onClick={handleStartMeeting}
              disabled={isInitializing}
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20 hover:-translate-y-1"
            >
              {isInitializing ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Play size={20} fill="currentColor" />
                  Start Instant Meeting
                </>
              )}
            </button>
            <button
              onClick={handleJoinMeeting}
              className="flex-1 flex items-center justify-center gap-2 bg-surface hover:bg-surface/80 text-foreground px-8 py-4 rounded-2xl font-bold transition-all border border-border hover:-translate-y-1"
            >
              <Users size={20} />
              Join Meeting
            </button>
          </div>
        </main>
      </div>
    )
  }

  // TODO: Implement dashboard with meetings list
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <nav className="bg-surface/80 backdrop-blur-md border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={28} />
            <span className="text-xl font-bold text-foreground">SmartMeet AI</span>
          </div>
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Back to Home
          </Link>
        </div>
      </nav>

      <main className="flex-1 mt-20 px-6 max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Workspace Intelligence</h1>
            <p className="text-muted-foreground">Here's a breakdown of your meeting network connectivity.</p>
          </div>
          <button
            onClick={handleStartMeeting}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-medium transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            <Plus size={18} />
            New Meeting
          </button>
        </header>

        <div className="text-center py-20">
          <p className="text-muted-foreground">Meetings list coming soon...</p>
        </div>
      </main>
    </div>
  )
}
