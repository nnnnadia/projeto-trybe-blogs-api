const newUserSchema = require('./validations/newUserSchema');

const newUserValidation = (req, _res, next) => {
  const newUser = {
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password,
    image: req.body.image,
  };
  const { error } = newUserSchema.validate(newUser);
  if (error) {
    next({ type: 'INVALID_FIELD', message: error.message });
  }
  next();
};

module.exports = newUserValidation;
