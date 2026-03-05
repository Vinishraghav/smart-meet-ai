import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function SimpleLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <nav className="bg-surface/80 backdrop-blur-md border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={28} />
            <span className="text-xl font-bold text-foreground">SmartMeet AI</span>
          </div>
          <Link to="/dashboard" className="px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-4xl">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/40 mx-auto mb-8">
            <Sparkles className="text-white" size={64} />
          </div>

          <h1 className="text-6xl font-bold text-foreground mb-6">
            Meetings that <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">think</span> for you
          </h1>
          <p className="text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            AI-powered meeting platform with video recording, transcription, and intelligent insights
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="px-8 py-4 rounded-full text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-xl">
              Start Free Trial
            </Link>
            <a 
              href="https://smart-meet-ai-production.up.railway.app/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-lg font-semibold bg-surface hover:bg-surface/80 text-foreground transition-all border border-border"
            >
              View API Docs
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
