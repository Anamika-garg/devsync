import React, { useState, useMemo } from 'react';
import { Calendar, Filter, Sparkles } from 'lucide-react';

export default function Heatmap({ data = {} }) {
  const [filter, setFilter] = useState('all'); // 'all', 'git', 'leetcode', 'blended'
  const [hoveredDay, setHoveredDay] = useState(null);

  // Generate 52 weeks of dates ending today
  const calendarData = useMemo(() => {
    const today = new Date();
    const result = [];
    const dateMap = new Map();
    
    // Convert string keys to standard format
    Object.keys(data).forEach(k => {
      dateMap.set(k, data[k]);
    });

    // We want 53 weeks * 7 days = 371 grid cells (ending at today's day of week)
    // Find the starting date (371 days ago)
    const dayOfWeek = today.getDay();
    const totalDays = 53 * 7;
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - totalDays + 1);

    let currentDate = new Date(startDate);
    
    for (let w = 0; w < 53; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const activity = dateMap.get(dateStr) || { commits: 0, leetcode: 0 };
        
        week.push({
          date: new Date(currentDate),
          dateStr,
          commits: activity.commits || 0,
          leetcode: activity.leetcode || 0
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      result.push(week);
    }
    return result;
  }, [data]);

  // Determine block background color based on values and filter
  const getCellColor = (commits, leetcode) => {
    if (commits === 0 && leetcode === 0) return 'bg-[#18181B] border-white/[0.02] hover:bg-zinc-800';

    if (filter === 'git') {
      if (commits === 0) return 'bg-[#18181B] border-white/[0.02]';
      if (commits <= 2) return 'bg-emerald-950/60 border-emerald-900/30 text-emerald-400';
      if (commits <= 5) return 'bg-emerald-800/80 border-emerald-700/40 text-emerald-200';
      return 'bg-emerald-500 border-emerald-400/50 shadow-sm shadow-emerald-500/20 text-emerald-950';
    }

    if (filter === 'leetcode') {
      if (leetcode === 0) return 'bg-[#18181B] border-white/[0.02]';
      if (leetcode <= 1) return 'bg-orange-950/60 border-orange-900/30 text-orange-400';
      if (leetcode <= 3) return 'bg-orange-800/80 border-orange-700/40 text-orange-200';
      return 'bg-orange-500 border-orange-400/50 shadow-sm shadow-orange-500/20 text-orange-950';
    }

    // Default blended view
    if (commits > 0 && leetcode > 0) {
      // Blended: Both are active. Cyber-Teal / Golden glow
      const total = commits + leetcode;
      if (total <= 3) return 'bg-cyan-900/80 border-cyan-700/50 shadow-sm shadow-cyan-900/10 text-cyan-200';
      if (total <= 7) return 'bg-teal-600/90 border-teal-500/50 shadow-md shadow-teal-500/20 text-white';
      return 'bg-gradient-to-br from-cyan-400 to-yellow-400 border-cyan-300 shadow-lg shadow-cyan-500/30 text-zinc-950';
    } else if (commits > 0) {
      // GitHub green
      if (commits <= 2) return 'bg-emerald-950/60 border-emerald-900/30';
      if (commits <= 5) return 'bg-emerald-800/80 border-emerald-700/40';
      return 'bg-emerald-500 border-emerald-400/50 shadow-sm shadow-emerald-500/20';
    } else {
      // LeetCode orange
      if (leetcode <= 1) return 'bg-orange-950/60 border-orange-900/30';
      if (leetcode <= 3) return 'bg-orange-800/80 border-orange-700/40';
      return 'bg-orange-500 border-orange-400/50 shadow-sm shadow-orange-500/20';
    }
  };

  const getMonthLabels = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels = [];
    let lastMonth = -1;

    calendarData.forEach((week, wIdx) => {
      const month = week[0].date.getMonth();
      if (month !== lastMonth && wIdx % 4 === 0) {
        labels.push({ text: months[month], index: wIdx });
        lastMonth = month;
      }
    });

    return labels;
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-zinc-900 border border-white/[0.06]">
            <Calendar className="w-5 h-5 text-brandPurple" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white">Unified Dev Heatmap</h3>
            <p className="text-xs text-zinc-400">Merged git commits and leetcode submission matrices</p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/[0.06] self-start sm:self-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${filter === 'all' ? 'bg-zinc-800 text-white border border-white/[0.08]' : 'text-zinc-400 hover:text-white'}`}
          >
            Unified
          </button>
          <button
            onClick={() => setFilter('git')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${filter === 'git' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/50' : 'text-zinc-400 hover:text-white'}`}
          >
            GitHub
          </button>
          <button
            onClick={() => setFilter('leetcode')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${filter === 'leetcode' ? 'bg-orange-950/60 text-orange-400 border border-orange-900/50' : 'text-zinc-400 hover:text-white'}`}
          >
            LeetCode
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div className="relative overflow-x-auto pb-2 scrollbar-thin">
        <div className="min-w-[620px] flex flex-col">
          {/* Months label row */}
          <div className="flex pl-8 h-5 relative text-[10px] font-semibold text-zinc-500 mb-1">
            {getMonthLabels().map((lbl, idx) => (
              <span 
                key={idx} 
                className="absolute"
                style={{ left: `${(lbl.index * 11.2) + 32}px` }}
              >
                {lbl.text}
              </span>
            ))}
          </div>

          <div className="flex">
            {/* Weekdays indicator column */}
            <div className="flex flex-col justify-between text-[10px] font-semibold text-zinc-500 w-8 pr-2 pt-0.5 pb-2 text-right select-none h-[76px]">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Grid Map */}
            <div className="flex gap-[3px]">
              {calendarData.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-[8px] h-[8px] rounded-[1.5px] border transition-all duration-150 cursor-pointer ${getCellColor(day.commits, day.leetcode)}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Tooltip */}
        {hoveredDay && (
          <div className="absolute top-[-38px] left-[50%] -translate-x-[50%] bg-[#0F172A] border border-white/[0.08] text-white px-3 py-1.5 rounded-lg text-xs flex flex-col gap-0.5 z-10 whitespace-nowrap shadow-2xl backdrop-blur-md transition-all duration-100 ease-out">
            <span className="font-semibold text-zinc-300">{hoveredDay.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {hoveredDay.commits} {hoveredDay.commits === 1 ? 'commit' : 'commits'}
              </span>
              <span className="flex items-center gap-1 text-orange-400">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                {hoveredDay.leetcode} {hoveredDay.leetcode === 1 ? 'submission' : 'submissions'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Legend Block */}
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-zinc-400 border-t border-white/[0.04] pt-4 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span>Legend:</span>
          <div className="flex items-center gap-1">
            <div className="w-[8px] h-[8px] rounded-[1.5px] bg-[#18181B] border border-white/[0.02]" />
            <span>None</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[8px] h-[8px] rounded-[1.5px] bg-emerald-950 border border-emerald-900/30" />
            <span>Git Less</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[8px] h-[8px] rounded-[1.5px] bg-emerald-500 border border-emerald-400/50" />
            <span>Git High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[8px] h-[8px] rounded-[1.5px] bg-orange-950 border border-orange-900/30" />
            <span>LC Less</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[8px] h-[8px] rounded-[1.5px] bg-orange-500 border border-orange-400/50" />
            <span>LC High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[8px] h-[8px] rounded-[1.5px] bg-teal-600 border border-teal-500/50" />
            <span>Blended both</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-zinc-500">
          <Sparkles className="w-3 h-3 text-brandPurple animate-pulse" />
          <span>Teal blocks represent high multi-platform active days.</span>
        </div>
      </div>
    </div>
  );
}
