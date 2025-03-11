exports.errorHandler = (err, res) => {
  if (!res) {
    console.error("Response object is undefined:", err); // Debugging log
    return;
  }

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

exports.responseMessage = (res, statusCode, data1, message, success) => {
  if (!res) {
    console.error("Response object is undefined");
    return;
  }

  res.status(statusCode).json({
    success,
    message,
    data: data1,
  });
};
