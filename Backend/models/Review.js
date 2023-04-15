const mongoose = require("mongoose");
const error = require("../configs/error.codes.json");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, error[400].reviewRequired],
    trim: true,
  },
  forSeller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  forItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  upvote: {
    type: Boolean,
    default: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
