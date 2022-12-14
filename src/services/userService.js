const { User: userModel } = require('../models');
const jwtUtil = require('../utils/jwt');
const typeError = require('../utils/typeError');

const findUserEmail = (email) => userModel.findOne({ where: { email } });

const checkLogin = async ({ email, password }) => {
  try {
    const user = await findUserEmail(email);
    if (!user || user.password !== password) throw typeError('INVALID_FIELD', 'Invalid fields');
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
    if (alreadyRegistered) throw typeError('CONFLICTED_DATA', 'User already registered');
    const user = await userModel
      .create({ displayName, email, password, image });
    const token = jwtUtil.createToken(user.id);
    return token;
  } catch (error) {
    if (error.type) throw error;
    throw new Error();
  }
};

const getAllUsers = async () => {
  try {
    const rawData = await userModel.findAll();
    const users = rawData
      .map(({ dataValues }) => dataValues);
    const usersWithoutPassword = users
      .map(({ password, ...userWithoutPassword }) => userWithoutPassword);
    return usersWithoutPassword;
  } catch (_error) {
    throw new Error();
  }
};

const getUserById = async (id) => {
  try {
    const rawData = await userModel.findOne({ where: { id } });
    if (!rawData) throw typeError('NOT_FOUND', 'User does not exist');
    const { password, ...userWithoutPassword } = rawData.dataValues;
    return userWithoutPassword;
  } catch (error) {
    if (error.type) throw error;
    throw new Error();
  }
};

const deleteUser = async (token) => {
  try {
    const { userId } = jwtUtil.retrieveTokenData(token);
    await userModel.destroy({ where: { id: userId } });
  } catch (_error) {
    throw new Error();
  }
};

module.exports = {
  checkLogin,
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
