// Import express router to create product routes
const express = require("express");
const router = express.Router();

// Import product controller functions
const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");

// GET /products - fetch all products
router.get("/", getAllProducts);

// GET /products/:id - fetch single product by id
router.get("/:id", getProductById);

module.exports = router;
