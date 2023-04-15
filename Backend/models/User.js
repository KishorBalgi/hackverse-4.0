const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { isEmail } = require("validator");
const error = require("../configs/error.codes.json");
const ticketConfig = require("../configs/ticket.config.json");
const { Email, signJWTToken } = require("../utils/utils");
const Ticket = require("./Ticket");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, error[400].nameRequired],
    trim: true,
  },
  email: {
    type: String,
    required: [true, error[400].emailRequired],
    trim: true,
    unique: [true, error[400].emailAlreadyInUse],
    validate: [isEmail, error[400].emailInvalid],
  },
  password: {
    type: String,
    required: [true, error[400].passwordRequired],
    minlength: [8, error[400].passwordMinLength],
    maxlength: [32, error[400].passwordMaxLength],
    select: false,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  phone: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  phone_verified: {
    type: Boolean,
    default: false,
  },
  _profile_info: {
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    password_updated_at: {
      type: Date,
      default: Date.now,
    },
    last_login_at: {
      type: Date,
      default: Date.now,
    },
  },
});

userSchema.pre("save", function (next) {
  // Update the updated_at field:
  this._profile_info.updated_at = Date.now();
  // Hash the password:
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 12);
    this._profile_info.password_updated_at = Date.now();
  }
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Methods:
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createTicket = async function (purpose) {
  // Check if the purpose is valid:
  if (!Object.values(ticketConfig.ticket_purpose).includes(purpose))
    throw new Error(error[500].internalServerError);

  // Check if the user's email is verified in case of email verification:
  if (purpose === "Email_Verification" && this.email_verified) return 0;

  //Check if the ticket is already created:
  const ticket = await Ticket.findOne({
    user: this._id,
    purpose,
  });

  if (ticket) return 1;

  // Create a new ticket:
  const newTicket = await Ticket({
    user: this._id,
    purpose,
  });
  if (!newTicket) return 2;

  // Send the email:
  const mailer = new Email(this);
  if (purpose === "Email_Verification") {
    newTicket.token = signJWTToken({ user: this._id, purpose });
    await newTicket.save();
    await mailer.sendCustomMail(
      "Email Verification",
      "This is a email verification email",
      `<a href='http://localhost:3000/api/verify/email/?token=${newTicket.token}">Click here to verify your email</a>`
    );
    return 3;
  } else if (purpose === "Forgot_Password") {
    const key = crypto.randomBytes(32).toString("hex");
    newTicket.token = crypto.createHash("SHA256").update(key).digest("hex");
    await newTicket.save();
    await mailer.sendCustomMail(
      "Password Reset",
      "This is a password reset email",
      `<a href='http://localhost:3000/api/verify/resetPassword/?key=${key}">Click here to reset your password</a>`
    );
    return 3;
  }
  return 2;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
