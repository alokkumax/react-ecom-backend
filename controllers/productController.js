// Import Product model to fetch data from MongoDB
const Product = require("../models/Product");

// Import mongoose to check if ID is valid
const mongoose = require("mongoose");

// GET /products - Get all products from database
const getAllProducts = async (req, res) => {
  try {
    // Find all products in the products collection
    const products = await Product.find();

    // Send products as JSON response with status 200 (OK)
    res.status(200).json(products);
  } catch (error) {
    // If something goes wrong on the server, send status 500
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// GET /products/:id - Get one product by its ID
const getProductById = async (req, res) => {
  try {
    // Get product id from URL (example: /products/64abc123...)
    const { id } = req.params;

    // Check if the id format is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Find product using the id
    const product = await Product.findById(id);

    // If no product found with this id
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send the product with status 200 (OK)
    res.status(200).json(product);
  } catch (error) {
    // Server side error
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
