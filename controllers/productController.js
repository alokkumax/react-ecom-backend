// this file has all product related logic

const Product = require("../models/Product");
const mongoose = require("mongoose");

// get all products - GET /products
const getAllProducts = async (req, res) => {
  try {
    // get all products from database
    const products = await Product.find();

    // send back to user
    res.status(200).json(products);
  } catch (error) {
    // something went wrong
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// get one product by id - GET /products/:id
const getProductById = async (req, res) => {
  try {
    // get id from url
    const { id } = req.params;

    // check if id is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // find product in database
    const product = await Product.findById(id);

    // if product does not exist
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // send product back
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
