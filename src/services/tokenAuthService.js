const { validateToken } = require('../utils/jwt');

const authenticateToken = (authorization) => {
  try {
    validateToken(authorization);
    return ({ type: undefined });
  } catch (_error) {
    return ({ type: 'UNAUTHORIZED', message: 'Expired or invalid token' });
  }
};

module.exports = {
  authenticateToken,
};
