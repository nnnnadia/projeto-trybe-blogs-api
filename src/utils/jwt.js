require('dotenv/config');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (userId) => jwt.sign({ userId }, secretKey, jwtConfig);

module.exports = {
  createToken,
};
