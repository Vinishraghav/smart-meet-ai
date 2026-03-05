"use client";

import Navbar from '@/components/Navbar';
import { useStore } from '@/store';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Activity,
    AlertCircle, Bookmark,
    Copy,
    FileText,
    MessageSquare,
    Mic, MicOff,
    Monitor,
    PhoneOff,
    Send,
    Settings,
    Share2,
    Smile,
    Sparkles,
    Users,
    Video, VideoOff,
    X,
    Zap
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// Expanded AI simulation
const mockTranscriptLines = [
    "Alright, let's get started with the sync.",
    "I have shared the design drafts yesterday.",
    "What is the timeline for the backend API deployment?",
    "We expect the webhooks to be ready by next Friday.",
    "We should also consider service communication patterns."
];

const mockInterviewQuestions = [
    "Ask about their experience with scalable systems.",
    "They mentioned microservices. Ask how they handled service communication.",
    "Ask how they would optimize the database for high read loads."
];

const mockDynamicInsights = [
    { text: "Action item detected: Review design drafts. Add task?", type: "action" },
    { text: "Participants seem disengaged. Consider asking a question.", type: "engagement" },
    { text: "Important decision detected: Save to meeting summary?", type: "decision" },
    { text: "You look tired. Consider taking a short break.", type: "health" }
];

export default function MeetingRoom() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const { endMeeting, recordingMode, meetings } = useStore();

    const meetingInfo = meetings.find(m => m.id === id);
    const isInterview = meetingInfo?.type === 'interview';

    const [isRecording, setIsRecording] = useState(recordingMode === 'auto');
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);

    const [transcript, setTranscript] = useState<{ sender: string, text: string }[]>([]);
    const [insights, setInsights] = useState<string[]>([]);
    const [livePopup, setLivePopup] = useState<{ text: string, type: string } | null>(null);

    const [sidebarTab, setSidebarTab] = useState<'chat' | 'ai' | 'participants' | 'notes'>('ai');
    const [aiQuestion, setAiQuestion] = useState("");
    const [isAnswering, setIsAnswering] = useState(false);
    const [aiAnswers, setAiAnswers] = useState<string[]>([]);

    const transcriptEndRef = useRef<HTMLDivElement>(null);

    // Simulating live meeting behavior
    useEffect(() => {
        if (!isRecording) return;

        let lineIdx = 0;
        const interval = setInterval(() => {
            // Only simulate host voice for now to match 'alone' state
            if (lineIdx < 5) {
                setTranscript(prev => [...prev, { sender: 'You', text: "Analyzing the project scope and preparing the AI roadmap..." }]);

                // Randomly show a high-quality popup insight
                if (Math.random() > 0.6) {
                    const insight = mockDynamicInsights[Math.floor(Math.random() * mockDynamicInsights.length)];
                    setLivePopup(insight);
                    if (!insights.includes(insight.text)) {
                        setInsights(prev => [insight.text, ...prev]);
                    }
                    setTimeout(() => setLivePopup(null), 6000);
                }

                lineIdx++;
            }
        }, 8000);

        return () => clearInterval(interval);
    }, [isRecording, insights]);

    useEffect(() => {
        transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [transcript]);

    const [isEnding, setIsEnding] = useState(false);
    const [processStep, setProcessStep] = useState(0);

    const [baseUrl, setBaseUrl] = useState("");

    // Initialize meeting if joining via link (simulating shared DB)
    useEffect(() => {
        setBaseUrl(window.location.origin);
        if (!meetingInfo && id) {
            // Auto-create meeting in store if joining via shared link
            useStore.getState().addMeeting({
                id,
                meetingId: id,
                title: 'Joined Meeting',
                hostId: '2',
                date: new Date().toISOString(),
                duration: 0,
                status: 'ongoing',
                participants: [
                    { id: '1', meetingId: id, name: 'You', email: '', joinedAt: new Date().toISOString(), micOn: false, cameraOn: false, isHost: false },
                    { id: '2', meetingId: id, name: 'Host', email: '', joinedAt: new Date().toISOString(), micOn: false, cameraOn: false, isHost: true }
                ],
                type: 'general',
                recordingEnabled: false
            });
        }
    }, [id, meetingInfo]);

    const handleEndMeeting = () => {
        setIsEnding(true);
        const steps = ["Transcribing Voice...", "Extracting Tasks...", "Analyzing Team Sentiment...", "Finalizing Report..."];
        const stepInterval = setInterval(() => {
            setProcessStep(prev => {
                if (prev >= steps.length - 1) {
                    clearInterval(stepInterval);
                    return prev;
                }
                return prev + 1;
            });
        }, 800);

        setTimeout(() => {
            endMeeting(id, 3600, 92, 78);
            router.push(`/meeting/${id}/summary`);
        }, 3500);
    };

    const copyMeetingLink = () => {
        const link = `${baseUrl}/meeting/${id}`;
        navigator.clipboard.writeText(link);
        alert("Meeting Link Copied: " + link);
    };

    const askAi = () => {
        if (!aiQuestion.trim()) return;
        setIsAnswering(true);

        setTimeout(() => {
            const response = isInterview
                ? "Suggestion: Ask how their microservices handle eventual consistency vs strict consistency."
                : "Summary: The team is focusing on the March 15th deadline for the webhook stabilization phase.";
            setAiAnswers(prev => [response, ...prev]);
            setIsAnswering(false);
            setAiQuestion("");
        }, 1500);
    };

    return (
        <div className="flex flex-col h-screen bg-slate-950 overflow-hidden font-sans text-slate-200">
            <AnimatePresence>
                {isEnding && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center"
                    >
                        <div className="relative mb-12">
                            <div className="w-32 h-32 rounded-full border-b-2 border-indigo-500 animate-spin" />
                            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-widest">Generating AI Intelligence</h2>
                        <div className="space-y-4 w-full max-w-xs text-left mx-auto">
                            {["Transcribing Voice...", "Extracting Tasks...", "Analyzing Team Sentiment...", "Finalizing Report..."].map((step, idx) => (
                                <div key={idx} className={`flex items-center gap-4 transition-all duration-500 ${idx === processStep ? 'opacity-100 scale-105' : idx < processStep ? 'opacity-40 grayscale scale-95' : 'opacity-10 scale-90'}`}>
                                    <div className={`w-2 h-2 rounded-full ${idx === processStep ? 'bg-indigo-500 animate-pulse' : idx < processStep ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                                    <span className={`text-xs font-black uppercase tracking-widest ${idx === processStep ? 'text-indigo-400' : 'text-slate-500'}`}>{step}</span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-12 text-[10px] text-slate-600 font-mono animate-pulse uppercase tracking-[0.2em]">DO NOT CLOSE TAB • ENCRYPTING POST-MEETING SYNOPSIS</p>
                    </motion.div>
                )}
            </AnimatePresence>
            <Navbar />

            {/* Live AI Insight Floating Popups */}
            <AnimatePresence>
                {livePopup && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        className="absolute top-20 left-1/2 z-50 w-full max-w-sm"
                    >
                        <div className={`glass-panel px-6 py-4 flex items-center gap-4 shadow-2xl bg-slate-900 border-l-4 ${livePopup.type === 'action' ? 'border-indigo-500' :
                            livePopup.type === 'engagement' ? 'border-amber-500' :
                                livePopup.type === 'decision' ? 'border-emerald-500' : 'border-red-500'
                            }`}>
                            <div className={`p-2 rounded-xl bg-slate-800 ${livePopup.type === 'action' ? 'text-indigo-400' :
                                livePopup.type === 'engagement' ? 'text-amber-400' :
                                    livePopup.type === 'decision' ? 'text-emerald-400' : 'text-red-400'
                                }`}>
                                {livePopup.type === 'action' ? <Zap size={20} /> : <AlertCircle size={20} />}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-white leading-tight">{livePopup.text}</p>
                            </div>
                            <button
                                onClick={() => setLivePopup(null)}
                                className="p-1 hover:bg-slate-800 rounded-lg text-slate-500 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-1 mt-16 p-4 flex flex-col lg:flex-row gap-4 h-[calc(100vh-4rem)]">

                {/* Main Content Area: Video/Screen Share */}
                <div className="flex-1 flex flex-col gap-4 relative">

                    <div className="flex-1 rounded-3xl relative overflow-hidden flex flex-col bg-slate-900 justify-center items-center group ring-1 ring-slate-800 shadow-2xl">
                        {!cameraOn ? (
                            <div className="w-40 h-40 rounded-3xl bg-slate-800 flex items-center justify-center border-4 border-slate-700 shadow-inner">
                                <span className="text-6xl text-slate-600 font-black">AI</span>
                            </div>
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 z-10" />

                                {/* Mock Video Feed Placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 font-mono text-sm tracking-widest uppercase opacity-40">
                                        [Secure Video Stream active]
                                    </div>
                                </div>

                                {/* Active Speaker Labels */}
                                <div className="absolute bottom-8 left-8 z-20 flex flex-col md:flex-row items-end md:items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg transform rotate-3">
                                            <span className="text-white font-black text-xl">
                                                {meetingInfo?.title[0] || 'S'}
                                            </span>
                                        </div>
                                        <div className="bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/5">
                                            <p className="text-white font-bold tracking-tight">
                                                {meetingInfo?.title || 'Initializing Room...'}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-widest max-w-[120px] truncate">
                                                    ID: {id}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Link and Share */}
                                    <div
                                        onClick={copyMeetingLink}
                                        className="bg-slate-900/60 backdrop-blur-xl px-4 py-2 rounded-2xl border border-indigo-500/30 flex items-center gap-3 group/link cursor-pointer hover:bg-slate-900 transition-all shadow-xl"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Meeting Link</span>
                                            <span className="text-xs text-white font-mono opacity-80 group-hover/link:opacity-100 transition-opacity">
                                                {baseUrl.replace(/^https?:\/\//, '')}/meeting/{id.substring(0, 8)}...
                                            </span>
                                        </div>
                                        <div className="w-px h-6 bg-slate-800 mx-1" />
                                        <button className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-colors">
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Realtime AI Context Labels */}
                                <div className="absolute top-8 right-8 z-20 flex flex-col gap-3">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="glass-panel px-4 py-2 bg-indigo-500/10 border-indigo-500/20 backdrop-blur-xl flex items-center gap-3"
                                    >
                                        <Zap className="text-indigo-400" size={16} />
                                        <span className="text-xs font-bold text-indigo-300">AI Transcription Active</span>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="glass-panel px-4 py-2 bg-emerald-500/10 border-emerald-500/20 backdrop-blur-xl flex items-center gap-3"
                                    >
                                        <Activity className="text-emerald-400" size={16} />
                                        <span className="text-xs font-bold text-emerald-400">Team Mood: Highly Engaged</span>
                                    </motion.div>
                                </div>
                            </>
                        )}

                        {/* Participants Overlay - Starts Alone like Google Meet */}
                        <div className="absolute bottom-8 right-8 z-20 flex gap-2">
                            <div className="px-6 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shadow-xl backdrop-blur-md">
                                <div className="w-2 h-2 rounded-full bg-indigo-500 mr-3 animate-pulse" />
                                <span className="text-xs font-black text-indigo-300 uppercase tracking-widest">You (Alone in room)</span>
                            </div>
                        </div>
                    </div>

                    {/* Unified Meeting Controls Bar */}
                    <div className="h-24 glass-panel bg-slate-900/90 flex items-center justify-between px-8 border-slate-800/80">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setMicOn(!micOn)}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${micOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500/20 text-red-500 ring-2 ring-red-500/50'}`}
                            >
                                {micOn ? <Mic size={24} /> : <MicOff size={24} />}
                            </button>
                            <button
                                onClick={() => setCameraOn(!cameraOn)}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${cameraOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500/20 text-red-500 ring-2 ring-red-500/50'}`}
                            >
                                {cameraOn ? <Video size={24} /> : <VideoOff size={24} />}
                            </button>
                            <button
                                onClick={() => setIsScreenSharing(!isScreenSharing)}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isScreenSharing ? 'bg-indigo-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-400'}`}
                            >
                                <Monitor size={24} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-800/50 p-2 rounded-3xl border border-slate-700/50">
                            <button
                                onClick={() => setIsRecording(!isRecording)}
                                className={`flex items-center gap-3 px-6 h-12 rounded-2xl transition-all font-bold text-sm ${isRecording ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-slate-700 text-slate-400'}`}
                            >
                                <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`} />
                                {isRecording ? 'Recording' : 'Start Recording'}
                            </button>
                            <div className="h-6 w-px bg-slate-700/50 mx-1" />
                            <button className="p-3 text-slate-400 hover:text-white transition-colors">
                                <Settings size={20} />
                            </button>
                            <button
                                onClick={() => setSidebarTab('ai')}
                                className={`p-3 rounded-xl transition-all ${sidebarTab === 'ai' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700'}`}
                            >
                                <Sparkles size={20} />
                            </button>
                        </div>

                        <button
                            onClick={handleEndMeeting}
                            className="w-14 h-14 rounded-2xl bg-red-600 hover:bg-red-500 flex items-center justify-center transition-all shadow-xl shadow-red-600/30 hover:-translate-y-1 active:scale-95"
                        >
                            <PhoneOff size={24} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Sidebar: AI Tools, Chat, Participants */}
                <div className="w-full lg:w-[480px] flex flex-col gap-4">

                    {/* Sidebar Tab Control */}
                    <div className="glass-panel p-1.5 flex items-center justify-between rounded-2xl bg-slate-900 border-slate-800 shadow-xl">
                        {[
                            { id: 'ai', icon: <Sparkles size={18} />, label: 'AI Intelligence' },
                            { id: 'chat', icon: <MessageSquare size={18} />, label: 'Chat' },
                            { id: 'participants', icon: <Users size={18} />, label: 'People' },
                            { id: 'notes', icon: <FileText size={18} />, label: 'Meeting Notes' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setSidebarTab(tab.id as any)}
                                className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl transition-all ${sidebarTab === tab.id ? 'bg-slate-800 text-indigo-400 shadow-inner ring-1 ring-white/5' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'}`}
                            >
                                {tab.icon}
                                <span className="text-[10px] font-bold uppercase tracking-wider mt-1">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 glass-panel bg-slate-900 border-slate-800 flex flex-col overflow-hidden relative shadow-2xl">

                        {/* AI Tab Content */}
                        {sidebarTab === 'ai' && (
                            <div className="flex-1 flex flex-col p-6 animate-in fade-in slide-in-from-right duration-300 overflow-hidden">
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold leading-none">AI Intelligence Hub</h3>
                                            <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest">Real-time Analysis active</p>
                                        </div>
                                    </div>
                                    <Share2 className="text-slate-500 hover:text-white cursor-pointer" size={18} />
                                </div>

                                <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-hide">
                                    {/* Interview Assistant Section */}
                                    {isInterview && (
                                        <div className="p-5 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 bg-gradient-to-br from-indigo-500/10 to-transparent">
                                            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase mb-4">
                                                <Smile size={16} /> Interview Co-pilot
                                            </div>
                                            <p className="text-sm font-bold text-white mb-4">Suggested Questions:</p>
                                            <div className="space-y-3">
                                                {mockInterviewQuestions.map((q, idx) => (
                                                    <div key={idx} className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/50 text-xs text-slate-300 hover:border-indigo-500/50 cursor-pointer transition-colors flex items-start gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                                                        {q}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* AI Response Feed */}
                                    <div className="space-y-4">
                                        {aiAnswers.map((answer, i) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                key={i}
                                                className="p-4 rounded-3xl bg-slate-800/50 border border-slate-700/80 shadow-lg relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 p-3">
                                                    <Sparkles size={14} className="text-indigo-400/30" />
                                                </div>
                                                <p className="text-xs font-bold text-indigo-400 mb-2 font-mono uppercase">AI Assistant</p>
                                                <p className="text-sm text-slate-300 leading-relaxed font-medium">{answer}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Insights Log */}
                                    <div className="space-y-4 pt-4 border-t border-slate-800">
                                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Insights Detected</h4>
                                        {insights.map((text, i) => (
                                            <div key={i} className="flex gap-4 p-4 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                                                <Bookmark size={16} className="text-slate-600 mt-1 shrink-0" />
                                                <p className="text-xs text-slate-400 leading-relaxed">{text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* AI Input Area */}
                                <div className="mt-8 pt-4 border-t border-slate-800">
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                            <Sparkles className={`text-indigo-500 transition-all ${isAnswering ? 'animate-spin' : ''}`} size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            value={aiQuestion}
                                            onChange={(e) => setAiQuestion(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && askAi()}
                                            placeholder="Ask AI anything about the meeting..."
                                            className="w-full bg-slate-800 border border-slate-700 rounded-2xl pl-12 pr-12 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-600 font-medium"
                                        />
                                        <button
                                            onClick={askAi}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-500 transition-all"
                                        >
                                            <Send size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Chat Tab Content */}
                        {sidebarTab === 'chat' && (
                            <div className="flex-1 flex flex-col p-6 animate-in fade-in slide-in-from-right duration-300">
                                <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                                    <div className="text-center py-8">
                                        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">End-to-End Encryption Active</p>
                                    </div>
                                    <div className="flex flex-col gap-1 items-start">
                                        <span className="text-[10px] font-bold text-slate-500 ml-1 mb-1">DAVID Miller • 10:24 AM</span>
                                        <div className="px-4 py-3 bg-slate-800 rounded-3xl rounded-tl-none border border-slate-700 text-sm">
                                            Hey Alex, did you see the new mockups for the dashboard?
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-auto pt-4">
                                    <input
                                        type="text"
                                        placeholder="Message participants..."
                                        className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Participants Hub - Starts Empty */}
                        {sidebarTab === 'participants' && (
                            <div className="flex-1 p-6 space-y-8 animate-in fade-in slide-in-from-right duration-300">
                                <div className="flex items-center justify-between font-bold text-white">
                                    <h3 className="uppercase tracking-widest text-xs">People</h3>
                                    <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full ring-1 ring-indigo-500/20 font-black">1 Active</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-3xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-black text-white shadow-lg">
                                                Y
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-white uppercase tracking-tight">You (Host)</p>
                                                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">Moderator</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mic size={16} className="text-indigo-400" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-slate-800 text-center">
                                    <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 opacity-40">
                                        <Users size={32} className="text-slate-600" />
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium mb-6">Waiting for others to join...</p>
                                    <button
                                        onClick={copyMeetingLink}
                                        className="w-full py-4 rounded-2xl bg-slate-800 border border-slate-700 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Copy size={14} /> Copy Invite Link
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Live Transcript Overlay for always-visible monitoring */}
                        <div className="h-40 border-t border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-end">
                            <div className="flex-1 overflow-hidden pointer-events-none relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                                <div className="flex flex-col gap-2 opacity-60">
                                    {transcript.slice(-3).map((line, idx) => (
                                        <p key={idx} className="text-[11px] leading-relaxed line-clamp-1 italic font-mono text-slate-500">
                                            <b className="text-slate-400 uppercase tracking-tighter mr-2 font-black">{line.sender}:</b> {line.text}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
