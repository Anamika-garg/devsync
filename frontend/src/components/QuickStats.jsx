import React from 'react';
import { Flame, GitCommit, Target, Circle } from 'lucide-react';

export default function QuickStats({ 
  totalCommits = 1450, 
  currentStreak = 14, 
  totalSolved = 486, 
  easySolved = 142, 
  mediumSolved = 268, 
  hardSolved = 76 
}) {
  
  // Calculate SVG circular parameters
  const totalQuestions = easySolved + mediumSolved + hardSolved;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  
  // Easy percentage and dash arrays
  const easyPct = totalQuestions > 0 ? easySolved / totalQuestions : 0;
  const mediumPct = totalQuestions > 0 ? mediumSolved / totalQuestions : 0;
  const hardPct = totalQuestions > 0 ? hardSolved / totalQuestions : 0;

  // Let's create segment calculations for single compound SVG donut
  const easyStroke = circumference * easyPct;
  const mediumStroke = circumference * mediumPct;
  const hardStroke = circumference * hardPct;

  const easyOffset = circumference;
  const mediumOffset = circumference - easyStroke;
  const hardOffset = circumference - easyStroke - mediumStroke;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
      {/* Total Commits Card */}
      <div className="flex flex-col justify-between p-5 rounded-2xl bg-white/[0.01] border border-white/[0.06] hover:border-emerald-500/25 transition-all group overflow-hidden relative">
        <div className="flex justify-between items-start">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-105 transition-transform">
            <GitCommit className="w-5 h-5" />
          </div>
          <span className="text-[10px] text-zinc-500 font-semibold tracking-wider uppercase">GitHub</span>
        </div>
        <div className="mt-4">
          <span className="block text-2xl font-display font-extrabold text-white tracking-tight">
            {totalCommits.toLocaleString()}
          </span>
          <span className="text-xs text-zinc-400 mt-1 block">Total Active Commits</span>
        </div>
        {/* Glow effect on hover */}
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Streak Card */}
      <div className="flex flex-col justify-between p-5 rounded-2xl bg-white/[0.01] border border-white/[0.06] hover:border-rose-500/25 transition-all group overflow-hidden relative">
        <div className="flex justify-between items-start">
          <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-[10px] text-zinc-500 font-semibold tracking-wider uppercase">Consistency</span>
        </div>
        <div className="mt-4">
          <span className="block text-2xl font-display font-extrabold text-white tracking-tight flex items-baseline gap-1">
            {currentStreak} <span className="text-xs font-semibold text-rose-400">days</span>
          </span>
          <span className="text-xs text-zinc-400 mt-1 block">Current Continuous Streak</span>
        </div>
        {/* Glow effect on hover */}
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-rose-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* LeetCode Solved Ring Card */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.01] border border-white/[0.06] hover:border-orange-500/25 transition-all group relative overflow-hidden">
        {/* Statistics details */}
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center gap-1.5">
            <Target className="w-4 h-4 text-lcOrange" />
            <span className="text-xs font-bold text-white uppercase tracking-tight">Solved Breakdown</span>
          </div>
          
          <div className="flex flex-col gap-1 mt-4">
            <div className="flex items-center gap-2 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-zinc-400">Easy:</span>
              <span className="text-white">{easySolved}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <span className="text-zinc-400">Med:</span>
              <span className="text-white">{mediumSolved}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span className="text-zinc-400">Hard:</span>
              <span className="text-white">{hardSolved}</span>
            </div>
          </div>
        </div>

        {/* Circular Donut Diagram */}
        <div className="relative flex items-center justify-center w-24 h-24 select-none">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth="7"
              fill="transparent"
            />
            {/* Easy segment */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="#10B981"
              strokeWidth="7"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={easyOffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            {/* Medium segment */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="#F97316"
              strokeWidth="7"
              fill="transparent"
              strokeDasharray={`${mediumStroke} ${circumference - mediumStroke}`}
              strokeDashoffset={mediumOffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            {/* Hard segment */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="#EF4444"
              strokeWidth="7"
              fill="transparent"
              strokeDasharray={`${hardStroke} ${circumference - hardStroke}`}
              strokeDashoffset={hardOffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          {/* Inner Text */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-sm font-display font-extrabold text-white tracking-tight leading-none">{totalSolved}</span>
            <span className="text-[8px] text-zinc-500 uppercase mt-0.5 tracking-wider font-bold">Solved</span>
          </div>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-orange-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
