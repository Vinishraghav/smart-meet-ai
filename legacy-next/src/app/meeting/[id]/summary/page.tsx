"use client";

import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useStore } from '@/store';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import {
    FileText, CheckCircle2, List, Activity,
    Smile, User, Calendar, Clock, Download, Share2,
    Sparkles, Zap, TrendingUp, AlertCircle, ArrowLeft,
    ChevronRight, Bookmark, PieChart as PieIcon, LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';

const mockEmotionTimeline = [
    { time: '00:00', sentiment: 60 },
    { time: '10:00', sentiment: 85 },
    { time: '20:00', sentiment: 40 },
    { time: '30:00', sentiment: 75 },
    { time: '40:00', sentiment: 90 },
    { time: '50:00', sentiment: 82 },
    { time: '60:00', sentiment: 88 },
];

const mockEmotionSummary = [
    { name: 'Happy', value: 45, color: '#10b981' },
    { name: 'Neutral', value: 35, color: '#6366f1' },
    { name: 'Stressed', value: 15, color: '#f59e0b' },
    { name: 'Confused', value: 5, color: '#ef4444' },
];

export default function MeetingSummary() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const { meetings, actionItems, toggleActionItem } = useStore();
    const meeting = meetings.find(m => m.id === id);

    if (!meeting) {
        return (
            <div className="flex flex-col min-h-screen bg-slate-950 justify-center items-center text-center p-6">
                <Navbar />
                <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-8 shadow-2xl">
                    <Activity size={40} className="text-slate-700" />
                </div>
                <h1 className="text-3xl font-black text-white mb-4 uppercase tracking-widest">Meeting Ended!</h1>
                <p className="text-slate-500 max-w-sm mb-10 font-medium font-mono uppercase tracking-[0.1em]">Thanks for attending! The intelligence core is currently processing the session insights.</p>
                <button
                    onClick={() => router.push('/dashboard')}
                    className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-indigo-500 shadow-2xl shadow-indigo-500/20 active:scale-95"
                >
                    Return to Command Center
                </button>
            </div>
        );
    }

    const formatDate = (dateStr: string) => {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'short', month: 'short', day: 'numeric',
            hour: 'numeric', minute: 'numeric'
        }).format(new Date(dateStr));
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const hrs = Math.floor(mins / 60);
        if (hrs > 0) return `${hrs}h ${mins % 60}m`;
        return `${mins}m`;
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-indigo-500/30">
            <Navbar />

            <main className="flex-1 mt-20 px-6 max-w-7xl mx-auto w-full pb-24">

                {/* Back Button & Secondary Nav */}
                <div className="flex items-center gap-4 mb-10">
                    <button
                        onClick={() => router.push('/meetings')}
                        className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white hover:border-slate-700 transition-all shadow-lg"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                        <span>Library</span>
                        <ChevronRight size={12} className="opacity-20" />
                        <span className="text-indigo-400">Analysis Lab</span>
                        <ChevronRight size={12} className="opacity-20" />
                        <span className="text-slate-400">{id}</span>
                    </div>
                </div>

                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                                Post-Meeting Analytics
                            </div>
                            <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                <Zap size={10} fill="currentColor" /> AI Verified
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-none">
                            {meeting.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-slate-500">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight">
                                <Calendar size={14} className="text-indigo-500" />
                                {formatDate(meeting.date)}
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight">
                                <Clock size={14} className="text-indigo-500" />
                                {formatDuration(meeting.duration)}
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight">
                                <User size={14} className="text-indigo-500" />
                                {meeting.participants.length} Participant(s)
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                        <button className="flex items-center gap-3 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl border border-slate-800 transition-all text-xs font-black uppercase tracking-widest shadow-xl">
                            <Download size={18} />
                            Report
                        </button>
                        <button className="flex items-center gap-3 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl shadow-2xl shadow-indigo-500/20 transition-all text-xs font-black uppercase tracking-widest active:scale-95">
                            <Share2 size={18} />
                            Broadcast
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left & Middle Column */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* AI High-Level Insight Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-panel p-6 border-l-4 border-amber-500 bg-gradient-to-br from-amber-500/5 to-transparent shadow-xl"
                            >
                                <div className="flex items-center gap-2 text-amber-500 text-[10px] font-black uppercase tracking-widest mb-4">
                                    <Sparkles size={14} /> AI Perspective
                                </div>
                                <h3 className="text-white font-bold leading-relaxed mb-2">Efficiency reached 92% this session.</h3>
                                <p className="text-xs text-slate-500 font-medium">Discussion was highly focused with minimal off-topic segments detected. Peak clarity observed during the API Webhook phase.</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="glass-panel p-6 border-l-4 border-indigo-500 bg-gradient-to-br from-indigo-500/5 to-transparent shadow-xl"
                            >
                                <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">
                                    <Activity size={14} /> Signal Confidence
                                </div>
                                <h3 className="text-white font-bold leading-relaxed mb-2">3 Primary Decisions Locked.</h3>
                                <p className="text-xs text-slate-500 font-medium">Consensus was reached on architectural shifts. Action items have been automatically distributed to relevant leads.</p>
                            </motion.div>
                        </div>

                        {/* Detailed AI Summary / Takeaways */}
                        <div className="glass-panel p-10 bg-slate-900/40 relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                                <FileText size={120} />
                            </div>
                            <h2 className="text-xl font-black text-white mb-10 flex items-center gap-3 uppercase tracking-tight">
                                <Bookmark className="text-indigo-400" size={20} />
                                Intelligence Synopsis
                            </h2>
                            <div className="space-y-10 relative z-10">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Key Discussion Verticals</h3>
                                    {[
                                        "Project Velocity & Obstacles: Team analyzed current Q3 blockers specifically regarding the legacy API integration.",
                                        "Architectural Evolution: Deep dive into the shift from traditional processing to real-time event-driven architecture.",
                                        "Deployment Guardrails: Agreement on automated testing phases and n8n webhook validation protocols."
                                    ].map((point, idx) => (
                                        <div key={idx} className="flex gap-4 items-start p-5 rounded-3xl bg-slate-800/30 border border-slate-800/50 hover:bg-slate-800/50 transition-colors group/point">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0 group-hover/point:scale-150 transition-transform" />
                                            <p className="text-sm text-slate-300 font-medium leading-relaxed">{point}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-10 border-t border-slate-800/80">
                                    <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.3em] mb-6">Strategic Decisions</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 group/card">
                                            <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                                                <CheckCircle2 size={12} /> Execution Path
                                            </div>
                                            <p className="text-white text-sm font-bold leading-relaxed">Standardize on n8n for all meeting-to-task automation flows.</p>
                                        </div>
                                        <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 group/card">
                                            <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                                                <LayoutDashboard size={12} /> System Design
                                            </div>
                                            <p className="text-white text-sm font-bold leading-relaxed">Deprecate REST endpoints in favor of a full GraphQL implementation by EOM.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mood Timeline Chart */}
                        <div className="glass-panel p-10 shadow-2xl">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                    <TrendingUp className="text-indigo-400" size={20} />
                                    Team Engagement Flow
                                </h2>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500" /> Sentiment
                                    </div>
                                </div>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={mockEmotionTimeline}>
                                        <defs>
                                            <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                                        />
                                        <Area type="monotone" dataKey="sentiment" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSentiment)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-8">

                        {/* Circular Mood Analysis */}
                        <div className="glass-panel p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Smile size={60} />
                            </div>
                            <h2 className="text-lg font-black text-white mb-8 border-b border-slate-800 pb-4 uppercase tracking-widest">
                                Mood Signature
                            </h2>
                            <div className="h-64 relative flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={mockEmotionSummary}
                                            innerRadius={65}
                                            outerRadius={90}
                                            paddingAngle={8}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {mockEmotionSummary.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-3xl font-black text-white">HI-RES</span>
                                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Telemetry</span>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-3">
                                {mockEmotionSummary.map((item) => (
                                    <div key={item.name} className="flex flex-col p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-slate-700 transition-all">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.name}</span>
                                        </div>
                                        <span className="text-lg font-black text-white">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Items */}
                        <div className="glass-panel p-8 shadow-2xl">
                            <h2 className="text-lg font-black text-white mb-8 border-b border-slate-800 pb-4 uppercase tracking-widest flex items-center justify-between">
                                <span>Action Matrix</span>
                                <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">{actionItems.filter(a => a.completed).length}/{actionItems.length}</span>
                            </h2>
                            <div className="space-y-4">
                                {actionItems.length > 0 ? actionItems.map(item => (
                                    <div key={item.id} className="flex items-start gap-4 p-5 rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:bg-slate-900 transition-colors group/task">
                                        <button
                                            onClick={() => toggleActionItem(item.id)}
                                            className={`mt-1 transition-all transform hover:scale-110 ${item.completed ? 'text-emerald-500' : 'text-slate-700 group-hover/task:text-indigo-500'}`}
                                        >
                                            {item.completed ? <CheckCircle2 size={24} /> : <div className="w-6 h-6 rounded-full border-2 border-current" />}
                                        </button>
                                        <div className="flex-1">
                                            <p className={`text-sm font-bold leading-relaxed ${item.completed ? 'text-slate-600 line-through' : 'text-slate-200'} transition-all`}>
                                                {item.task}
                                            </p>
                                            <div className="flex items-center gap-3 mt-3">
                                                <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700/50 text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                                                    <User size={10} className="text-indigo-400" />
                                                    {item.assignee}
                                                </div>
                                                <div className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">
                                                    Due {item.dueDate}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-10 opacity-30">
                                        <AlertCircle size={40} className="mx-auto mb-4" />
                                        <p className="text-xs font-bold uppercase tracking-widest">No Tasks Detected</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Transcript Quick Look */}
                        <div className="glass-panel p-8 shadow-2xl bg-indigo-500/5">
                            <h2 className="text-lg font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                                <List className="text-indigo-400" size={18} />
                                Core Transcript
                            </h2>
                            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide opacity-60 hover:opacity-100 transition-opacity">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="space-y-2 border-l-2 border-slate-800 pl-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">ALEX (HOST)</span>
                                            <span className="text-[9px] text-slate-600 font-mono">10:0{i}:24</span>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                            "We need to ensure the n8n logic is bulletproof for the March release. I've already shared the initial schema with the dev team."
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                                View Full Knowledge Base
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
