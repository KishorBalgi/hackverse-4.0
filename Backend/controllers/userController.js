const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const error = require("../configs/error.codes.json");
const AppError = require("../utils/appError");
const Response = require("../utils/standardResponse");
// const { Email } = require("../utils/utils");

// Update user profile controller:
module.exports.updateProfile = catchAsync(async (req, res, next) => {
  const { name, phone } = req.body;

  if (!name && !phone) {
    return next(new AppError(400, "No data", error[400].dataRequired));
  }

  const user = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, phone },
    { new: true, runValidators: true }
  );

  //   If user changes phone number:
  if (phone && phone != req.user.phone) {
    user.phone_verified = false;
    await user.save();
  }

  res
    .status(200)
    .json(Response(null, "User profile updated successfully", { user }));
});

// Update user profile pciture controller:
module.exports.updateProfilePicture = catchAsync(async (req, res, next) => {
  console.log(req.file);
  const { file } = req;

  if (!file) {
    return next(new AppError(400, "No data", error[400].dataRequired));
  }
  console.log(req.file);

  const user = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { photo: file.buffer },
    { new: true, runValidators: true }
  );

  res
    .status(200)
    .json(Response(null, "Profile picture updated successfully", { user }));
});

// Update user password controller:
module.exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(new AppError(400, "No data", error[400].dataRequired));
  }

  if (newPassword !== confirmPassword) {
    return next(
      new AppError(
        400,
        "Passwords do not match",
        error[400].passwordsDoNotMatch
      )
    );
  }

  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.checkPassword(currentPassword))) {
    return next(
      new AppError(403, "Invalid password", error[400].invalidCredentials)
    );
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json(Response(null, "Password updated successfully"));
});
