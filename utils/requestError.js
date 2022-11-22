const requestError = (status, message, name='Error') => {
  const error = new Error(message);
  error.name = name;
  error.status = status;
  return error;
};

module.exports = requestError;
