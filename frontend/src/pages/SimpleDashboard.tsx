import { Link } from 'react-router-dom'
import { Sparkles, Play, Users } from 'lucide-react'

export default function SimpleDashboard() {
  const handleStartMeeting = async () => {
    try {
      const response = await fetch('https://smart-meet-ai-production.up.railway.app/api/v1/meetings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Instant Meeting' })
      })

      if (response.ok) {
        const data = await response.json()
        window.location.href = `/meeting/${data.meeting_id}`
      } else {
        alert('Failed to create meeting')
      }
    } catch (error) {
      alert('Connection error. Please try again.')
    }
  }

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

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/40 mx-auto mb-8">
            <Sparkles className="text-white" size={48} />
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to Smart<span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Meet</span> AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Start your first AI-powered meeting
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleStartMeeting}
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20"
            >
              <Play size={20} fill="currentColor" />
              Start Meeting
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-surface hover:bg-surface/80 text-foreground px-8 py-4 rounded-2xl font-bold transition-all border border-border">
              <Users size={20} />
              Join Meeting
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
