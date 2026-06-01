import React from 'react';
import { 
  Github, 
  Code2, 
  RefreshCw, 
  MapPin, 
  Link as LinkIcon, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

import Heatmap from './Heatmap';
import ContestChart from './ContestChart';
import SkillRadar from './SkillRadar';
import QuickStats from './QuickStats';
import ResumeScore from './ResumeScore';
import ShareProfile from './ShareProfile';

export default function DashboardPage({ profile = {}, isSyncing = false, onSyncRefresh = null }) {
  if (!profile || Object.keys(profile).length === 0) {
    return (
      <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center bg-background text-zinc-400">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-zinc-800 border-t-brandPurple rounded-full animate-spin" />
          <span>Generating premium dashboard data...</span>
        </div>
      </div>
    );
  }

  const {
    githubUsername = '',
    leetcodeUsername = '',
    displayName = '',
    avatarUrl = '',
    lastSyncedAt = new Date(),
    githubStats = {},
    leetcodeStats = {},
    unifiedHeatmap = {},
    resumeScoreCard = {}
  } = profile;

  // Render nicely formatted "Synced X mins ago"
  const getSyncTimeText = () => {
    if (!lastSyncedAt) return 'Synced just now';
    const diffMs = Date.now() - new Date(lastSyncedAt).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Synced just now';
    if (diffMins === 1) return 'Synced 1 min ago';
    if (diffMins < 60) return `Synced ${diffMins} mins ago`;
    return `Synced ${Math.floor(diffMins / 60)} hours ago`;
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Background glowing rings */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brandPurple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 left-1/4 w-[400px] h-[400px] bg-lcOrange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl flex flex-col gap-6 relative z-10">
        
        {/* Top Profile Banner */}
        <section className="glass-card p-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border-white/[0.08] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden group">
          {/* Glowing profile overlay */}
          <div className="absolute -top-12 -left-12 w-44 h-44 bg-brandPurple/10 rounded-full blur-2xl opacity-40 group-hover:scale-110 transition-transform duration-500" />
          
          <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10 w-full md:w-auto">
            {/* Avatar Merging GitHub & LeetCode (glowing border) */}
            <div className="relative w-20 h-20 shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-brandPurple via-cyan-400 to-lcOrange p-[2px] shadow-lg animate-pulse-slow">
                <img 
                  src={avatarUrl || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${githubUsername}`} 
                  alt="Developer Avatar"
                  className="w-full h-full rounded-2xl object-cover bg-zinc-900"
                />
              </div>
              {/* LeetCode small floating badge */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-md bg-[#1F1F1F] border border-white/[0.1] shadow-md flex items-center justify-center p-[2px]">
                <Code2 className="w-3.5 h-3.5 text-lcOrange" />
              </div>
            </div>

            {/* Profile Handles */}
            <div className="text-center sm:text-left flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h2 className="font-display font-extrabold text-2xl tracking-tight text-white">{displayName || 'Core Developer'}</h2>
                {leetcodeStats?.currentBadge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 border border-orange-500/25 text-lcOrange animate-pulse">
                    {leetcodeStats.currentBadge}
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 text-xs text-zinc-400 font-medium">
                <a 
                  href={`https://github.com/${githubUsername}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>github.com/{githubUsername}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
                <span className="hidden sm:inline text-zinc-700">•</span>
                <a 
                  href={`https://leetcode.com/${leetcodeUsername}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5 text-lcOrange" />
                  <span>leetcode.com/{leetcodeUsername}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Sync Stats & Refresh Button */}
          <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-end border-t md:border-t-0 border-white/[0.06] pt-4 md:pt-0 w-full md:w-auto relative z-10 shrink-0">
            <div className="text-right flex flex-col items-end gap-1 select-none">
              <div className="flex items-center gap-1.5">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-emerald-400 tracking-tight uppercase">Live Active Sync</span>
              </div>
              <span className="text-[10px] font-semibold text-zinc-400">{getSyncTimeText()}</span>
            </div>

            <button
              onClick={onSyncRefresh}
              disabled={isSyncing}
              className="p-3 rounded-xl border border-white/[0.08] bg-zinc-900/50 hover:border-brandPurple hover:text-white text-zinc-400 transition-all flex items-center justify-center active:scale-95 disabled:opacity-50"
              title="Sync profile analytics"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-brandPurple' : ''}`} />
            </button>
          </div>
        </section>

        {/* BENTO GRID STATS LAYOUT */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* CARD A: Unified Heatmap Activity (Spans 2 columns on desktop) */}
          <div className="glass-card p-6 lg:col-span-2 flex flex-col justify-between shadow-lg">
            <Heatmap data={unifiedHeatmap} />
          </div>

          {/* CARD D: Quick Stats (Commits, Solved breakdown donut, consistency streaks) */}
          <div className="lg:col-span-1 h-full">
            <QuickStats 
              totalCommits={githubStats?.totalCommits}
              currentStreak={githubStats?.currentStreak}
              totalSolved={leetcodeStats?.totalSolved}
              easySolved={leetcodeStats?.easySolved}
              mediumSolved={leetcodeStats?.mediumSolved}
              hardSolved={leetcodeStats?.hardSolved}
            />
          </div>

          {/* CARD B: Contest rating trajectory (Spans 2 columns on desktop) */}
          <div className="glass-card p-6 lg:col-span-2 shadow-lg">
            <ContestChart 
              history={leetcodeStats?.contestHistory} 
              currentRating={leetcodeStats?.contestRating}
              globalRank={leetcodeStats?.globalRank}
            />
          </div>

          {/* CARD C: Skill Radar Matrix (Spans 1 column, height matching DP insights) */}
          <div className="glass-card p-6 lg:col-span-1 lg:row-span-2 shadow-lg">
            <SkillRadar 
              languages={githubStats?.languages} 
              solvedStats={leetcodeStats} 
            />
          </div>

          {/* CARD E: AI ATS Resume Scorer (Spans 2 columns on desktop) */}
          <div className="glass-card p-6 lg:col-span-2 shadow-lg">
            <ResumeScore 
              score={resumeScoreCard?.score}
              insights={resumeScoreCard?.insights}
            />
          </div>

          {/* CARD F: Public Profile Share Control (Spans 1 column on desktop) */}
          <div className="glass-card p-6 lg:col-span-1 shadow-lg">
            <ShareProfile 
              githubUsername={githubUsername}
              isPublicInit={profile.isPublic}
            />
          </div>

        </section>

      </div>
    </div>
  );
}
