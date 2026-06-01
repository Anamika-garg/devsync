const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: String,
  avatarUrl: String,
  
  // Linked profiles set after OAuth onboarding
  githubUsername: { type: String, trim: true },
  leetcodeUsername: { type: String, trim: true },
  lastSyncedAt: { type: Date },
  
  githubStats: {
    totalCommits: { type: Number, default: 0 },
    publicRepos: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    languages: [{ name: String, percentage: Number }]
  },
  
  leetcodeStats: {
    globalRank: Number,
    totalSolved: { type: Number, default: 0 },
    easySolved: { type: Number, default: 0 },
    mediumSolved: { type: Number, default: 0 },
    hardSolved: { type: Number, default: 0 },
    contestRating: { type: Number, default: 0 },
    currentBadge: String,
    contestHistory: [{
      contestName: String,
      rating: Number,
      rank: Number,
      date: Date
    }]
  },
  
  // Normalized 365-day tracking: { "2026-05-15": { commits: 4, leetcode: 2 } }
  unifiedHeatmap: {
    type: Map,
    of: new mongoose.Schema({
      commits: { type: Number, default: 0 },
      leetcode: { type: Number, default: 0 }
    }, { _id: false })
  },
  
  resumeScoreCard: {
    score: { type: Number, default: 85 },
    insights: { 
      type: [String], 
      default: [
        "Optimize README developer abstract for recruitment matching indices.",
        "Highlight dynamic programming skills under repository project bullet points.",
        "Add deployment URLs directly to repository summaries to boost recruiter engagement."
      ] 
    }
  },
  
  isPublic: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
