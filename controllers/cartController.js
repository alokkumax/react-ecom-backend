// Import Cart and Product models
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Import mongoose to validate IDs
const mongoose = require("mongoose");

// POST /cart - Add a product to the cart
const addToCart = async (req, res) => {
  try {
    // Get data sent from client (Thunder Client / frontend)
    const { userId, productId, quantity } = req.body;

    // Validation: check if required fields are missing
    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        message: "Please provide userId, productId and quantity",
      });
    }

    // Validation: quantity must be greater than 0
    if (quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    // Validation: check if userId is a valid MongoDB id
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Validation: check if productId is a valid MongoDB id
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Validation: check if product exists in database before adding to cart
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create new cart item in MongoDB
    const cartItem = await Cart.create({
      userId,
      productId,
      quantity,
    });

    // Send success response with status 201 (Created)
    res.status(201).json({
      message: "Product added to cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// PUT /cart/:id - Update quantity of a cart item
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // Validation: check if cart item id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid cart item ID" });
    }

    // Validation: quantity field is required
    if (!quantity) {
      return res.status(400).json({ message: "Please provide quantity" });
    }

    // Validation: quantity must be greater than 0
    if (quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    // Update cart item and return the updated document
    const cartItem = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    // If cart item not found
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({
      message: "Cart updated successfully",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// DELETE /cart/:id - Remove a product from cart
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    // Validation: check if cart item id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid cart item ID" });
    }

    // Delete cart item from database
    const cartItem = await Cart.findByIdAndDelete(id);

    // If cart item not found
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  updateCartItem,
  removeFromCart,
};
