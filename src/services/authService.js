const { validateToken } = require('../utils/jwt');
const typeError = require('../utils/typeError');
const loginSchema = require('../utils/validations/loginSchema');
const newUserSchema = require('../utils/validations/newUserSchema');

const authenticateToken = (authorization) => {
  if (!authorization) throw typeError('UNAUTHORIZED', 'Token not found');
  try {
    validateToken(authorization);
    return;
  } catch (_error) {
    throw typeError('UNAUTHORIZED', 'Expired or invalid token');
  }
};

const loginValidation = ({ email, password }) => {
  const { error, value } = loginSchema.validate({ email, password });
  if (error) throw typeError('MISSING_FIELD', 'Some required fields are missing');
  return value;
};

const newUserValidation = ({ displayName, email, password, image }) => {
  const { error, value } = newUserSchema
    .validate({ displayName, email, password, image });
  if (error) throw typeError('INVALID_FIELD', error.message);
  return (value);
};

module.exports = {
  authenticateToken,
  loginValidation,
  newUserValidation,
};
