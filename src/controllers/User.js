const { UserService } = require('../services');

const login = async (req, res, next) => {
  const userData = req.body;
  const response = await UserService.checkLogin(userData);
  if (!response.type) return res.status(200).json({ token: response.token });
  next(response);
};

const createUser = async (req, res, next) => {
  const userData = req.body;
  const { type, token, message } = await UserService.createUser(userData);
  if (!type) return res.status(201).json({ token });
  next({ type, message });
};

module.exports = {
  login,
  createUser,
};
