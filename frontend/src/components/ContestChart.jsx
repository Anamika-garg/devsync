import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Trophy, TrendingUp, Star } from 'lucide-react';

export default function ContestChart({ history = [], currentRating = 1850, globalRank = 12450 }) {
  // Format dates for X-Axis labels
  const chartData = history.map(item => ({
    name: new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    rating: item.rating,
    rank: item.rank,
    contest: item.contestName
  }));

  // Calculate statistics
  const ratings = history.map(h => h.rating);
  const maxRating = ratings.length > 0 ? Math.max(...ratings) : currentRating;
  const attendedCount = history.length;
  
  // Estimate global top percentage based on rank (12000 corresponds to approx top 2.5%)
  const topPercentage = ((globalRank / 450000) * 100).toFixed(1);

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-zinc-900 border border-white/[0.06]">
            <Trophy className="w-5 h-5 text-lcOrange" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white">Contest Rating Trajectory</h3>
            <p className="text-xs text-zinc-400">Competitive programming skill progression graph</p>
          </div>
        </div>

        {/* Highlight Stats Pill */}
        <div className="flex items-center gap-4 bg-black/40 border border-white/[0.06] rounded-xl px-4 py-2 self-start sm:self-center">
          <div className="text-center border-r border-white/[0.08] pr-4">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500">Max Rating</span>
            <span className="font-display font-bold text-base text-lcOrange">{maxRating}</span>
          </div>
          <div className="text-center border-r border-white/[0.08] pr-4">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500">Contests</span>
            <span className="font-display font-bold text-base text-white">{attendedCount}</span>
          </div>
          <div className="text-center">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500">Top %</span>
            <span className="font-display font-bold text-base text-emerald-400">{topPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Chart Layout */}
      <div className="flex-1 w-full h-[220px] min-h-[220px]">
        {chartData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center border border-dashed border-white/[0.08] rounded-xl bg-white/[0.01]">
            <span className="text-zinc-500 text-xs">No active contest participation recorded</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="ratingGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.03)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#71717A', fontSize: 10, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                domain={['dataMin - 100', 'dataMax + 100']}
                tick={{ fill: '#71717A', fontSize: 10, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
                dx={-5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'
                }}
                itemStyle={{ color: '#F97316' }}
                labelClassName="font-semibold text-zinc-400"
                formatter={(value, name) => [value, 'Rating']}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    return `${payload[0].payload.contest} (${label})`;
                  }
                  return label;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="rating" 
                stroke="#F97316" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#ratingGlow)" 
                activeDot={{ r: 6, stroke: '#09090B', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footer text */}
      <div className="flex items-center gap-1.5 mt-3 text-[10px] text-zinc-500">
        <TrendingUp className="w-3.5 h-3.5 text-lcOrange animate-bounce" />
        <span>Currently tracking in top global ratings with stable upward slope trajectories.</span>
      </div>
    </div>
  );
}
