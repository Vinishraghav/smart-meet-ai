"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Video, Calendar, LayoutDashboard, Settings, User } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Meetings', path: '/meetings', icon: <Video size={20} /> },
        { name: 'Calendar', path: '/calendar', icon: <Calendar size={20} /> },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 glass-panel border-x-0 border-t-0 rounded-none z-50 px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Video className="text-white" size={18} />
                </div>
                <span className="font-bold text-xl tracking-tight text-white">
                    Smart<span className="text-gradient">Meet</span> AI
                </span>
            </Link>

            {pathname !== '/' && pathname !== '/login' && pathname !== '/register' && (
                <div className="hidden md:flex items-center gap-1 bg-slate-800/50 p-1 rounded-full border border-slate-700/50">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${pathname.startsWith(item.path)
                                    ? 'bg-indigo-500/20 text-indigo-300 shadow-sm'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-4">
                {pathname === '/' ? (
                    <>
                        <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <Link href="/register" className="text-sm font-medium px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-500/20">
                            Get Started
                        </Link>
                    </>
                ) : (
                    <>
                        <button className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800/50">
                            <Settings size={20} />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center cursor-pointer overflow-hidden">
                            <User className="text-indigo-300" size={16} />
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}
