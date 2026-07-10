// Import mongoose to create a schema for products
const mongoose = require("mongoose");

// This defines what a Product document will look like in MongoDB
const productSchema = new mongoose.Schema({
  // Name of the product (example: "iPhone 15")
  name: {
    type: String,
    required: true,
  },

  // Price of the product
  price: {
    type: Number,
    required: true,
  },

  // Short details about the product
  description: {
    type: String,
    required: true,
  },

  // How many items are available in stock
  stock: {
    type: Number,
    required: true,
  },

  // Image URL of the product
  image: {
    type: String,
    required: true,
  },
});

// Create and export the Product model
// Collection name in MongoDB will be "products"
module.exports = mongoose.model("Product", productSchema);
