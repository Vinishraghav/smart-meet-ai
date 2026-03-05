import { Activity, Calendar, Clock, Play, Plus, Sparkles, Users } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_ENDPOINTS, apiClient } from '../api'

interface Meeting {
  id: string
  title: string
  meeting_code: string
  created_at: string
  status: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [isInitializing, setIsInitializing] = useState(false)
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch meetings from backend
  const fetchMeetings = async () => {
    try {
      // TODO: Implement get meetings endpoint
      // const data = await apiClient.get(API_ENDPOINTS.GET_MEETINGS)
      // setMeetings(data.meetings || [])
      setMeetings([]) // Empty for now
    } catch (error) {
      console.error("Failed to fetch meetings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMeetings()
  }, [])

  const handleStartMeeting = async () => {
    setIsInitializing(true)
    try {
      const response = await apiClient.post(API_ENDPOINTS.CREATE_MEETING, {
        title: 'Instant Meeting',
        description: 'Started from dashboard'
      })

      if (response.meeting_id) {
        navigate(`/meeting/${response.meeting_id}`)
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (error) {
      console.error("Failed to start meeting:", error)
      alert("Failed to create meeting. Please try again.")
    } finally {
      setIsInitializing(false)
    }
  }

  const handleJoinMeeting = async () => {
    const code = prompt("Enter meeting code:")
    if (code) {
      try {
        const response = await apiClient.post(API_ENDPOINTS.JOIN_MEETING, {
          meeting_code: code
        })

        if (response.meeting_id) {
          navigate(`/meeting/${response.meeting_id}`)
        } else {
          alert("Invalid meeting code")
        }
      } catch (error) {
        console.error("Failed to join meeting:", error)
        alert("Failed to join meeting. Please check the code.")
      }
    }
  }

  const hasMeetings = meetings.length > 0

  // Empty State
  if (!hasMeetings && !isLoading) {
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

  // Loading State
  if (isLoading) {
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

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your meetings...</p>
          </div>
        </main>
      </div>
    )
  }

  // Dashboard with meetings
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <nav className="bg-surface/80 backdrop-blur-md border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={28} />
            <span className="text-xl font-bold text-foreground">SmartMeet AI</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={API_ENDPOINTS.DOCS} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              API Docs
            </a>
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 mt-20 px-6 max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Workspace Intelligence</h1>
            <p className="text-muted-foreground">Manage your AI-powered meetings and recordings.</p>
          </div>
          <button
            onClick={handleStartMeeting}
            disabled={isInitializing}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground px-6 py-3 rounded-full font-medium transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            {isInitializing ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus size={18} />
                New Meeting
              </>
            )}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-panel/50 backdrop-blur-sm border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Calendar className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{meetings.length}</p>
                <p className="text-sm text-muted-foreground">Total Meetings</p>
              </div>
            </div>
          </div>

          <div className="bg-panel/50 backdrop-blur-sm border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Activity className="text-green-500" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-sm text-muted-foreground">Active Now</p>
              </div>
            </div>
          </div>

          <div className="bg-panel/50 backdrop-blur-sm border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Clock className="text-blue-500" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">0h</p>
                <p className="text-sm text-muted-foreground">Total Duration</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-panel/50 backdrop-blur-sm border border-border rounded-2xl">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Recent Meetings</h2>
          </div>

          {meetings.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-surface/80 border border-border flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-muted-foreground" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No meetings yet</h3>
              <p className="text-muted-foreground mb-6">Start your first AI-powered meeting to see it here.</p>
              <button
                onClick={handleStartMeeting}
                disabled={isInitializing}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground px-6 py-3 rounded-full font-medium transition-all"
              >
                <Plus size={18} />
                Start First Meeting
              </button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="p-6 hover:bg-panel/70 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{meeting.title}</h3>
                      <p className="text-sm text-muted-foreground">Code: {meeting.meeting_code}</p>
                      <p className="text-xs text-muted-foreground">{new Date(meeting.created_at).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/meeting/${meeting.id}`)}
                      className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors"
                    >
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
