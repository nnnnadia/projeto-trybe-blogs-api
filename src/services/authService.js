const { validateToken } = require('../utils/jwt');
const loginSchema = require('../utils/validations/loginSchema');
const newUserSchema = require('../utils/validations/newUserSchema');

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

const newUserValidation = ({ displayName, email, password, image }) => {
  const { error, value } = newUserSchema
    .validate({ displayName, email, password, image });
  if (error) {
    error.type = 'INVALID_FIELD';
    throw error;
  }
  return (value);
};

module.exports = {
  authenticateToken,
  loginValidation,
  newUserValidation,
};
