"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mic, MicOff, Video, VideoOff,
    Monitor, Radio, Sparkles, PhoneOff,
    Users as UsersIcon, MessageSquare,
    FileText, Copy, Share2, MoreVertical,
    CheckCircle2, AlertCircle, Info
} from 'lucide-react';
import { useStore, Participant } from '@/store';

export default function MeetingRoom() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const { meetings, endMeeting, currentUser } = useStore();

    const [isMicOn, setIsMicOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [activeTab, setActiveTab] = useState<'participants' | 'chat' | 'AI Notes'>('participants');
    const [isEnding, setIsEnding] = useState(false);
    const [meetingTimer, setMeetingTimer] = useState(0);

    const meeting = meetings.find(m => m.meetingId === id);
    const participants = meeting?.participants || [];

    // Meeting Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setMeetingTimer(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleEndMeeting = () => {
        setIsEnding(true);
        setTimeout(() => {
            if (meeting) {
                endMeeting(meeting.id, meetingTimer, 88, 75);
            }
            router.push(`/meeting/${meeting?.id}/summary`);
        }, 2500);
    };

    const [origin, setOrigin] = useState('');

    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    const copyInviteLink = () => {
        const link = `${origin}/meet/${id}`;
        navigator.clipboard.writeText(link);
        alert("Invite link copied to clipboard!");
    };

    if (!meeting && id) {
        return (
            <div className="h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 shadow-2xl">
                    <AlertCircle size={40} className="text-red-500" />
                </div>
                <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-widest">Access Restored</h1>
                <p className="text-slate-500 max-w-sm mb-8">Reconnecting to AI session {id}...</p>
                <div className="w-48 h-1 bg-slate-900 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="w-1/2 h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    />
                </div>
            </div>
        );
    }

    // CAMERA & MIC HARDWARE LOGIC
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        const getMedia = async () => {
            try {
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    console.warn("Media devices not available (Insecure context)");
                    return;
                }
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 1280, height: 720, facingMode: 'user' },
                    audio: true
                });
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Hardware access denied:", err);
            }
        };

        getMedia();

        return () => {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Sync state with hardware tracks
    useEffect(() => {
        if (localStream) {
            localStream.getVideoTracks().forEach(track => {
                track.enabled = isCameraOn;
            });
            localStream.getAudioTracks().forEach(track => {
                track.enabled = isMicOn;
            });
        }
    }, [isMicOn, isCameraOn, localStream]);

    return (
        <div className="h-screen bg-slate-950 flex flex-col font-sans overflow-hidden text-slate-200">
            {/* Transition Overlay */}
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
                        <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-widest">Synthesizing Meeting Core</h2>
                        <div className="space-y-4 max-w-sm w-full text-left mx-auto">
                            {["Finalizing Encryption...", "Analyzing Decision Chains...", "Compressing Bio-metrics...", "Generating Intelligence..."].map((step, idx) => (
                                <div key={idx} className="flex items-center gap-4 opacity-50">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{step}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Bar */}
            <header className="h-20 flex items-center justify-between px-8 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-3xl z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Video className="text-white" size={20} />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-sm font-black text-white uppercase tracking-tighter leading-none">{meeting?.title}</h1>
                            <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Live • {formatTime(meetingTimer)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* PROMINENT MEETING LINK DISPLAY */}
                <div className="hidden lg:flex items-center gap-3 px-6 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl shadow-inner group">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-0.5">Invite Participants</span>
                        <span className="text-xs font-mono text-indigo-400 font-bold tracking-tight">{origin}/meet/{id}</span>
                    </div>
                    <div className="w-px h-8 bg-slate-800 mx-2" />
                    <button
                        onClick={copyInviteLink}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/10"
                    >
                        <Copy size={12} /> Copy Link
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/20 px-4 py-2 rounded-2xl">
                        <Sparkles size={14} className="text-emerald-400" />
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">AI Sync Processing</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* Main Video Area */}
                <div className="flex-1 relative bg-slate-900/40 p-6 flex items-center justify-center">
                    <div className={`grid gap-4 w-full h-full max-w-6xl transition-all duration-500 ${participants.length === 1 ? 'grid-cols-1' :
                        participants.length <= 2 ? 'grid-cols-1 md:grid-cols-2' :
                            participants.length <= 4 ? 'grid-cols-2' : 'grid-cols-3'
                        }`}>
                        {participants.map((p, idx) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative rounded-[2rem] bg-slate-900 border border-slate-800 overflow-hidden group ring-1 ring-white/5 shadow-2xl"
                            >
                                {/* Simulated or Real Video Feed */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
                                    {p.name === 'You' || p.name === currentUser?.name ? (
                                        <>
                                            <video
                                                ref={localVideoRef}
                                                autoPlay
                                                playsInline
                                                muted
                                                className={`w-full h-full object-cover scale-x-[-1] transition-opacity duration-500 ${isCameraOn ? 'opacity-100' : 'opacity-0'}`}
                                            />
                                            {!isCameraOn && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                                                    <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner">
                                                        <span className="text-4xl font-black text-slate-600 uppercase italic">Y</span>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        !p.cameraOn ? (
                                            <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner">
                                                <span className="text-4xl font-black text-slate-600 uppercase italic">{p.name[0]}</span>
                                            </div>
                                        ) : (
                                            <div className="text-slate-700 font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">
                                                [Secure High-Res Feed]
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* Overlay Label */}
                                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                    <div className="glass-panel px-4 py-2 bg-slate-950/60 flex items-center gap-2 border-white/5">
                                        <div className={`w-2 h-2 rounded-full ${p.name === 'You' ? (isMicOn ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500') : (p.micOn ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500')}`} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white">{p.name} {p.isHost ? '(Host)' : ''}</span>
                                    </div>
                                </div>

                                {/* AI Sentiment Badge (Simulated) */}
                                <div className="absolute top-6 right-6">
                                    <div className="bg-indigo-500/20 backdrop-blur-md border border-indigo-500/20 px-3 py-1 rounded-full flex items-center gap-2">
                                        <Sparkles size={12} className="text-indigo-400" />
                                        <span className="text-[8px] font-black text-indigo-300 uppercase tracking-widest leading-none mt-0.5">Highly Engaged</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Panel */}
                <aside className="w-[380px] border-l border-slate-800/50 flex flex-col bg-slate-950/40 backdrop-blur-xl">
                    <div className="flex border-b border-slate-800/50">
                        {(['participants', 'chat', 'AI Notes'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div layoutId="room-tab" className="absolute bottom-0 left-4 right-4 h-0.5 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {activeTab === 'participants' && (
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Network</span>
                                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-[9px] font-black">{participants.length} Active</span>
                                </div>
                                <div className="space-y-2">
                                    {participants.map(p => (
                                        <div key={p.id} className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800/50 rounded-2xl group hover:bg-slate-900/60 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-[10px] text-white">
                                                    {p.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-black text-white uppercase tracking-tight leading-none mb-1">{p.name}</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-none">
                                                            {p.isHost ? 'Session Host' : 'Collaborator'}
                                                        </span>
                                                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                                                        <span className="text-[8px] text-emerald-500 font-bold uppercase tracking-widest leading-none mt-0.5">Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 pr-1">
                                                {p.micOn ? <Mic size={14} className="text-indigo-400" /> : <MicOff size={14} className="text-red-500" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8 mt-4 border-t border-slate-800/50">
                                    <div className="glass-panel p-6 bg-indigo-500/5 border-indigo-500/10">
                                        <div className="flex items-center gap-2 text-indigo-400 mb-3">
                                            <Info size={14} />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Network Alert</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Session is strictly encrypted. Recording is currently {meeting?.recordingEnabled ? 'ENABLED' : 'DISABLED'}.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Chat and Notes placeholders for UI consistency */}
                        {activeTab === 'chat' && <div className="p-8 text-center text-slate-600 text-xs font-black uppercase tracking-widest py-32 opacity-20">Live Chat Interface<br />Coming Soon</div>}
                        {activeTab === 'AI Notes' && <div className="p-8 text-center text-slate-600 text-xs font-black uppercase tracking-widest py-32 opacity-20">AI Insight Lab<br />Coming Soon</div>}
                    </div>
                </aside>
            </main>

            {/* Bottom Controls */}
            <footer className="h-24 bg-slate-950 border-t border-slate-800/50 flex items-center justify-between px-8 relative z-50">
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 leading-none italic opacity-50">Audio Source</span>
                        <div className="flex items-center gap-2 text-white">
                            <span className="text-[10px] font-black uppercase tracking-tight">System Default Mic</span>
                            <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMicOn(!isMicOn)}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl ${isMicOn ? 'bg-slate-900 border border-slate-800 text-white hover:bg-slate-800' : 'bg-red-500 text-white border-red-400'}`}
                    >
                        {isMicOn ? <Mic size={22} /> : <MicOff size={22} />}
                    </button>
                    <button
                        onClick={() => setIsCameraOn(!isCameraOn)}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl ${isCameraOn ? 'bg-slate-900 border border-slate-800 text-white hover:bg-slate-800' : 'bg-red-500 text-white border-red-400'}`}
                    >
                        {isCameraOn ? <Video size={22} /> : <VideoOff size={22} />}
                    </button>

                    <div className="w-px h-10 bg-slate-800/50 mx-2" />

                    <button
                        onClick={() => setIsSharing(!isSharing)}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl ${isSharing ? 'bg-emerald-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'}`}
                        title="Share Screen"
                    >
                        <Monitor size={22} />
                    </button>
                    <button
                        onClick={() => setIsRecording(!isRecording)}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'}`}
                        title="Start Recording"
                    >
                        <Radio size={22} />
                    </button>
                    <button className="w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-all shadow-xl group" title="AI Assistant">
                        <Sparkles size={22} className="group-hover:animate-spin" />
                    </button>

                    <div className="w-px h-10 bg-slate-800/50 mx-2" />

                    <button
                        onClick={handleEndMeeting}
                        className="h-14 px-8 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-red-600/20 group"
                    >
                        <PhoneOff size={18} className="group-hover:rotate-[225deg] transition-transform duration-500" />
                        <span className="hidden sm:inline">Terminate</span>
                    </button>
                </div>

                <div className="hidden md:flex items-center gap-2">
                    <button className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-all">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </footer>
        </div>
    );
}
