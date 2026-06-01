const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Trigger Google Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth Callback Handler
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login', session: false }),
  (req, res) => {
    // Generate JWT token valid for 7 days
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    // Redirect back to frontend dashboard success handler with token as a URL param
    // Note: React Dev port is 3000 (configured in Vite setup)
    res.redirect(`http://localhost:3000/auth-success?token=${token}`);
  }
);

// Get current logged-in user profile
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No token provided" });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User profile not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("[Auth Routes Error] Token verification failed:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
