// auth routes file - register and login

const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

// POST /register - create new account
router.post("/register", registerUser);

// POST /login - login and get token
router.post("/login", loginUser);

module.exports = router;
