const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const error = require("../configs/error.codes.json");
const AppError = require("../utils/appError");
const Response = require("../utils/standardResponse");
const ticketConfig = require("../configs/ticket.config.json");
// const { Email, signJWTToken, verifyJWTToken } = require("../utils/utils");
const { signJWTToken, verifyJWTToken } = require("../utils/utils");
// Twilio client for sending SMS:
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

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
  const { name, phone, password } = req.body;

  if (!name)
    return next(
      new AppError(400, "User name is required", error[400].nameRequired)
    );
  if (!phone)
    return next(
      new AppError(400, "User phone is required", error[400].phoneRequired)
    );
  if (!password)
    return next(
      new AppError(400, "Password is required", error[400].passwordRequired)
    );

  const user = await User.create({
    name,
    phone,
    password,
  });

  // Remove password from output:
  user.password = undefined;

  req = { user };
  res.locals.resData = {
    status: 201,
    message: "User created successfully",
    data: { user },
  };

  sendResponseWithJWTCookie(req, res, next);
});

// Login POST controller:
module.exports.login = catchAsync(async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone)
    return next(
      new AppError(400, "User phone is required", error[400].phoneRequired)
    );
  if (!password) {
    return next(
      new AppError(400, "Password is required", error[400].passwordRequired)
    );
  }

  const user = await User.findOne({ phone }).select("+password");

  if (user && user.phone_verified === false) {
    return next(
      new AppError(400, "Phone not verified", error[400].phoneNotVerified)
    );
  }

  // Check if user exists and password is correct:
  if (!user || !(await user.checkPassword(password))) {
    return next(
      new AppError(
        400,
        "Invalid Phone or password",
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
// Send a verification OTP:
module.exports.sendVerificationOTP = catchAsync(async (req, res, next) => {
  client.verify.v2
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({ to: `+91${req.query.phone}`, channel: "sms" })
    .then((verification) => {
      res
        .status(200)
        .json(Response(null, "OTP sent successfully", { verification }));
    });
});

// Verify a verification OTP:
module.exports.verifyVerificationOTP = catchAsync(async (req, res, next) => {
  client.verify.v2
    .services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks.create({
      to: `+91${req.query.phone}`,
      code: req.query.code,
    })
    .then(async (verification_check) => {
      if (verification_check.status === "approved") {
        const user = await User.findOneAndUpdate(
          { phone: req.query.phone },
          {
            $set: {
              phone_verified: true,
            },
          }
        );
        console.log(user);
        res
          .status(200)
          .json(
            Response(null, "OTP verified successfully", { verification_check })
          );
      } else
        res
          .status(400)
          .json(
            Response(
              null,
              "OTP verification failed",
              { verification_check },
              "OTP verification failed"
            )
          );
    });
});
