const mongoose = require("mongoose");
const error = require("../configs/error.codes.json");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, error[400].titleRequired],
    trim: true,
  },
  description: {
    type: String,
    required: [true, error[400].descriptionRequired],
    trim: true,
  },
  cartItem: {
    type: String,
    enum: ["tomato", "potato", "wheat", "paddy"],
    default: "tomato",
  },
  price: {
    type: Number,
    required: [true, error[400].priceRequired],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, error[400].quantityRequired],
    trim: true,
  },
  dateOfHarvest: {
    type: String,
    required: [true, error[400].dateOfHarvestRequired],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, error[400].sellerRequired],
  },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
