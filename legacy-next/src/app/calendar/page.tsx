"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useStore } from '@/store';
import {
    Video, Calendar as CalendarIcon, Clock, ChevronLeft,
    ChevronRight, Sparkles, PlusCircle, ArrowRight, User,
    Plus, CheckCircle2, LayoutGrid, List, Zap, Settings,
    Activity, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockCalendarEvents = [
    { id: 1, title: 'Weekly Sprint Sync', date: '2026-03-05', time: '10:00 AM', type: 'meeting', urgent: true },
    { id: 2, title: 'Design Review', date: '2026-03-06', time: '02:00 PM', type: 'meeting', urgent: false },
    { id: 3, title: 'Follow-up on Pipeline', date: '2026-03-08', time: '11:30 AM', type: 'followup', urgent: true },
];

const mockAiSuggestions = [
    {
        id: 101,
        title: 'Finalize Webhook Integration',
        reason: 'Follow-up for pending task from Q3 Planning Sync',
        suggestedTime: '2026-03-07 at 10:00 AM',
        participants: ['Alice', 'Bob'],
        priority: 'High'
    },
    {
        id: 102,
        title: 'Frontend Component Refinement',
        reason: 'Based on unaddressed action items from Design Sync',
        suggestedTime: '2026-03-09 at 01:30 PM',
        participants: ['David'],
        priority: 'Medium'
    }
];

export default function CalendarPage() {
    const [currentMonth, setCurrentMonth] = useState('March 2026');
    const [view, setView] = useState<'month' | 'week' | 'day'>('month');
    const { actionItems } = useStore();

    const daysInMonth = 31;
    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 font-sans text-slate-200">
            <Navbar />

            <main className="flex-1 mt-20 px-6 max-w-7xl mx-auto w-full pb-20">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-widest mb-2">
                            <CalendarIcon size={14} /> Smart Calendar Hub
                        </div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">Schedule Your Momentum</h1>
                        <p className="text-slate-500 mt-2 font-medium italic">"Your meetings are optimized for high productivity." — AI Assistant</p>
                    </div>
                    <button className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-indigo-500/20 active:scale-95">
                        <Plus size={20} /> Create Virtual Event
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Main Calendar View */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="glass-panel p-8 border-slate-800 shadow-2xl bg-slate-900/60 backdrop-blur-3xl relative overflow-hidden">
                            {/* Background Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -z-10" />

                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-6">
                                    <h2 className="text-2xl font-black text-white">{currentMonth}</h2>
                                    <div className="flex items-center gap-2 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/50 shadow-inner">
                                        <button className="p-1.5 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-all">
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button className="p-1.5 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-all">
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-800/40 p-1.5 rounded-2xl border border-slate-700/50">
                                    {['month', 'week', 'day'].map(v => (
                                        <button
                                            key={v}
                                            onClick={() => setView(v as any)}
                                            className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${view === v ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
                                        >
                                            {v}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-px rounded-3xl overflow-hidden ring-1 ring-slate-800/80 shadow-2xl bg-slate-800/30">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                                    <div key={day} className={`py-4 text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ${i === 0 || i === 6 ? 'bg-slate-950/40' : 'bg-slate-900/80'}`}>
                                        {day}
                                    </div>
                                ))}
                                {calendarDays.map((day) => {
                                    const eventAt = mockCalendarEvents.find(e => e.date === `2026-03-${day < 10 ? '0' + day : day}`);
                                    return (
                                        <motion.div
                                            whileHover={{ scale: 1.02, zIndex: 10 }}
                                            key={day}
                                            className={`bg-slate-900/10 min-h-[140px] p-3 transition-all border-t border-r border-slate-800/50 relative group cursor-pointer ${day === 5 ? 'bg-indigo-500/10 ring-2 ring-indigo-500/20 z-10' : ''}`}
                                        >
                                            <span className={`text-xs font-black ${day === 5 ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-400'} mb-3 block`}>
                                                {day < 10 ? '0' + day : day}
                                            </span>
                                            {eventAt && (
                                                <div className="space-y-2">
                                                    <div className={`text-[9px] p-2.5 rounded-xl border font-bold uppercase tracking-tight shadow-sm leading-tight group-hover:shadow-indigo-500/10 transition-all ${eventAt.type === 'meeting' ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300 ring-1 ring-indigo-500/10' : 'bg-amber-500/20 border-amber-500/30 text-amber-300 ring-1 ring-amber-500/10'}`}>
                                                        <div className="flex items-center gap-1.5 mb-1.5">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${eventAt.urgent ? 'bg-red-400 animate-pulse' : 'bg-indigo-400'}`} />
                                                            <span className="text-[8px] opacity-60">{eventAt.time}</span>
                                                        </div>
                                                        <p className="truncate">{eventAt.title}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Plus icon on hover for new meeting */}
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="p-1 rounded-lg bg-slate-800 text-indigo-400 shadow-xl border border-slate-700">
                                                    <PlusCircle size={14} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="glass-panel p-8 border-l-8 border-indigo-600 bg-gradient-to-r from-indigo-500/5 to-transparent relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                    <Sparkles size={100} />
                                </div>
                                <h3 className="text-white font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Zap size={16} className="text-yellow-400" /> AI Productivity Insight
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed font-medium">
                                    "Your schedule for March 10th-12th includes 8 back-to-back syncs. AI recommends rescheduling the Design Review to the 13th to maintain peak Cognitive Performance."
                                </p>
                                <button className="mt-6 text-xs font-black text-indigo-400 hover:text-white transition-all uppercase tracking-widest flex items-center gap-2 group">
                                    Optimize My Week <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            <div className="glass-panel p-8 border-l-8 border-emerald-600 bg-gradient-to-r from-emerald-500/5 to-transparent">
                                <h3 className="text-white font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-emerald-400" /> Deadline Intelligence
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-200">API Webhook Stabilization</span>
                                        <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-widest">In 2 Days</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-emerald-500 h-full w-4/5 shadow-lg shadow-emerald-500/40" />
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-medium italic">8 out of 10 prerequisite tasks are complete.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Suggestions Sidebar */}
                    <div className="space-y-8">
                        <div className="glass-panel p-6 border-slate-800 shadow-2xl bg-indigo-500/5 overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Zap size={80} className="text-indigo-400" />
                            </div>
                            <h2 className="text-lg font-black text-white mb-8 border-b border-slate-800 pb-4">AI Proactive Scheduler</h2>
                            <div className="space-y-5 relative z-10">
                                {mockAiSuggestions.map((suggestion, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        key={suggestion.id}
                                        className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all group/card shadow-lg"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded ${suggestion.priority === 'High' ? 'bg-red-500 text-white' : 'bg-amber-500 text-slate-950'}`}>
                                                {suggestion.priority} Priority
                                            </span>
                                            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/40 animate-pulse" />
                                        </div>
                                        <h3 className="text-sm font-black text-white mb-2 leading-tight group-hover/card:text-indigo-400 transition-colors uppercase tracking-tight">{suggestion.title}</h3>
                                        <p className="text-[11px] text-slate-500 mb-5 leading-relaxed italic font-medium">"{suggestion.reason}"</p>

                                        <div className="bg-slate-950/80 rounded-2xl p-4 mb-5 border border-slate-800 space-y-2 group-hover/card:bg-indigo-500/5 transition-all">
                                            <div className="flex items-center gap-2.5 text-[10px] text-slate-300 font-bold">
                                                <CalendarIcon size={14} className="text-indigo-500" />
                                                {suggestion.suggestedTime}
                                            </div>
                                            <div className="flex items-center gap-2.5 text-[10px] text-slate-400 font-bold">
                                                <User size={14} className="text-indigo-500" />
                                                <span className="truncate">{suggestion.participants.join(', ')}</span>
                                            </div>
                                        </div>

                                        <button className="w-full flex items-center justify-between py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-indigo-600 rounded-2xl px-5 hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 active:scale-95">
                                            <span>Lock to Calendar</span>
                                            <ArrowRight size={14} />
                                        </button>
                                        <div className="mt-4 flex items-center justify-center gap-2 opacity-30">
                                            <div className="w-1 h-1 rounded-full bg-slate-600" />
                                            <div className="w-1 h-1 rounded-full bg-slate-600" />
                                            <div className="w-1 h-1 rounded-full bg-slate-600" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Connection Status Section */}
                        <div className="glass-panel p-6 bg-emerald-500/5 border-slate-800/80">
                            <h3 className="text-xs font-black text-white mb-5 uppercase tracking-[0.2em]">Synchronization</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-white/10 transition-colors">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-2.5 shadow-inner">
                                        <img src="https://www.gstatic.com/images/branding/product/2x/calendar_48dp.png" alt="Google" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black text-white uppercase tracking-tight">Enterprise Sync</p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/40" />
                                            <span className="text-[8px] font-black text-emerald-400 uppercase">Live Connectivity</span>
                                        </div>
                                    </div>
                                    <Settings size={14} className="text-slate-600 hover:text-white cursor-pointer" />
                                </div>

                                <button className="w-full border-2 border-dashed border-slate-800 hover:border-slate-700 py-4 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest transition-all">
                                    + Link Microsoft 365
                                </button>
                            </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-indigo-600/10 border border-indigo-500/20">
                            <div className="flex items-center gap-3 text-white font-bold text-sm mb-2">
                                <AlertCircle size={18} className="text-indigo-400" /> Need Help?
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                SmartMeet AI learns from your scheduling patterns to minimize fatigue. Tap any empty slot to let AI suggest a meeting type.
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
