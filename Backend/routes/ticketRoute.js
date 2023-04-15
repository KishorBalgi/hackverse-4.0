const express = require("express");
const Router = express.Router();
const ticketController = require("../controllers/ticketController.js");
// const { checkUserAuth } = require("../middlewares/checkUserAuth.js");

// Email verification:
Router.post(
  "/requestEmailVerification",
  ticketController.requestEmailVerification
);
Router.get("/email", ticketController.verifyEmail);

// Forgot password:
Router.post("/requestPasswordReset", ticketController.requestPasswordReset);
Router.post("/resetPassword", ticketController.resetPassword);

module.exports = Router;
