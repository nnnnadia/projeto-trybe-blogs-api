const { User } = require('../models');
const jwtUtil = require('../utils/jwt');

const findUserEmail = (email) => User.findOne({ where: { email } });

const checkLogin = async ({ email, password }) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return { type: 'INVALID_FIELD', message: 'Invalid fields' };
    }
    return ({
      type: undefined,
      token: jwtUtil.createToken(user.id),
    });
  } catch (_error) {
    return { type: 'INTERNAL_ERROR', message: 'Internal error' };
  }
};

const createUser = async ({ displayName, email, password, image }) => {
  try {
    const alreadyRegistered = await findUserEmail(email);
    if (alreadyRegistered) return { type: 'CONFLICTED_DATA', message: 'User already registered' };
    const user = await User
      .create({ displayName, email, password, image });
    return ({
      type: undefined,
      token: jwtUtil.createToken(user.id),
    });
  } catch (error) {
    return { type: 'INTERNAL_ERROR', message: 'Internal error' };
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return ({
      type: undefined,
      users,
    });
  } catch (error) {
    return { type: 'INTERNAL_ERROR', message: 'Internal error' };
  }
};

module.exports = {
  checkLogin,
  createUser,
  getAllUsers,
};
