const { UserService } = require('../services');

const login = async (req, res, next) => {
  const userData = req.body;
  const response = await UserService.checkLogin(userData);
  if (!response.type) return res.status(200).json({ token: response.token });
  next(response);
};

module.exports = {
  login,
};
