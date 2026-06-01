import React, { useState } from 'react';
import { Github, Code2, ArrowRight, Sparkles, Terminal, LogOut } from 'lucide-react';

export default function OnboardingPage({ onOnboard, isSyncing, onLogout, userProfile }) {
  const [githubUser, setGithubUser] = useState('');
  const [leetcodeUser, setLeetcodeUser] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!githubUser.trim() || !leetcodeUser.trim()) {
      setError('Please provide usernames for both developer networks.');
      return;
    }
    setError('');
    onOnboard(githubUser.trim(), leetcodeUser.trim(), setError);
  };

  const loadSample = () => {
    setGithubUser('alex_mercer');
    setLeetcodeUser('alex_m_knight');
    setError('');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brandPurple/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="radial-glow top-0 right-0 opacity-30" />

      {/* Main card */}
      <div className="w-full max-w-lg glass-card p-8 border-white/[0.1] bg-[#09090B]/60 backdrop-blur-2xl shadow-2xl relative z-10 flex flex-col gap-6">
        
        {/* Header logo / welcome */}
        <div className="flex flex-col items-center text-center gap-2 border-b border-white/[0.08] pb-5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-brandPurple to-lcOrange p-[1px] mb-2">
            <div className="flex items-center justify-center w-full h-full rounded-xl bg-[#09090B]">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-brandPurple to-lcOrange opacity-40 blur-sm" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-white tracking-tight leading-none">
            Setup Your Identity
          </h2>
          <p className="text-xs text-zinc-400 font-semibold leading-relaxed mt-1 max-w-sm">
            Welcome, <span className="text-white">{userProfile?.displayName || 'Developer'}</span>! Connect your accounts to compile your unified bento metrics dashboard.
          </p>
        </div>

        {/* Dynamic Help Pill */}
        <div 
          onClick={loadSample}
          className="inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-brandPurple/5 border border-brandPurple/20 hover:border-brandPurple/40 cursor-pointer text-xs font-semibold text-zinc-300 hover:text-white transition-all group"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brandPurple group-hover:animate-pulse" />
            <span>Click to load elite sample handles (Demo)</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>

        {/* Inputs form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* GitHub Input field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">GitHub Username</label>
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-black/40 border border-white/[0.08] focus-within:border-brandPurple transition-colors group">
              <Github className="w-4.5 h-4.5 text-zinc-500 group-focus-within:text-white transition-colors shrink-0" />
              <input
                type="text"
                value={githubUser}
                onChange={(e) => setGithubUser(e.target.value)}
                placeholder="e.g., octocat"
                className="bg-transparent border-0 outline-none w-full text-sm text-white placeholder-zinc-500 focus:ring-0 p-0"
              />
            </div>
          </div>

          {/* LeetCode Input field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">LeetCode Username</label>
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-black/40 border border-white/[0.08] focus-within:border-brandPurple transition-colors group">
              <Code2 className="w-4.5 h-4.5 text-zinc-500 group-focus-within:text-white transition-colors shrink-0" />
              <input
                type="text"
                value={leetcodeUser}
                onChange={(e) => setLeetcodeUser(e.target.value)}
                placeholder="e.g., lc_knight"
                className="bg-transparent border-0 outline-none w-full text-sm text-white placeholder-zinc-500 focus:ring-0 p-0"
              />
            </div>
          </div>

          {/* Error notice */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold leading-relaxed">
              {error}
            </div>
          )}

          {/* Setup Button */}
          <button
            type="submit"
            disabled={isSyncing}
            className="w-full bg-gradient-to-r from-brandPurple to-lcOrange hover:opacity-95 text-white font-semibold text-sm px-6 py-4 rounded-xl transition-all shadow-lg shadow-brandPurple/20 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 mt-2"
          >
            {isSyncing ? (
              <>
                <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Syncing & Validating Accounts...</span>
              </>
            ) : (
              <>
                <span>Complete Setup & Sync</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </>
            )}
          </button>
        </form>

        {/* Logout backup */}
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 hover:text-white font-bold transition-colors mt-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out Account</span>
        </button>
      </div>
    </div>
  );
}
