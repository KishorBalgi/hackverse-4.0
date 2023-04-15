const User = require("../models/User");
const Item = require("../models/Item");
const catchAsync = require("../utils/catchAsync");
const error = require("../configs/error.codes.json");
const AppError = require("../utils/appError");
const Response = require("../utils/standardResponse");

// Create a item controller:
module.exports.createItem = catchAsync(async (req, res, next) => {
  const { title, description, cartItem, price, quantity, dateOfHarvest } =
    req.body;

  if (
    !title ||
    !description ||
    !cartItem ||
    !price ||
    !quantity ||
    !dateOfHarvest
  ) {
    return next(new AppError(400, "No data", error[400].dataRequired));
  }

  const item = await Item.create({
    title,
    description,
    cartItem,
    price,
    quantity,
    dateOfHarvest,
    seller: req.user._id,
  });

  res.status(201).json(Response(null, "Item created successfully", { item }));
});

// Get all items with filter controller:
module.exports.getAllItems = catchAsync(async (req, res, next) => {
  const { cartItem, price, quantity, dateOfHarvest } = req.query;

  const filter = {};

  if (cartItem) filter.cartItem = cartItem;
  if (price)
    filter.price = {
      $gte: parseFloat(price),
    };

  if (quantity)
    filter.quantity = {
      $gte: parseInt(quantity),
    };
  if (dateOfHarvest)
    filter.dateOfHarvest = {
      $gte: dateOfHarvest,
    };
  // Match the query and also populate the seller field with the user data
  const aggregate = [
    {
      $match: filter,
    },
    {
      $lookup: {
        from: "users",
        localField: "seller",
        foreignField: "_id",
        as: "seller",
      },
    },
  ];

  const items = await Item.aggregate(aggregate);

  res.status(200).json(Response(null, "Items fetched successfully", { items }));
});

// Delete item controller:
// module.exports.deleteItem = catchAsync(async (req, res, next) => {

// });
