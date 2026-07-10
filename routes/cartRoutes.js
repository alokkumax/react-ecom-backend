// Import express router to create cart routes
const express = require("express");
const router = express.Router();

// Import cart controller functions
const {
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");

// Import JWT middleware to protect cart routes
const verifyToken = require("../middleware/authMiddleware");

// POST /cart - add product to cart (protected - login required)
router.post("/", verifyToken, addToCart);

// PUT /cart/:id - update cart item quantity (protected - login required)
router.put("/:id", verifyToken, updateCartItem);

// DELETE /cart/:id - remove item from cart (protected - login required)
router.delete("/:id", verifyToken, removeFromCart);

module.exports = router;
