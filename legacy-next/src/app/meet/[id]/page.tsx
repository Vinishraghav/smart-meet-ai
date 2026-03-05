"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Video, Mic, MicOff, VideoOff,
    Sparkles, ArrowRight, User, Mail,
    Shield, CheckCircle2, AlertCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useStore, Participant } from '@/store';

export default function JoinMeeting() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const { meetings, joinMeeting, setCurrentUser, addMeeting } = useStore();
    const [isCheckingLink, setIsCheckingLink] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [isJoining, setIsJoining] = useState(false);
    const [error, setError] = useState('');

    const meeting = meetings.find(m => m.meetingId === id);

    useEffect(() => {
        if (!meeting && id) {
            // Simulate a 'fetch from server' delay to check if meetingId is valid
            // In this prototype, we'll auto-create it to make the link "work" for anyone
            setTimeout(() => {
                const mockMeeting = {
                    id: `m-${Date.now()}`,
                    meetingId: id,
                    title: 'SmartMeet Intelligence Session',
                    hostId: 'host-remote',
                    date: new Date().toISOString(),
                    duration: 0,
                    status: 'ongoing' as const,
                    participants: [
                        {
                            id: 'host-remote',
                            meetingId: id,
                            name: 'Session Host',
                            email: 'host@smartmeet.ai',
                            joinedAt: new Date().toISOString(),
                            micOn: true,
                            cameraOn: true,
                            isHost: true
                        }
                    ],
                    recordingEnabled: true,
                };
                addMeeting(mockMeeting);
                setIsCheckingLink(false);
            }, 1000);
        } else {
            setIsCheckingLink(false);
        }
    }, [id, meeting, addMeeting]);

    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        let currentStream: MediaStream | null = null;

        const getMedia = async () => {
            if (cameraOn || micOn) {
                try {
                    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                        setError("Media devices are not supported or blocked (Insecure Context).");
                        return;
                    }
                    const constraints = {
                        video: cameraOn ? { width: 1280, height: 720, facingMode: 'user' } : false,
                        audio: micOn
                    };
                    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
                    setStream(mediaStream);
                    currentStream = mediaStream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStream;
                    }
                } catch (err) {
                    console.error("Error accessing media devices:", err);
                    setError("Could not access camera/microphone. Please check permissions.");
                }
            } else {
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
                setStream(null);
            }
        };

        getMedia();

        return () => {
            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [cameraOn, micOn]);

    const handleJoin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            setError('Please provide your name and email to continue.');
            return;
        }

        setIsJoining(true);
        setError('');

        // Stop preview stream before moving to room
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        // Simulate a small delay for "Connecting to AI Core" feel
        setTimeout(() => {
            const participant: Participant = {
                id: `p-${Date.now()}`,
                meetingId: id,
                name,
                email,
                joinedAt: new Date().toISOString(),
                micOn,
                cameraOn,
                isHost: false
            };

            setCurrentUser({ name, email });
            joinMeeting(id, participant);
            router.push(`/meet/${id}/room`);
        }, 1500);
    };

    if (isCheckingLink) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
                <Navbar />
                <div className="relative mb-8">
                    <div className="w-20 h-20 rounded-full border-b-2 border-indigo-500 animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" size={32} />
                </div>
                <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">Syncing Intelligence</h2>
                <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">HANDSHAKING WITH AI CORE...</p>
            </div>
        );
    }

    if (!meeting && id) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
                <Navbar />
                <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 shadow-2xl">
                    <AlertCircle size={40} className="text-red-500" />
                </div>
                <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-widest">Meeting Not Found</h1>
                <p className="text-slate-500 max-w-sm mb-8">This meeting link is invalid or the session has ended.</p>
                <button onClick={() => router.push('/dashboard')} className="px-8 py-3 bg-indigo-600 rounded-2xl text-white font-bold shadow-xl">Return to Dashboard</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans overflow-hidden">
            <Navbar />

            <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 gap-12 max-w-7xl mx-auto w-full">

                {/* Left Side: Preview area */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <div className="relative aspect-video rounded-[2.5rem] bg-slate-900 overflow-hidden border border-slate-800 shadow-2xl group ring-1 ring-white/5">
                        {!cameraOn ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 bg-slate-900/50 backdrop-blur-sm">
                                <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 mb-4 shadow-inner">
                                    <User size={48} className="text-slate-600" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-[0.2em]">Camera is Off</span>
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full h-full object-cover scale-x-[-1]"
                                />
                                {!stream && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-md">
                                        <div className="w-12 h-12 rounded-full border-b-2 border-indigo-500 animate-spin mb-4" />
                                        <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-[0.3em]">Initializing Camera...</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Labels */}
                        <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2">
                            <div className="px-4 py-2 bg-slate-950/60 backdrop-blur-md rounded-2xl border border-white/5 flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${micOn ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">{name || 'Guest'}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="absolute bottom-6 right-6 z-10 flex gap-2">
                            <button
                                onClick={() => setMicOn(!micOn)}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-xl ${micOn ? 'bg-slate-900/80 text-white hover:bg-slate-800' : 'bg-red-500 text-white shadow-red-500/20'}`}
                            >
                                {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                            </button>
                            <button
                                onClick={() => setCameraOn(!cameraOn)}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-xl ${cameraOn ? 'bg-slate-900/80 text-white hover:bg-slate-800' : 'bg-red-500 text-white shadow-red-500/20'}`}
                            >
                                {cameraOn ? <Video size={20} /> : <VideoOff size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-indigo-500/5 border border-indigo-500/10 p-5 rounded-3xl">
                        <Shield className="text-indigo-400 shrink-0" size={24} />
                        <div className="text-xs">
                            <p className="text-indigo-300 font-black uppercase tracking-widest mb-1 leading-none">Intelligence Check-in</p>
                            <p className="text-slate-500 font-medium leading-relaxed">Your audio and video are encrypted and only shared once you enter the secure room.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form area */}
                <div className="w-full lg:w-[450px]">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-panel p-10 bg-slate-900/40 border-slate-800 shadow-2xl relative overflow-hidden"
                    >
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                    <Sparkles size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">Join Meeting</h2>
                                    <p className="text-xs text-slate-500 font-black uppercase tracking-widest mt-1">Ready for {meeting?.title || 'SmartMeet'}?</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleJoin} className="space-y-6">
                            <div className="space-y-4">
                                <div className="relative group">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1">Your Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Vinish Raghav"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="relative group">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1">Work Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@company.ai"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 py-4">
                                <label className="flex items-center gap-3 group cursor-pointer">
                                    <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${cameraOn ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-950 border-slate-800'}`}>
                                        {cameraOn && <CheckCircle2 size={12} className="text-white" />}
                                    </div>
                                    <input type="checkbox" checked={cameraOn} onChange={() => setCameraOn(!cameraOn)} className="hidden" />
                                    <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">Start with camera enabled</span>
                                </label>
                                <label className="flex items-center gap-3 group cursor-pointer">
                                    <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${micOn ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-950 border-slate-800'}`}>
                                        {micOn && <CheckCircle2 size={12} className="text-white" />}
                                    </div>
                                    <input type="checkbox" checked={micOn} onChange={() => setMicOn(!micOn)} className="hidden" />
                                    <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">Start with microphone enabled</span>
                                </label>
                            </div>

                            {error && (
                                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-3">
                                    <AlertCircle size={16} /> {error}
                                </div>
                            )}

                            <button
                                disabled={isJoining}
                                className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-2xl relative overflow-hidden group ${isJoining ? 'bg-indigo-700/50 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/30'}`}
                            >
                                {isJoining ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Syncing Logic...
                                    </>
                                ) : (
                                    <>
                                        Join Meeting <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </main>

            {/* Footer Attribution */}
            <div className="p-8 mt-auto text-center opacity-30">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Global Encryption ID: {id}</span>
            </div>
        </div>
    );
}
