const multer = require("multer");
const fileUploadConfig = require("../configs/fileUpload.config.json");
const upload = multer({
  limits: {
    fileSize: 1e8,
  },
});
const storage = multer.memoryStorage();

// Profile picture upload:
const profilePictureUpload = multer({
  //   dest: "uploads/profilePictures",
  storage,
  ...fileUploadConfig["profile-picture"],
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image of type jpg, jpeg or png"));
    }
    cb(undefined, true);
  },
});

module.exports = { upload, profilePictureUpload };
