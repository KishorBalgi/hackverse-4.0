const User = require("../models/User");
const Item = require("../models/Item");
const Purchase = require("../models/Purchase");
const Review = require("../models/Review");
const catchAsync = require("../utils/catchAsync");
const error = require("../configs/error.codes.json");
const AppError = require("../utils/appError");
const Response = require("../utils/standardResponse");

// Create a item controller:
module.exports.createReview = catchAsync(async (req, res, next) => {
  const { review, forSeller, forItem, upvote } = req.body;

  if (!review || !forSeller || !forItem) {
    return next(new AppError(400, "No data", error[400].dataRequired));
  }

  if (req.user._id == forSeller)
    return next(
      new AppError(
        400,
        "You can not add a review for yourself",
        error[403].forbidden
      )
    );

  const findReview = await Review.findOne({
    forSeller,
    forItem,
    from: req.user._id,
  });
  if (findReview) {
    return next(
      new AppError(
        400,
        "You have already added a review for this seller and item",
        error[403].forbidden
      )
    );
  }

  const findPurchase = await Purchase.findOne({
    item: forItem,
    buyer: req.user._id,
  });

  if (!findPurchase) {
    return next(
      new AppError(
        400,
        "You have not purchased this item, so you cannot add a review",
        error[403].forbidden
      )
    );
  }

  const reviewItem = await Review.create({
    review,
    forSeller,
    forItem,
    from: req.user._id,
    upvote,
  });

  const user = await User.findById(forSeller);
  user.reviews.push(reviewItem._id);
  if (upvote) user.upvotes = user.upvotes + 1;
  else user.downvotes = user.downvotes + 1;

  //   Reward the user:
  user.coins = user.coins + 0.2;
  await user.save();

  res
    .status(201)
    .json(Response(null, "Review created successfully", { reviewItem }));
});

// Get all items with filter controller:
module.exports.getAllReviews = catchAsync(async (req, res, next) => {
  const items = await Review.find();

  res
    .status(200)
    .json(Response(null, "Review fetched successfully", { items }));
});
