const User = require("../models/User");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const error = require("../configs/error.codes.json");
const AppError = require("../utils/appError");

module.exports.checkUserAuth = catchAsync(async (req, res, next) => {
  if (!req.cookies.jwt)
    return next(new AppError(403, "Unauthorized", error[401].unauthorized));

  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

  if (!decoded)
    return next(
      new AppError(
        401,
        "Invalid token or token expired",
        error[401].invalidToken
      )
    );
  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError(
        401,
        "Invalid token or token expired",
        error[401].invalidToken
      )
    );
  req.user = user;
  next();
});
