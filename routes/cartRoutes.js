// Import express router to create cart routes
const express = require("express");
const router = express.Router();

// Import cart controller functions
const {
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");

// POST /cart - add product to cart
router.post("/", addToCart);

// PUT /cart/:id - update cart item quantity
router.put("/:id", updateCartItem);

// DELETE /cart/:id - remove item from cart
router.delete("/:id", removeFromCart);

module.exports = router;
