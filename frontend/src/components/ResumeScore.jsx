import React from 'react';
import { Sparkles, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export default function ResumeScore({ score = 84, insights = [] }) {
  // SVG circle configurations
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-lg bg-zinc-900 border border-white/[0.06]">
          <FileText className="w-5 h-5 text-zinc-300" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-white">AI ATS Resume Scorer</h3>
          <p className="text-xs text-zinc-400">Instantly evaluate portfolio and resume competitiveness</p>
        </div>
      </div>

      {/* Main score layout */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 flex-1">
        {/* Circular Progress Gauge */}
        <div className="relative flex items-center justify-center w-32 h-32 select-none shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Active score ring */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="url(#purpleGlowGrad)"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            
            {/* Definitions */}
            <defs>
              <linearGradient id="purpleGlowGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner stats */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-display font-extrabold text-white tracking-tight leading-none">
              {score}
            </span>
            <span className="text-[9px] text-zinc-400 font-bold uppercase mt-1 tracking-wider">ATS Score</span>
          </div>

          {/* Glowing aura */}
          <div className="absolute inset-0 bg-brandPurple/5 rounded-full blur-2xl -z-10 animate-pulse-slow" />
        </div>

        {/* Insights list */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-brandPurple tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Resume Optimization Checklist</span>
          </div>
          
          <ul className="space-y-2">
            {insights.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-brandPurple shrink-0 mt-0.5" />
                <span className="leading-relaxed">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer prompt */}
      <div className="flex items-center justify-between mt-5 text-[10px] text-zinc-500 border-t border-white/[0.04] pt-3">
        <span>ATS Engine: V2.4-Beta</span>
        <button className="flex items-center gap-0.5 text-zinc-400 hover:text-white font-semibold transition-colors">
          <span>Re-verify ATS compatibility</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
