// Import express router to create auth routes
const express = require("express");
const router = express.Router();

// Import register and login functions
const { registerUser, loginUser } = require("../controllers/authController");

// POST /register - register a new user
router.post("/register", registerUser);

// POST /login - login user and get JWT token
router.post("/login", loginUser);

module.exports = router;
