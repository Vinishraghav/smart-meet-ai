"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useStore } from '@/store';
import {
    Video, Calendar, Clock, Download,
    Trash2, Search, Filter, ArrowRight,
    MessageSquare, Users, Sparkles, Play,
    Share2, FileText, CalendarPlus
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MeetingsPage() {
    const { meetings } = useStore();
    const completedMeetings = meetings.filter(m => m.status === 'completed');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMeetings = completedMeetings.filter(m =>
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.summary?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateStr: string) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        }).format(new Date(dateStr));
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const hrs = Math.floor(mins / 60);
        if (hrs > 0) return `${hrs}h ${mins % 60}m`;
        return `${mins}m`;
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 font-sans">
            <Navbar />

            <main className="flex-1 mt-20 px-6 max-w-7xl mx-auto w-full pb-20">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-widest mb-2">
                            <Video size={14} /> Recorded Meeting Center
                        </div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">Meeting Intelligence Library</h1>
                        <p className="text-slate-500 mt-2 font-medium">Access full transcripts, AI-generated summaries, and key decisions from your history.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20">
                        <CalendarPlus size={20} /> Schedule Event
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="glass-panel p-6 border-slate-800">
                            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                                <Search size={16} className="text-indigo-400" /> Search Transcripts
                            </h3>
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Keywords, titles, or people..."
                                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-4 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-600 font-medium"
                                />
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                            </div>

                            <h3 className="text-xs font-black text-slate-500 mb-4 uppercase tracking-[0.2em]">Filter by Category</h3>
                            <div className="space-y-2">
                                {['All Recordings', 'Interviews', 'Sprint Planning', 'Client Syncs'].map((cat, i) => (
                                    <button key={i} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${i === 0 ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900 border border-transparent'}`}>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="glass-panel p-6 bg-gradient-to-br from-indigo-500/5 to-transparent border-slate-800">
                            <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-widest mb-3">
                                <Sparkles size={14} /> AI Storage Insight
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                Your team has saved 40 hours of manual note-taking this month using SmartMeet transcription.
                            </p>
                        </div>
                    </div>

                    {/* Meeting List */}
                    <div className="lg:col-span-3 space-y-4">
                        {filteredMeetings.length > 0 ? (
                            filteredMeetings.map((meeting, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    key={meeting.id}
                                    className="glass-panel-interactive p-6 border-slate-800/80 hover:border-indigo-500/30 group bg-slate-900/40 relative overflow-hidden"
                                >
                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-3xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center group-hover:bg-indigo-500 transition-all shadow-inner group-hover:shadow-indigo-500/50 relative">
                                                <Play className="text-slate-500 group-hover:text-white transition-colors" size={24} fill="currentColor" />
                                                {meeting.type === 'interview' && (
                                                    <div className="absolute -top-1 -right-1 p-1 rounded-lg bg-amber-500 text-slate-950">
                                                        <Sparkles size={10} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                                                        {meeting.title}
                                                    </h3>
                                                    {meeting.type === 'interview' && (
                                                        <span className="text-[10px] font-black bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded uppercase tracking-widest ring-1 ring-amber-500/20">Interview</span>
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap items-center gap-5">
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                                        <Calendar size={13} />
                                                        {formatDate(meeting.date)}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                                        <Clock size={13} />
                                                        {formatDuration(meeting.duration)}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-tighter">
                                                        <Users size={13} />
                                                        {meeting.participants.length} Active
                                                    </div>
                                                </div>
                                                {/* AI Summary Preview */}
                                                <p className="text-xs text-slate-500 mt-3 font-medium line-clamp-1 max-w-xl italic">
                                                    "{meeting.summary || 'AI detected 3 primary decisions and 5 action items regarding the March release cycle...'}"
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 self-end md:self-center">
                                            <div className="h-8 w-px bg-slate-800 mx-2 hidden md:block" />

                                            <Link
                                                href={`/meeting/${meeting.id}/summary`}
                                                className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                                title="View AI Summary"
                                            >
                                                <FileText size={18} />
                                            </Link>
                                            <button
                                                className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-all shadow-sm"
                                                title="Search Transcript"
                                            >
                                                <MessageSquare size={18} />
                                            </button>
                                            <button
                                                className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                                title="Download"
                                            >
                                                <Download size={18} />
                                            </button>

                                            <Link
                                                href={`/meeting/${meeting.id}/summary`}
                                                className="ml-4 flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white text-slate-950 font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-indigo-500 hover:text-white shadow-xl shadow-black/20"
                                            >
                                                Launch Lab
                                                <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="glass-panel p-20 text-center border-dashed border-2 border-slate-800 bg-transparent">
                                <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-6">
                                    <Video size={40} className="text-slate-700" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Library is Empty</h3>
                                <p className="text-slate-500 max-w-sm mx-auto font-medium">
                                    {searchTerm ? `No results found for "${searchTerm}". Try different keywords.` : "Synchronize your first meeting to start building your knowledge base."}
                                </p>
                                {!searchTerm && (
                                    <Link
                                        href="/dashboard"
                                        className="mt-8 inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold transition-all hover:bg-indigo-500 shadow-xl shadow-indigo-500/20"
                                    >
                                        Go to Control Center
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
