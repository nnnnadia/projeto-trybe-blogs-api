const { validateToken } = require('../utils/jwt');
const { loginSchema } = require('../utils/validations/loginSchema');

const authenticateToken = (authorization) => {
  try {
    validateToken(authorization);
    return ({ type: undefined });
  } catch (_error) {
    return ({ type: 'UNAUTHORIZED', message: 'Expired or invalid token' });
  }
};

const loginValidation = ({ email, password }) => {
  const { error, value } = loginSchema.validate({ email, password });
  if (error) {
    const e = new Error('Some required fields are missing');
    e.type = 'MISSING_FIELD';
    throw e;
  }
  return value;
};

module.exports = {
  authenticateToken,
  loginValidation,
};
