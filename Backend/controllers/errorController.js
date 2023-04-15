const AppError = require("../utils/appError");
const Response = require("../utils/standardResponse");
const errorCodes = require("../configs/error.codes.json");
const fileUploadConfig = require("../configs/fileUpload.config.json");

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else {
    return res.status(err.status).render("error", {
      title: "Something went wrong",
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.status).json(Response(err.type, err.message));
    } else {
      // console.error("ERROR", err);
      return res
        .status(500)
        .json(Response(errorCodes[500].internalServerError));
    }
  } else {
    if (err.isOperational) {
      return res.status(err.status).json(Response(err.type, err.message));
    } else {
      console.error("ERROR", err);
      return res
        .status(err.status)
        .json(Response(errorCodes[500].internalServerError));
    }
  }
};

// DB errors:
const handleCastErrorDB = (err) => {
  console.log(err);
  const message = `Invalid ${err.path}: ${err.value}`;
  const type = errorCodes[400].castError;
  return new AppError(400, message, type);
};

const handleDuplicateFieldDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  let message = "Duplicate field value entered";
  let type = errorCodes[403].duplicateError;
  if (field === "email") {
    message = "Email already in use";
    type = errorCodes[403].emailAlreadyInUse;
  }
  return new AppError(403, message, type);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).find((e) => e.properties).message;
  let message = `Invalid input data ${errors.slice(4)}`;
  let type = errors;
  return new AppError(400, message, type);
};

// Multer Errors:

const handleMulterError = (err) => {
  console.log(err);
  let message = "File Upload error";
  let type = errorCodes[400].fileUploadError;
  if (err.field === "profile-picture") {
    message = err.message + " for profile picture";
    type = errorCodes[400].fileSizeExceeded;
  }
  return new AppError(400, message, type);
};

// JWT errors:

const handleJWTError = () =>
  new AppError(401, "Invalid token", errorCodes[401].invalidToken);

const handleJWTExpiredError = () =>
  new AppError(401, "Token expired", errorCodes[401].tokenExpired);

module.exports.globalErrorHandler = (err, req, res, next) => {
  //   console.log(err);
  err.status = err.status || 500;
  err.message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    console.log("Development Error");
    sendErrorDev(err, req, res);
  } else {
    console.log("Production Error");
    console.log(err);
    let error = { ...err };
    error.name = err.name;
    error.message = err.message;
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "MulterError") error = handleMulterError(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(error, req, res);
  }
};
