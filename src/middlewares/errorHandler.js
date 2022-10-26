const { mapError } = require('../utils/errorMap');

const errorHandler = ({ type, message }, _req, res, _next) => {
  const statusCode = mapError(type);
  res.status(statusCode).json({ message });
};

module.exports = errorHandler;