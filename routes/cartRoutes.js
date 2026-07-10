// cart routes file
// all cart routes need login token (protected)

const express = require("express");
const router = express.Router();

const {
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");

// this checks token before allowing cart access
const verifyToken = require("../middleware/authMiddleware");

// POST /cart - add to cart (login required)
router.post("/", verifyToken, addToCart);

// PUT /cart/:id - update quantity (login required)
router.put("/:id", verifyToken, updateCartItem);

// DELETE /cart/:id - remove from cart (login required)
router.delete("/:id", verifyToken, removeFromCart);

module.exports = router;
