const express = require("express");
const Router = express.Router();
const purchaseController = require("../controllers/purchaseController.js");
const { checkUserAuth } = require("../middlewares/checkUserAuth.js");
// const { profilePictureUpload } = require("../middlewares/multer.middleware.js");

Router.post("/create", checkUserAuth, purchaseController.createPurchase);

module.exports = Router;
