const { User } = require('../models');

const checkLogin = async ({ email, password }) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return { type: 'INVALID_FIELD', message: 'Invalid fields' };
    }
    return ({
      type: undefined,
      token: 'adasda',
    });
  } catch (error) {
    return { type: 'INTERNAL_ERROR', message: 'Internal error' };
  }
};

module.exports = {
  checkLogin,
};