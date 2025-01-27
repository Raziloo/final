// backend/routes/predictions.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');
require('dotenv').config();

// @route   POST /api/predictions
// @desc    Get AI prediction
// @access  Private
router.post('/', auth, async (req, res) => {
  const { ticker } = req.body;

  try {
    // Fetch user preferences
    const user = req.user;

    // Prepare data for ML model
    const mlRequestData = {
      ticker,
      tradingStyle: req.body.tradingStyle, // Optionally include more user data
    };

    // Make request to ML model
    const mlResponse = await axios.post('http://localhost:5001/predict', mlRequestData, {
      headers: { 'x-api-key': process.env.ML_API_KEY },
    });

    res.json(mlResponse.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Error getting prediction', error: error.message });
  }
});

module.exports = router;
