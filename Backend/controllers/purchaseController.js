// const User = require("../models/User");
// const Review = require("../models/Review");
const Purchase = require("../models/Purchase");
const Item = require("../models/Item");
const catchAsync = require("../utils/catchAsync");
const error = require("../configs/error.codes.json");
const AppError = require("../utils/appError");
const Response = require("../utils/standardResponse");

// Create a item controller:
module.exports.createPurchase = catchAsync(async (req, res, next) => {
  const { item, quantity } = req.body;

  if (!item || !quantity) {
    return next(new AppError(400, "No data", error[400].dataRequired));
  }

  if (req.user._id == item.seller)
    return next(
      new AppError(400, "No data", "You cannot buy your own product")
    );

  const cartItem = await Item.findById(item);
  if (!cartItem) {
    return next(new AppError(400, "No data", error[400].dataRequired));
  }
  cartItem.quantity = cartItem.quantity - parseInt(quantity);

  if (cartItem.quantity < 0)
    return next(new AppError(400, "No data", "Not enough quantity in stock"));

  const price = cartItem.price * quantity;
  const purchase = await Purchase.create({
    item,
    quantity,
    price,
    buyer: req.user._id,
  });

  await cartItem.save();
  return res
    .status(201)
    .json(Response(null, "Purchase created successfully", { purchase }));
});
