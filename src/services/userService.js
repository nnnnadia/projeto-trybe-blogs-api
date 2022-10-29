const { User: userModel } = require('../models');
const jwtUtil = require('../utils/jwt');

const findUserEmail = (email) => userModel.findOne({ where: { email } });

const checkLogin = async ({ email, password }) => {
  try {
    const user = await findUserEmail(email);
    if (!user || user.password !== password) {
      const e = new Error('Invalid fields');
      e.type = 'INVALID_FIELD';
      throw e;
    }
    const token = jwtUtil.createToken(user.id);
    return token;
  } catch (error) {
    if (error.type) throw error;
    throw new Error();
  }
};

const createUser = async ({ displayName, email, password, image }) => {
  try {
    const alreadyRegistered = await findUserEmail(email);
    if (alreadyRegistered) return { type: 'CONFLICTED_DATA', message: 'User already registered' };
    const user = await userModel
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
    const users = await userModel.findAll();
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
