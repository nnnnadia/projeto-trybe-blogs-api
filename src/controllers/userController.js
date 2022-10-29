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

const getAllUsers = async (req, res) => {
  const tokenJWT = req.headers.authorization;
  authService.authenticateToken(tokenJWT);
  const users = await userService.getAllUsers();
  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const tokenJWT = req.headers.authorization;
  authService.authenticateToken(tokenJWT);
  const { id } = req.params;
  const user = await userService.getUserById(id);
  res.status(200).json(user);
};

module.exports = {
  login,
  createUser,
  getAllUsers,
  getUserById,
};
