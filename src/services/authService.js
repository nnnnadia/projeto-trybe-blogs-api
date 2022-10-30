const { validateToken } = require('../utils/jwt');
const typeError = require('../utils/typeError');
const loginSchema = require('../utils/validations/loginSchema');
const newUserSchema = require('../utils/validations/newUserSchema');
const categorySchema = require('../utils/validations/categorySchema');
const postSchema = require('../utils/validations/postSchema');

const authenticateToken = (authorization) => {
  if (!authorization) throw typeError('UNAUTHORIZED', 'Token not found');
  try {
    validateToken(authorization);
    return;
  } catch (_) {
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

const categoryValidation = ({ name }) => {
  const { error, value } = categorySchema
    .validate({ name });
  if (error) throw typeError('INVALID_FIELD', error.message);
  return value;
};

const postValidation = ({ title, content, categoryIds }) => {
  const { error, value } = postSchema
    .validate({ title, content, categoryIds });
  if (error) throw typeError('INVALID_FIELD', error.message);
  return value;
};

module.exports = {
  authenticateToken,
  loginValidation,
  newUserValidation,
  categoryValidation,
  postValidation,
};
