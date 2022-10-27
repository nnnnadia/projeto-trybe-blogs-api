const jwtUtil = require('../utils/jwt');

const validateToken = (req, _res, next) => {
  const token = req.authorization;
  if (!token) next({ type: 'UNAUTHORIZED', message: 'Token not found' });
  try {
    const { data } = jwtUtil.validateToken(token);
    console.log(data);
    next();
  } catch (_error) {
    next({ type: 'UNAUTHORIZED', message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateToken,
};
