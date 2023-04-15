const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const error = require("../configs/error.codes.json");
const AppError = require("../utils/appError");
const Response = require("../utils/standardResponse");
const ticketConfig = require("../configs/ticket.config.json");
// const { Email, signJWTToken, verifyJWTToken } = require("../utils/utils");
const { signJWTToken, verifyJWTToken } = require("../utils/utils");

// Sign a JWT token and send it to the client:

const sendResponseWithJWTCookie = (req, res, next) => {
  const token = signJWTToken({ id: req.user._id });
  const { status, message, data } = res.locals.resData;
  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("jwt", token, cookieOptions);
  return res.status(status).json(Response(null, message, data));
};

// Signup POST controller:
module.exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  if (!name)
    return next(
      new AppError(400, "User name is required", error[400].nameRequired)
    );
  if (!email)
    return next(
      new AppError(400, "User E-mail is required", error[400].emailRequired)
    );
  if (!password)
    return next(
      new AppError(400, "Password is required", error[400].passwordRequired)
    );

  const user = await User.create({
    name,
    email,
    password,
    phone,
  });

  // Remove password from output:
  user.password = undefined;

  req = { user };
  res.locals.resData = {
    status: 201,
    message: "User created successfully",
    data: { user },
  };

  // Send welcome email:
  // const emailMessage = `Hello ${user.name},\n\nWelcome to the app. Hope you enjoy using it.\n\nRegards,\nKishor Balgi`;
  // const emailHtml = `<h1>Hello ${user.name},</h1><p>Welcome to the app. Hope you enjoy using it.</p><p>Regards,<br>Kishor Balgi</p>`;
  // const mailer = new Email(user);
  // await mailer.sendCustomMail("Welcome to the app", emailMessage, emailHtml);

  sendResponseWithJWTCookie(req, res, next);
});

// Login POST controller:
module.exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email)
    return next(
      new AppError(400, "User E-mail is required", error[400].emailRequired)
    );
  if (!password) {
    return next(
      new AppError(400, "Password is required", error[400].passwordRequired)
    );
  }

  const user = await User.findOne({ email }).select("+password");

  // Check if user exists and password is correct:
  if (!user || !(await user.checkPassword(password))) {
    return next(
      new AppError(
        400,
        "Invalid E-mail or password",
        error[400].invalidCredentials
      )
    );
  }
  // Set last login time:
  user._profile_info.last_login_at = Date.now();
  await user.save({ validateBeforeSave: false });
  // Remove password from output:
  user.password = undefined;

  req = { user };
  res.locals.resData = {
    status: 200,
    message: "User logged in successfully",
    data: { user },
  };

  sendResponseWithJWTCookie(req, res, next);
});

// Check if user is logged in:
module.exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (!req.cookies.jwt)
    return res.status(200).json(Response(null, "Logged out"));

  const decoded = verifyJWTToken(req.cookies.jwt);

  if (!decoded) return res.status(200).json(Response(null, "Logged out"));

  const user = await User.findById(decoded.id);
  if (!user) return res.status(200).json(Response(null, "Logged out"));

  // Set last login time:
  user._profile_info.last_login_at = Date.now();
  await user.save({ validateBeforeSave: false });

  res.status(200).json(Response(null, "Logged in", { user }));
});

// Logout GET controller:
module.exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json(Response(null, "User logged out successfully"));
});
