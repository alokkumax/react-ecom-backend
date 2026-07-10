// Import mongoose to create a schema for cart items
const mongoose = require("mongoose");

// This defines what a Cart item will look like in MongoDB
const cartSchema = new mongoose.Schema({
  // ID of the user who added this item to cart
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // ID of the product added to cart
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  // How many of this product the user wants
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

// Create and export the Cart model
// Collection name in MongoDB will be "carts"
module.exports = mongoose.model("Cart", cartSchema);
