// backend/routes/users.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/users/preferences
// @desc    Update user preferences
// @access  Private
router.put('/preferences', auth, async (req, res) => {
  const { tradingStyle, riskTolerance } = req.body;

  try {
    let user = await User.findById(req.user);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.preferences.tradingStyle = tradingStyle || user.preferences.tradingStyle;
    user.preferences.riskTolerance = riskTolerance || user.preferences.riskTolerance;

    await user.save();
    res.json(user.preferences);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
