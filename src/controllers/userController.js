const { userService, authService } = require('../services');

const login = async (req, res, next) => {
  const { email, password } = authService.loginValidation(req.body);
  const { type, token, message } = await userService.checkLogin({ email, password });
  if (!type) return res.status(200).json({ token });
  next({ type, message });
};

const createUser = async (req, res, next) => {
  const userData = req.body;
  const { type, token, message } = await userService.createUser(userData);
  if (!type) return res.status(201).json({ token });
  next({ type, message });
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
