const express = require("express");
const Router = express.Router();
const authController = require("../controllers/authController.js");
const { checkUserAuth } = require("../middlewares/checkUserAuth.js");

Router.post("/signup", authController.signup);
Router.post("/login", authController.login);
Router.get("/logout", authController.logout);
Router.get("/isLoggedIn", authController.isLoggedIn);
Router.get("/sendOTP", authController.sendVerificationOTP);
Router.get("/verifyOTP", authController.verifyVerificationOTP);

module.exports = Router;
