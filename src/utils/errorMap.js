const errorMap = {
  INVALID_FIELD: 400,
  MISSING_FIELD: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICTED_DATA: 409,
  INTERNAL_ERROR: 500,
};

const mapError = (errorType) => errorMap[errorType] || 500;

module.exports = { mapError, errorMap };
