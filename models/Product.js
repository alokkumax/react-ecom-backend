// this file defines how a product looks in the database

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // product name like "iPhone 15"
  name: {
    type: String,
    required: true,
  },

  // price of product
  price: {
    type: Number,
    required: true,
  },

  // small description about product
  description: {
    type: String,
    required: true,
  },

  // how many items left in stock
  stock: {
    type: Number,
    required: true,
  },

  // link of product image
  image: {
    type: String,
    required: true,
  },
});

// saves data in "products" collection in mongodb
module.exports = mongoose.model("Product", productSchema);
