const User = require("../models/User");
const Ticket = require("../models/Ticket");
const catchAsync = require("../utils/catchAsync");
const error = require("../configs/error.codes.json");
const AppError = require("../utils/appError");
const crypto = require("crypto");
const Response = require("../utils/standardResponse");
const ticketConfig = require("../configs/ticket.config.json");
const { verifyJWTToken } = require("../utils/utils");

// Email verification controllers:

// Request email verification:

module.exports.requestEmailVerification = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email)
    return next(
      new AppError(400, "User E-mail is required", error[400].emailRequired)
    );

  const user = await User.findOne({ email });
  if (!user)
    return next(new AppError(404, "User not found", error[404].userNotFound));

  const status = await user.createTicket(
    ticketConfig.ticket_purpose.EMAIL_VERIFICATION
  );

  if (status === 0)
    return next(
      new AppError(
        400,
        "Email already verified",
        error[400].emailAlreadyVerified
      )
    );
  else if (status === 1)
    return next(
      new AppError(
        400,
        "Verification email already sent",
        error[400].verificationEmailAlreadySent
      )
    );
  else if (status === 2)
    return next(
      new AppError(500, "Error creating ticket", error[500].internalServerError)
    );

  return res
    .status(200)
    .json(Response(null, "Verification email sent successfully"));
});

// Verify email:

module.exports.verifyEmail = catchAsync(async (req, res, next) => {
  const { token } = req.query;

  if (!token)
    return next(
      new AppError(400, "Token is required", error[400].tokenRequired)
    );

  const decoded = verifyJWTToken(token);
  if (!decoded)
    return next(new AppError(401, "Invalid token", error[401].invalidToken));

  const user = await User.findById(decoded.user);
  const ticket = await Ticket.findOne({
    user: decoded.user,
    purpose: decoded.purpose,
  });
  if (!user)
    return next(new AppError(404, "User not found", error[404].userNotFound));

  if (!ticket)
    return next(
      new AppError(404, "Ticket not found", error[404].ticketNotFound)
    );

  user.email_verified = true;
  await user.save();

  await Ticket.findByIdAndDelete(ticket._id);

  return res.status(200).json(Response(null, "Email verified successfully"));
});

// Forgot password controllers:

// Request forgot password:
module.exports.requestPasswordReset = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email)
    return next(
      new AppError(400, "User E-mail is required", error[400].emailRequired)
    );

  const user = await User.findOne({ email });
  if (!user)
    return next(new AppError(404, "User not found", error[404].userNotFound));

  const status = await user.createTicket(
    ticketConfig.ticket_purpose.FORGOT_PASSWORD
  );

  if (status === 1)
    return next(
      new AppError(
        400,
        "Password reset email already sent",
        error[400].passwordResetEmailAlreadySent
      )
    );
  else if (status === 2)
    return next(
      new AppError(500, "Error creating ticket", error[500].internalServerError)
    );

  return res.status(200).json(Response(null, "Password reset email sent"));
});

// Reset password:
module.exports.resetPassword = catchAsync(async (req, res, next) => {
  const { key } = req.query;

  // Check if key is present:
  if (!key)
    return next(new AppError(400, "Key is required", error[400].tokenRequired));

  // Find ticket with hashed key:
  const hashedKey = crypto.createHash("SHA256").update(key).digest("hex");
  const ticket = await Ticket.findOne({ token: hashedKey });
  if (!ticket)
    return next(
      new AppError(404, "Ticket not found", error[404].ticketNotFound)
    );
  // Get user:
  const user = await User.findById(ticket.user);

  // Check if user exists:
  if (!user)
    return next(new AppError(404, "User not found", error[404].userNotFound));

  // Check if password is present:
  if (!req.body.password || !req.body.confirmPassword)
    return next(
      new AppError(400, "Password is required", error[400].passwordRequired)
    );

  // Check if password and confirm password match:
  if (req.body.password !== req.body.confirmPassword)
    return next(
      new AppError(
        400,
        "Password and confirm password do not match",
        error[400].passwordsDoNotMatch
      )
    );

  // Set new password:
  user.password = req.body.password;
  await user.save();

  // Delete ticket:
  await Ticket.deleteOne({ _id: ticket._id });

  return res.status(200).json(Response(null, "Password reset successfully"));
});
