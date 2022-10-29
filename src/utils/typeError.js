const typeError = (type, message) => {
  const e = new Error(message);
  e.type = type;
  return e;
};

module.exports = typeError;