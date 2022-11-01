require('dotenv/config');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (userId) => jwt.sign({ userId }, secretKey, jwtConfig);

const validateToken = (token) => jwt.verify(token, secretKey);

const retrieveTokenData = (token) => jwt.decode(token);

module.exports = {
  createToken,
  validateToken,
  retrieveTokenData,
};
