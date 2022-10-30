const { authService } = require('../services');

module.exports = async (req, _res, next) => {
  const { authorization } = req.headers;
  await authService.authenticateToken(authorization);
  next();
};
