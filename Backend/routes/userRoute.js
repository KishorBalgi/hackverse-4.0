const express = require("express");
const Router = express.Router();
const userController = require("../controllers/userController.js");
const { checkUserAuth } = require("../middlewares/checkUserAuth.js");
// const { profilePictureUpload } = require("../middlewares/multer.middleware.js");

Router.post("/update/profile", checkUserAuth, userController.updateProfile);
Router.post("/update/password", checkUserAuth, userController.updatePassword);
// Router.post(
//   "/update/profilePicture",
//   checkUserAuth,
//   profilePictureUpload.single("profile-picture"),
//   userController.updateProfilePicture
// );

module.exports = Router;
