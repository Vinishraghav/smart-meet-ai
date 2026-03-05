import { Activity, FileText, MessageSquare, Mic, PhoneOff, Settings, Share2, Users, Video } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function MeetingRoom() {
  const { meetingId } = useParams<{ meetingId: string }>()
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState<string[]>([])
  const [isExtracting, setIsExtracting] = useState(false)

  const handleStartRecording = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/meetings/${meetingId}/recording/start`, {
        method: 'POST'
      })
      if (response.ok) {
        setIsRecording(true)
        // Simulate transcript lines (replace with real transcript later)
        const mockLines = [
          "Alright, let's get started with the sync.",
          "I'll share my screen in a moment.",
          "Can everyone hear me clearly?",
          "Great, let's review the agenda items.",
          "First point: project timeline updates."
        ]
        mockLines.forEach((line, idx) => {
          setTimeout(() => {
            setTranscript(prev => [...prev, line])
          }, (idx + 1) * 3000)
        })
      }
    } catch (error) {
      console.error("Failed to start recording:", error)
      alert("Failed to start recording. Please check backend connection.")
    }
  }

  const handleStopRecording = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/meetings/${meetingId}/recording/stop`, {
        method: 'POST'
      })
      if (response.ok) {
        setIsRecording(false)
      }
    } catch (error) {
      console.error("Failed to stop recording:", error)
    }
  }

  const handleExtractTranscript = async () => {
    setIsExtracting(true)
    try {
      const response = await fetch(`http://localhost:8000/api/meetings/${meetingId}/transcript/extract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript_lines: transcript })
      })
      if (response.ok) {
        const data = await response.json()
        console.log("Extracted transcript:", data)
        alert("Transcript extraction complete! (Check console)")
      }
    } catch (error) {
      console.error("Failed to extract transcript:", error)
      alert("Failed to extract transcript. Please check backend connection.")
    } finally {
      setIsExtracting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <nav className="bg-surface/80 backdrop-blur-md border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              ← Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <Users className="text-primary" size={20} />
              <span className="font-mono text-sm text-muted-foreground">Meeting: {meetingId}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-muted'}`} />
            <span className="text-sm text-muted-foreground">
              {isRecording ? 'Recording' : 'Not Recording'}
            </span>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex">
        {/* Main meeting area */}
        <div className="flex-1 flex flex-col">
          {/* Video area placeholder */}
          <div className="flex-1 bg-surface/50 border-b border-border flex items-center justify-center">
            <div className="text-center">
              <Video className="text-muted-foreground mx-auto mb-4" size={64} />
              <p className="text-muted-foreground">Video area (WebRTC coming soon)</p>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-surface/80 backdrop-blur-sm border-t border-border p-4">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <PhoneOff size={18} className="inline mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Activity size={18} className="inline mr-2" />
                      Start Recording
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-3 rounded-full bg-surface hover:bg-surface/80 text-foreground border border-border">
                  <Mic size={20} />
                </button>
                <button className="p-3 rounded-full bg-surface hover:bg-surface/80 text-foreground border border-border">
                  <Video size={20} />
                </button>
                <button className="p-3 rounded-full bg-surface hover:bg-surface/80 text-foreground border border-border">
                  <Share2 size={20} />
                </button>
                <button className="p-3 rounded-full bg-surface hover:bg-surface/80 text-foreground border border-border">
                  <Settings size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-96 bg-surface/50 border-l border-border flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <button className="flex-1 px-4 py-3 text-sm font-medium text-primary border-b-2 border-primary bg-panel/30">
              <MessageSquare size={16} className="inline mr-2" />
              Transcript
            </button>
            <button className="flex-1 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
              <FileText size={16} className="inline mr-2" />
              Summary
            </button>
          </div>

          {/* Transcript content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {transcript.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  {isRecording ? "Recording... Transcript will appear here" : "Start recording to see transcript"}
                </p>
              ) : (
                transcript.map((line, idx) => (
                  <div key={idx} className="bg-panel/30 rounded-lg p-3 border border-border">
                    <p className="text-sm text-foreground">{line}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Speaker {idx % 2 + 1} • {new Date(Date.now() - (transcript.length - idx) * 3000).toLocaleTimeString()}
                    </p>
                  </div>
                ))
              )}
            </div>

            {transcript.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <button
                  onClick={handleExtractTranscript}
                  disabled={isExtracting}
                  className="w-full px-4 py-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground rounded-lg font-medium transition-all"
                >
                  {isExtracting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin inline mr-2" />
                      Extracting...
                    </>
                  ) : (
                    "Extract Transcript"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
