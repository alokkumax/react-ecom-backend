// Import User model to save and find users in MongoDB
const User = require("../models/User");

// Import bcryptjs to hash and compare passwords
const bcrypt = require("bcryptjs");

// Import jsonwebtoken to create login token
const jwt = require("jsonwebtoken");

// POST /register - Register a new user
const registerUser = async (req, res) => {
  try {
    // Get name, email and password from request body
    const { name, email, password } = req.body;

    // Validation: check if any field is missing
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email and password",
      });
    }

    // Check if user with same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // Hash the password before saving (never save plain password)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Send success response (do not send password back)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// POST /login - Login user and return JWT token
const loginUser = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;

    // Validation: check if email or password is missing
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare entered password with hashed password in database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If password is wrong
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token with user id inside it
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // token valid for 7 days
    );

    // Send token to client
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
