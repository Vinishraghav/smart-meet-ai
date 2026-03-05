"use client";

import Navbar from '@/components/Navbar';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line
} from 'recharts';
import {
    Play, Video, Calendar, Clock, Activity,
    CheckCircle2, Circle, Users, Sparkles, Plus,
    LayoutDashboard, TrendingUp, Smile, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const activityData = [
    { name: 'Mon', hours: 2.5 },
    { name: 'Tue', hours: 3.8 },
    { name: 'Wed', hours: 1.2 },
    { name: 'Thu', hours: 4.5 },
    { name: 'Fri', hours: 2.1 },
    { name: 'Sat', hours: 0 },
    { name: 'Sun', hours: 0 },
];

const emotionData = [
    { time: '10:00', value: 65 },
    { time: '10:15', value: 78 },
    { time: '10:30', value: 82 },
    { time: '10:45', value: 90 },
    { time: '11:00', value: 85 },
];

export default function Dashboard() {
    const router = useRouter();
    const { meetings, actionItems, toggleActionItem, startMeeting } = useStore();
    const [isInitializing, setIsInitializing] = useState(false);

    const handleStartMeeting = async () => {
        setIsInitializing(true);
        try {
            const response = await fetch('/api/meetings/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'Instant Sync' })
            });

            if (!response.ok) throw new Error('API failed');

            const { meetingId } = await response.json();

            // Add to local store for demo persistence
            startMeeting('Instant Sync', 'general', meetingId);

            router.push(`/meet/${meetingId}`);
        } catch (error) {
            console.error("Failed to start meeting:", error);
            setIsInitializing(false);
            alert("Connection error. Using fallback logic.");
            const fallbackId = startMeeting('Instant Sync', 'general');
            router.push(`/meet/${fallbackId}`);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'short', month: 'short', day: 'numeric',
            hour: 'numeric', minute: 'numeric'
        }).format(new Date(dateStr));
    };

    const completedMeetings = meetings.filter(m => m.status === 'completed');
    const upcomingMeetings = meetings.filter(m => m.status === 'upcoming');
    const recentMeetings = completedMeetings.slice(0, 3);

    const hasMeetings = meetings.length > 0;

    // Empty State Component
    if (!hasMeetings) {
        return (
            <div className="flex flex-col min-h-screen bg-slate-900 overflow-x-hidden">
                <Navbar />
                <main className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-700">
                    <div className="relative mb-12">
                        <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full -z-10" />
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl shadow-indigo-500/40 relative z-10 mx-auto">
                            <Sparkles className="text-white" size={48} />
                        </div>
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center"
                        >
                            <Zap className="text-amber-400" size={20} />
                        </motion.div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Welcome to Smart<span className="text-gradient">Meet</span> AI
                    </h1>
                    <p className="text-xl text-slate-400 max-w-lg mb-10 font-light">
                        Start your first AI-powered meeting to unlock intelligent insights.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                        <button
                            onClick={handleStartMeeting}
                            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20 hover:-translate-y-1"
                        >
                            <Play size={20} fill="currentColor" />
                            Start Instant Meeting
                        </button>
                        <button
                            onClick={() => router.push('/calendar')}
                            className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl font-bold transition-all border border-slate-700/50 hover:-translate-y-1"
                        >
                            <Calendar size={20} />
                            Schedule Meeting
                        </button>
                    </div>

                    <button
                        className="mt-6 flex items-center gap-2 text-slate-500 hover:text-indigo-400 font-medium transition-colors"
                    >
                        <Users size={18} />
                        Connect Calendar
                    </button>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-900 pb-20 relative">
            <AnimatePresence>
                {isInitializing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6"
                    >
                        <div className="relative mb-8">
                            <div className="w-20 h-20 rounded-full border-b-2 border-indigo-500 animate-spin" />
                            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" size={32} />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">Initializing Secure Room</h2>
                        <p className="text-slate-500 font-mono text-sm">GENERATING ENCRYPTION KEYS & LINKING WEBSOCKETS...</p>
                    </motion.div>
                )}
            </AnimatePresence>
            <Navbar />

            <main className="flex-1 mt-20 px-6 max-w-7xl mx-auto w-full">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Workspace Intelligence</h1>
                        <p className="text-slate-400">Here's a breakdown of your meeting network connectivity.</p>
                    </div>
                    <button
                        onClick={handleStartMeeting}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                    >
                        <Plus size={18} />
                        New Meeting
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Stats Cards */}
                    {[
                        { label: 'Total Meetings', val: meetings.length, icon: <Video size={20} />, color: 'indigo' },
                        { label: 'Time Spent', val: '14h 20m', icon: <Clock size={20} />, color: 'purple' },
                        { label: 'Completion Rate', val: '85%', icon: <Activity size={20} />, color: 'emerald' },
                        { label: 'Team Mood', val: 'Excellent', icon: <Smile size={20} />, color: 'amber' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel p-5 flex items-center gap-4 border border-slate-800/50 hover:bg-slate-800/50 transition-colors cursor-default"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center border border-${stat.color}-500/20`}>
                                <div className={`text-${stat.color}-400`}>{stat.icon}</div>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                                <h3 className="text-xl font-bold text-white">{stat.val}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Charts */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-panel p-6 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-6 opacity-5">
                                <LayoutDashboard size={120} />
                            </div>
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <TrendingUp size={18} className="text-indigo-400" />
                                Meeting Productivity Score
                            </h2>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={activityData}>
                                        <Tooltip
                                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                                        />
                                        <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                        <Bar dataKey="hours" fill="#6366f1" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="glass-panel p-6">
                                <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 mb-4">
                                    <Sparkles size={14} className="text-amber-400" />
                                    AI Insights Summary
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
                                        <p className="text-xs text-indigo-300 font-medium">Efficiency Alert</p>
                                        <p className="text-sm text-slate-300 mt-1 leading-relaxed">3 meetings this week went 15min over schedule. Consider reducing agenda items.</p>
                                    </div>
                                    <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                                        <p className="text-xs text-emerald-300 font-medium">Top Decision Makers</p>
                                        <p className="text-sm text-slate-300 mt-1 leading-relaxed">Alice and Bob were most active in driving project closure today.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-panel p-6">
                                <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 mb-4">
                                    <Users size={14} className="text-purple-400" />
                                    Team Mood Index
                                </h3>
                                <div className="h-40 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={emotionData}>
                                            <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                                        <TrendingUp size={12} /> +12% from last week
                                    </div>
                                    <span className="text-xs text-slate-500">Peak mood: 10:45 AM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">

                        {/* AI Suggested Follow-Ups */}
                        <div className="glass-panel p-6 border-l-4 border-amber-500/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <Sparkles size={16} className="text-amber-500/20" />
                            </div>
                            <h2 className="text-lg font-bold text-white mb-6">AI Suggested Follow-Ups</h2>
                            <div className="space-y-4">
                                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 transition-colors group cursor-pointer">
                                    <p className="text-xs font-bold text-amber-500 mb-1 uppercase tracking-tight">Recommendation</p>
                                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">Review API Bottlenecks</h4>
                                    <p className="text-xs text-slate-500 mt-2 leading-relaxed italic">"Based on unresolved discussions from today's sync."</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-[10px] text-slate-600 font-mono">2 participants • 30min</span>
                                        <button className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                                            Schedule <Plus size={10} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* My Action Items */}
                        <div className="glass-panel p-6">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <CheckCircle2 className="text-emerald-400" size={18} />
                                My Action Items
                            </h2>
                            <div className="space-y-3">
                                {actionItems.length > 0 ? actionItems.map(item => (
                                    <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
                                        <button onClick={() => toggleActionItem(item.id)} className="mt-0.5 transition-colors">
                                            {item.completed ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Circle size={18} className="text-slate-600" />}
                                        </button>
                                        <div>
                                            <p className={`text-sm ${item.completed ? 'text-slate-500 line-through' : 'text-slate-200'} font-medium`}>
                                                {item.task}
                                            </p>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-xs text-slate-500 border-2 border-dashed border-slate-800 rounded-xl p-6 text-center">
                                        No active tasks detected.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Upcoming Meetings */}
                        <div className="glass-panel p-6">
                            <h2 className="text-lg font-bold text-white mb-6">Upcoming Syncs</h2>
                            <div className="space-y-4">
                                {upcomingMeetings.map(meeting => (
                                    <div key={meeting.id} className="relative pl-4 border-l-2 border-slate-700 hover:border-indigo-500 transition-colors py-1">
                                        <h3 className="text-sm font-bold text-white">{meeting.title}</h3>
                                        <p className="text-[11px] text-slate-500 mt-1 uppercase font-bold tracking-tighter">{formatDate(meeting.date)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
