const { mapError } = require('../utils/errorMap');

const errorHandler = (error, _req, res, _next) => {
  const statusCode = mapError(error.type);
  const message = error.message || 'Internal error';
  res.status(statusCode).json({ message });
};

module.exports = errorHandler;