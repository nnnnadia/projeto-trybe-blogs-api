const { userService, authService } = require('../services');

const login = async (req, res) => {
  const { email, password } = authService.loginValidation(req.body);
  const token = await userService.checkLogin({ email, password });
  res.status(200).json({ token });
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = authService
    .newUserValidation(req.body);
  const token = await userService
    .createUser({ displayName, email, password, image });
  res.status(201).json({ token });
};

const getAllUsers = async (req, res, next) => {
  const { type, users, message } = await userService.getAllUsers();
  if (!type) return res.status(200).json(users);
  next({ type, message });
};

module.exports = {
  login,
  createUser,
  getAllUsers,
};
