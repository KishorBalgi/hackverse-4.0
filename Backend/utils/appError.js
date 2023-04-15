class AppError extends Error {
  constructor(status, message, type) {
    super(message);
    this.status = status || 500;
    this.type = type || "500-internalServerError";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
