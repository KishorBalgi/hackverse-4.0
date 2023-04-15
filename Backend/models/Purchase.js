const mongoose = require("mongoose");
const error = require("../configs/error.codes.json");

const purchaseSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "400-buyerRequired"],
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: [true, "400-itemRequired"],
  },
  quantity: {
    type: Number,
    required: [true, error[400].quantityRequired],
  },
  price: {
    type: Number,
    required: [true, error[400].priceRequired],
  },
  dateOfPurchase: {
    type: Date,
    default: Date.now(),
  },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;
