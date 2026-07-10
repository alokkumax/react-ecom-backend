// this file has all cart related logic - add, update, delete

const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");

// add product to cart - POST /cart
const addToCart = async (req, res) => {
  try {
    // get data from postman request body
    const { userId, productId, quantity } = req.body;

    // check if user sent all required fields
    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        message: "Please provide userId, productId and quantity",
      });
    }

    // quantity should be at least 1
    if (quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    // check if userId is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // check if productId is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // check if product actually exists in database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // save new item in cart collection
    const cartItem = await Cart.create({
      userId,
      productId,
      quantity,
    });

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

// update cart quantity - PUT /cart/:id
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // check if cart id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid cart item ID" });
    }

    // quantity is required
    if (!quantity) {
      return res.status(400).json({ message: "Please provide quantity" });
    }

    // quantity should be greater than 0
    if (quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    // update the cart item in database
    const cartItem = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true } // return updated data
    );

    // if no cart item found with this id
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

// remove item from cart - DELETE /cart/:id
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    // check if cart id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid cart item ID" });
    }

    // delete from database
    const cartItem = await Cart.findByIdAndDelete(id);

    // if item not found
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
