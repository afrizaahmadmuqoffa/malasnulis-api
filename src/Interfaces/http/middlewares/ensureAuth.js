const jwt = require('jsonwebtoken');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');

const ensureAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Format: Authorization: Bearer <token>
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthenticationError('token hilang atau tidak valid');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    req.user = decoded; // inject user payload ke request
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new AuthenticationError('token sudah kadaluwarsa');
    }
    throw new AuthenticationError('token tidak valid');
  }
};

module.exports = ensureAuth;
