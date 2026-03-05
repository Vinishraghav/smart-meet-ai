import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Bot, LineChart, Shield, Zap, Calendar, HeartPulse, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      title: 'Real-time AI Transcription',
      description: 'Accurately convert speech to text instantly compatible with Whisper pipelines.',
      icon: <Zap className="text-amber-400" size={24} />,
    },
    {
      title: 'Emotion Recognition',
      description: 'Analyze participant facial expressions and vocal tone during meetings.',
      icon: <HeartPulse className="text-red-400" size={24} />,
    },
    {
      title: 'Automated Summaries',
      description: 'Generate concise key points, decisions, and action items effortlessly.',
      icon: <Bot className="text-indigo-400" size={24} />,
    },
    {
      title: 'Smart Scheduling',
      description: 'AI suggests optimal follow-up meetings based on pending task timelines.',
      icon: <Calendar className="text-emerald-400" size={24} />,
    },
    {
      title: 'Action Item Extraction',
      description: 'Automatically track, assign, and manage tasks derived from conversations.',
      icon: <Shield className="text-blue-400" size={24} />,
    },
    {
      title: 'Advanced Analytics',
      description: 'View deep insights regarding participation, engagement, and meeting efficiency.',
      icon: <LineChart className="text-purple-400" size={24} />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 mt-16 flex flex-col items-center justify-center p-6 lg:p-24 overflow-hidden relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <section className="text-center max-w-4xl mx-auto flex flex-col items-center space-y-8 mt-12 mb-32 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/50 backdrop-blur-md shadow-sm mb-6">
            <Sparkles className="text-amber-400" size={16} />
            <span className="text-sm font-medium text-slate-300">The Future of Meeting Intelligence</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-sm leading-tight">
            Meetings that <span className="text-gradient">think</span> for you.
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed">
            Record, transcribe, analyze emotion, and extract actionable insights automatically. Built for scale and webhooks integration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-4">
            <Link href="/register" className="px-8 py-4 rounded-full text-lg font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-1">
              Start Free Trial
            </Link>
            <Link href="/login" className="px-8 py-4 rounded-full text-lg font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-all border border-slate-700/50 shadow-lg shadow-slate-900/50 hover:-translate-y-1">
              Login to Dashboard
            </Link>
          </div>
        </section>

        <section className="w-full max-w-6xl mx-auto py-16 z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to automate your workflows and make the most out of every conversation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="glass-panel-interactive p-8 text-left group">
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-4xl mx-auto py-24 text-center z-10 border-t border-slate-800/50 mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to connect with your n8n workflows?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            SmartMeet AI provides webhook-ready REST API endpoints allowing seamless connectivity to your automation pipelines.
          </p>
          <div className="glass-panel p-6 inline-block font-mono text-sm text-left bg-slate-900/80">
            <div className="text-emerald-400 mb-2"># Webhook Configuration Structure</div>
            <div className="text-blue-300">POST</div> <span className="text-slate-300">/api/meeting/audio-upload</span><br />
            <div className="text-purple-300 mt-2">GET</div> <span className="text-slate-300">/api/meeting/summary</span><br />
            <div className="text-amber-300 mt-2">POST</div> <span className="text-slate-300">/api/emotion/analyze</span>
          </div>
        </section>

      </main>
    </div>
  );
}
