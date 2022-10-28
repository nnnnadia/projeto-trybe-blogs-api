const { loginSchema } = require('./validations/loginSchema');

const loginValidation = (req, _res, next) => {
  const loginFields = {
    email: req.body.email,
    password: req.body.password,
  };
  const { error } = loginSchema.validate(loginFields);
  if (error) next({ type: 'MISSING_FIELD', message: 'Some required fields are missing' });
  next();
};

module.exports = loginValidation;
