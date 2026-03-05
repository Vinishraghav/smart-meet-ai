import { Bot, Calendar, HeartPulse, LineChart, Shield, Sparkles, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS, apiClient } from '../api'

export default function Landing() {
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking')

  useEffect(() => {
    // Check if backend is online
    const checkApiStatus = async () => {
      try {
        await apiClient.get(API_ENDPOINTS.HEALTH)
        setApiStatus('online')
      } catch (error) {
        setApiStatus('offline')
      }
    }

    checkApiStatus()
    const interval = setInterval(checkApiStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      title: 'Real-time AI Transcription',
      description: 'Accurately convert speech to text instantly compatible with Whisper pipelines.',
      icon: <Zap className="text-amber-400" size={24} />,
    },
    {
      title: 'Emotion Recognition',
      description: 'Analyze participant facial expressions and vocal tone during meetings.',
      icon: <HeartPulse className="text-red-400" size={24} />,
    },
    {
      title: 'Automated Summaries',
      description: 'Generate concise key points, decisions, and action items effortlessly.',
      icon: <Bot className="text-indigo-400" size={24} />,
    },
    {
      title: 'Smart Scheduling',
      description: 'AI suggests optimal follow-up meetings based on pending task timelines.',
      icon: <Calendar className="text-emerald-400" size={24} />,
    },
    {
      title: 'Action Item Extraction',
      description: 'Automatically track, assign, and manage tasks derived from conversations.',
      icon: <Shield className="text-blue-400" size={24} />,
    },
    {
      title: 'Advanced Analytics',
      description: 'View deep insights regarding participation, engagement, and meeting efficiency.',
      icon: <LineChart className="text-purple-400" size={24} />,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-surface/80 backdrop-blur-md border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={28} />
            <span className="text-xl font-bold text-foreground">SmartMeet AI</span>
            <div className="flex items-center gap-2 ml-4">
              <div className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-green-500' : apiStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
              <span className="text-xs text-muted-foreground">
                {apiStatus === 'online' ? 'API Online' : apiStatus === 'offline' ? 'API Offline' : 'Checking...'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href={API_ENDPOINTS.DOCS} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              API Docs
            </a>
            <Link to="/dashboard" className="px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 mt-16 flex flex-col items-center justify-center p-6 lg:p-24 overflow-hidden relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <section className="text-center max-w-4xl mx-auto flex flex-col items-center space-y-8 mt-12 mb-32 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 border border-border backdrop-blur-md shadow-sm mb-6">
            <Sparkles className="text-accent" size={16} />
            <span className="text-sm font-medium text-muted-foreground">The Future of Meeting Intelligence</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground drop-shadow-sm leading-tight">
            Meetings that <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">think</span> for you.
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed">
            Record, transcribe, analyze emotion, and extract actionable insights automatically. Built for scale and webhooks integration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-4">
            <Link to="/dashboard" className="px-8 py-4 rounded-full text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1">
              Start Free Trial
            </Link>
            <Link to="/dashboard" className="px-8 py-4 rounded-full text-lg font-semibold bg-surface hover:bg-surface/80 text-foreground transition-all border border-border shadow-lg shadow-background/50 hover:-translate-y-1">
              Login to Dashboard
            </Link>
          </div>
        </section>

        <section className="w-full max-w-6xl mx-auto py-16 z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to automate your workflows and make the most out of every conversation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-panel/50 backdrop-blur-sm border border-border rounded-2xl p-8 text-left group hover:bg-panel/70 transition-all">
                <div className="w-12 h-12 rounded-xl bg-surface/80 border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-4xl mx-auto py-24 text-center z-10 border-t border-border mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to connect with your workflows?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            SmartMeet AI provides webhook-ready REST API endpoints allowing seamless connectivity to your automation pipelines.
          </p>
          <div className="bg-surface/80 backdrop-blur-sm p-6 inline-block font-mono text-sm text-left border border-border rounded-xl">
            <div className="text-accent mb-2"># Live API Endpoints</div>
            <div className="text-primary">POST</div> <span className="text-muted-foreground">{API_ENDPOINTS.CREATE_MEETING}</span><br />
            <div className="text-secondary mt-2">POST</div> <span className="text-muted-foreground">{API_ENDPOINTS.UPLOAD_VIDEO}</span><br />
            <div className="text-accent mt-2">GET</div> <span className="text-muted-foreground">{API_ENDPOINTS.HEALTH}</span>
          </div>
        </section>

      </main>
    </div>
  )
}
