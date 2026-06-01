import React from 'react';
import { 
  Github, 
  Terminal, 
  Sparkles, 
  Layers, 
  Trophy, 
  Brain, 
  FileText, 
  ArrowRight,
  Code2,
  Lock,
  Chrome
} from 'lucide-react';

export default function LandingPage({ onDemoClick }) {
  // Initiates Google OAuth sequence on Express server proxy
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start overflow-hidden pt-12 md:pt-20 px-4">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-brandPurple/10 to-lcOrange/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="radial-glow top-0 right-0 opacity-40" />
      <div className="radial-glow bottom-0 left-0 opacity-30" />

      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
        
        {/* Floating pill badge */}
        <div 
          onClick={onDemoClick}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-brandPurple/30 cursor-pointer text-xs font-semibold text-zinc-300 hover:text-white transition-all shadow-xl group"
        >
          <Sparkles className="w-3.5 h-3.5 text-brandPurple group-hover:animate-pulse" />
          <span>Bypass registration? Click to view live demo dashboard</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>

        {/* Big punchy headline */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.08] max-w-3xl">
          Your Entire Developer Identity. <span className="bg-gradient-to-r from-brandPurple to-lcOrange bg-clip-text text-transparent">Unified.</span>
        </h1>

        {/* Supportive subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-400 font-medium leading-relaxed max-w-2xl">
          Sync your GitHub commits and LeetCode ratings into a single, stunning developer dashboard. Showcase your impact, analyze your contests, and optimize your resume.
        </p>

        {/* Action Flow */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md justify-center">
          {/* Glowing Sign In with Google */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-100 transition-all shadow-xl shadow-white/5 active:scale-95 group shrink-0 w-full sm:w-auto"
          >
            <Chrome className="w-5 h-5 text-brandPurple group-hover:rotate-12 transition-transform" />
            <span>Connect with Google</span>
            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Quick Demo Action */}
          <button
            onClick={onDemoClick}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/[0.08] hover:border-white/[0.2] bg-zinc-950/20 backdrop-blur-md text-zinc-300 hover:text-white font-bold transition-all active:scale-95 w-full sm:w-auto"
          >
            <span>Explore Demo</span>
          </button>
        </div>
      </div>

      {/* VIEW 1.3: Floating 3D Tilted Dashboard Preview Mockup */}
      <section id="preview" className="w-full max-w-5xl mx-auto mt-20 relative z-10 px-4 md:px-0">
        <div className="relative group">
          {/* Glowing back lights */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brandPurple/20 to-lcOrange/25 rounded-3xl blur-2xl opacity-70 -z-10 group-hover:scale-105 transition-all duration-500" />
          
          {/* Tilted frame container */}
          <div className="tilt-card glass-card p-6 border border-white/[0.12] rounded-3xl bg-[#09090B]/60 backdrop-blur-2xl">
            {/* Windows toolbar simulation */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-[10px] font-semibold text-zinc-500 tracking-wider">
                devsync.app/developer/alex_mercer
              </div>
              <Lock className="w-3.5 h-3.5 text-zinc-500" />
            </div>

            {/* Layout representation in mini dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-85 select-none">
              
              {/* Profile card representation */}
              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-brandPurple to-lcOrange p-[1px]">
                  <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-xs font-bold text-white">AM</div>
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">Alex Mercer</span>
                  <span className="text-[10px] text-zinc-400">@alex_mercer • Guardian</span>
                </div>
              </div>

              {/* Contest metrics */}
              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01] flex items-center justify-between col-span-2">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-zinc-500">LeetCode Contest Rating</span>
                  <span className="text-xl font-display font-extrabold text-lcOrange">1,942</span>
                </div>
                <div className="w-24 h-6 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold flex items-center justify-center">
                  Top 1.8% Global
                </div>
              </div>

              {/* Simulated Heatmap Row */}
              <div className="md:col-span-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.01]">
                <div className="flex justify-between text-[10px] text-zinc-400 mb-2 font-bold">
                  <span>UNIFIED DEVELOPER ACTIVITY GRID</span>
                  <span className="text-emerald-400">1,784 Commits + Solves</span>
                </div>
                <div className="flex gap-[3px] overflow-hidden">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }).map((_, j) => {
                        const cellVal = (i + j) % 5;
                        const colors = [
                          'bg-zinc-900 border-transparent',
                          'bg-emerald-950/80 border-emerald-900/20',
                          'bg-orange-950/80 border-orange-900/20',
                          'bg-teal-600/60 border-teal-500/30',
                          'bg-emerald-500/80 border-emerald-400/20'
                        ];
                        return <div key={j} className={`w-[8px] h-[8px] rounded-[1.5px] border ${colors[cellVal]}`} />;
                      })}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="w-full max-w-5xl mx-auto mt-32 mb-20 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brandPurple bg-brandPurple/10 px-3.5 py-1 rounded-full border border-brandPurple/20">FEATURES</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mt-4 tracking-tight leading-tight">
            Engineered for elite developers.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Get the data insights recruiters look for in high-performing technical profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card A: Unified Heatmap */}
          <div className="glass-card p-6 flex flex-col justify-between group h-full">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform mb-5">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">Unified Heatmap</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mt-2.5">
                A single combined calendar tracking GitHub commits and LeetCode submissions. Witness your full daily developer velocity.
              </p>
            </div>
            <div className="text-[10px] text-zinc-500 font-bold uppercase mt-6 tracking-wide flex items-center gap-1">
              <span>Dual activity streams</span>
            </div>
          </div>

          {/* Card B: Contest Analytics */}
          <div className="glass-card p-6 flex flex-col justify-between group h-full">
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-lcOrange flex items-center justify-center group-hover:scale-105 transition-transform mb-5">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-lcOrange transition-colors">Contest Analytics</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mt-2.5">
                Detailed trajectories mapping contest performance, maximum ratings, global rankings, and specialized rank percentile tracking.
              </p>
            </div>
            <div className="text-[10px] text-zinc-500 font-bold uppercase mt-6 tracking-wide flex items-center gap-1">
              <span>GraphQL proxy querying</span>
            </div>
          </div>

          {/* Card C: Skill Matrix */}
          <div className="glass-card p-6 flex flex-col justify-between group h-full">
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center group-hover:scale-105 transition-transform mb-5">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-violet-400 transition-colors">Skill Matrix</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mt-2.5">
                Interactive radar diagrams blending programming language commits with DSA algorithmic topics to present balanced strength scores.
              </p>
            </div>
            <div className="text-[10px] text-zinc-500 font-bold uppercase mt-6 tracking-wide flex items-center gap-1">
              <span>Visual spider graphs</span>
            </div>
          </div>

          {/* Card D: AI Resume Scorer */}
          <div className="glass-card p-6 flex flex-col justify-between group h-full">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-105 transition-transform mb-5">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-rose-400 transition-colors">AI Resume Scorer</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mt-2.5">
                Instant ATS evaluation tracking developer descriptions and repositories to supply actionable tips for enhancing technical resumes.
              </p>
            </div>
            <div className="text-[10px] text-zinc-500 font-bold uppercase mt-6 tracking-wide flex items-center gap-1">
              <span>Optimized ATS feedback</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full border-t border-white/[0.08] py-8 text-center text-xs text-zinc-500 relative z-10">
        <p>© 2026 DevSync Platform. Built with Vite, React and Tailwind. Dark aesthetic design inspired by Linear & Stripe.</p>
      </footer>
    </div>
  );
}
