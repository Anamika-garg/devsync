require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const rateLimit = require('express-rate-limit');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing for the React Client
// React Dev Server runs on http://localhost:3000
app.use(cors({ 
  origin: 'http://localhost:3000', 
  credentials: true 
}));

app.use(express.json());

// API Request Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { message: "Too many requests from this device, please try again later." }
});
app.use('/api/', limiter);

// Google Passport OAuth Strategy Setup
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'dummy_id.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_secret',
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create User based on Google Profile ID
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0]?.value,
          displayName: profile.displayName,
          avatarUrl: profile.photos[0]?.value
        });
        console.log(`[Google OAuth] Registered new developer account: ${profile.displayName}`);
      } else {
        console.log(`[Google OAuth] Welcome back: ${profile.displayName}`);
      }
      return done(null, user);
    } catch (err) {
      console.error("[Google Passport Strategy Fatal]", err);
      return done(err, null);
    }
  }
));

// Initialize Passport Context
app.use(passport.initialize());

// Mount API Endpoints
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Base Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date(),
    service: 'DevSync Secured Fullstack Backend'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Fatal Server Exception]', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong on the server!',
    details: err.message
  });
});

// Database Connection & Launch Listener
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/devsync';
console.log(`[Database] Connecting to MongoDB: ${mongoURI}`);

mongoose.connect(mongoURI)
  .then(() => {
    console.log("[Database] Connected securely to MongoDB.");
    app.listen(PORT, () => {
      console.log(`================================================================`);
      console.log(`🚀 DevSync Proxy Server executing smoothly on http://localhost:${PORT}`);
      console.log(`👉 Login Gateway: http://localhost:${PORT}/api/auth/google`);
      console.log(`================================================================`);
    });
  })
  .catch(err => {
    console.error("=====================================================================");
    console.error("[Database Connection Failure] Failed to connect to MongoDB.");
    console.error(err.message);
    console.error("Please ensure MongoDB is installed and the mongod daemon is running.");
    console.error("=====================================================================");
  });
