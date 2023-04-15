const express = require("express");
const Router = express.Router();
const itemController = require("../controllers/itemController.js");
const { checkUserAuth } = require("../middlewares/checkUserAuth.js");
// const { profilePictureUpload } = require("../middlewares/multer.middleware.js");

Router.post("/create", checkUserAuth, itemController.createItem);
Router.get("/all", itemController.getAllItems);

module.exports = Router;
