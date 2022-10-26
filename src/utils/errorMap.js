const errorMap = {
  INVALID_FIELD: 400,
  MISSING_FIELD: 400,
  INTERNAL_ERROR: 500,
};

const mapError = (errorType) => errorMap[errorType] || 500;

module.exports = { mapError, errorMap };
