// product routes file

const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");

// GET /products - get all products
router.get("/", getAllProducts);

// GET /products/:id - get one product
router.get("/:id", getProductById);

module.exports = router;
