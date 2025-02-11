// backend/middleware/auth.js

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  console.log('Authorization header:', req.header('Authorization'));
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
