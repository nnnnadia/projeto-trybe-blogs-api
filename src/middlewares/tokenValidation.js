const authService = require('../services');

const validateToken = (req, _res, next) => {
  const authorization = req.headers;
  if (!authorization) next({ type: 'UNAUTHORIZED', message: 'Token not found' });
  const { type, message } = authService.authenticateToken(authorization);
  if (!type) next();
  next({ type, message });
};

module.exports = validateToken;
