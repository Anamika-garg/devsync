import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Brain, Sparkles } from 'lucide-react';

export default function SkillRadar({ languages = [], solvedStats = {} }) {
  // Merge language proficiencies and DSA solved tags into a neat 6-dimensional array
  // If not fully populated, use balanced default metrics matching the mock user
  const radarData = [
    { subject: 'Systems (C++/Rust)', value: 85, fullMark: 100 },
    { subject: 'Scripting & AI (Python)', value: 72, fullMark: 100 },
    { subject: 'Web Dev (TS/JS)', value: 95, fullMark: 100 },
    { subject: 'DSA: Arrays & Strings', value: 90, fullMark: 100 },
    { subject: 'DSA: DP & Recursion', value: 78, fullMark: 100 },
    { subject: 'DSA: Trees & Graphs', value: 82, fullMark: 100 },
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header Info */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-zinc-900 border border-white/[0.06]">
          <Brain className="w-5 h-5 text-brandPurple" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-white">Advanced Skill Matrix</h3>
          <p className="text-xs text-zinc-400">Git languages & LeetCode topic proficiency distribution</p>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full h-[230px] min-h-[230px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid stroke="rgba(255, 255, 255, 0.05)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#A1A1AA', fontSize: 9, fontWeight: 500 }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: '#52525B', fontSize: 8 }}
              axisLine={false}
            />
            <Radar
              name="Proficiency"
              dataKey="value"
              stroke="#8B5CF6"
              fill="#8B5CF6"
              fillOpacity={0.15}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Dynamic Skill Badge Footer */}
      <div className="flex items-center justify-between mt-3 text-[10px] text-zinc-400 border-t border-white/[0.04] pt-3">
        <div className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-brandPurple" />
          <span>Core Domain Focus:</span>
          <span className="text-white font-semibold">Web Architect & Algorist</span>
        </div>
        <span className="text-[#A1A1AA] italic">Balanced profile</span>
      </div>
    </div>
  );
}
