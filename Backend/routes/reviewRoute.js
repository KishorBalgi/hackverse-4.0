const express = require("express");
const Router = express.Router();
const reviewController = require("../controllers/reviewController.js");
const { checkUserAuth } = require("../middlewares/checkUserAuth.js");
// const { profilePictureUpload } = require("../middlewares/multer.middleware.js");

Router.post("/create", checkUserAuth, reviewController.createReview);
Router.get("/all", reviewController.getAllReviews);

module.exports = Router;
