// this file defines how a cart item looks in the database

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  // which user added this item
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // which product was added
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  // how many quantity user wants
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

// saves data in "carts" collection in mongodb
module.exports = mongoose.model("Cart", cartSchema);
