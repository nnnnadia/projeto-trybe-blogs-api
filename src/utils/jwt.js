require('dotenv/config');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (userId) => jwt.sign({ userId }, secretKey, jwtConfig);

const validateToken = (token) => jwt.verify(token, secretKey);

module.exports = {
  createToken,
  validateToken,
};
