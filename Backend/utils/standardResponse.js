module.exports = (error, message = null, data = {}) => {
  const response = {
    success: !error,
    data,
  };
  if (error) {
    response.error = {
      code: error.slice(0, 3),
      type: error.slice(4),
      message,
    };
  } else {
    response.message = message;
  }
  return response;
};
