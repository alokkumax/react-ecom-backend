// this file has register and login logic

const User = require("../models/User");
const bcrypt = require("bcryptjs"); // used to hash password
const jwt = require("jsonwebtoken"); // used to create login token

// register new user - POST /register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if all fields are filled
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email and password",
      });
    }

    // check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // hash password before saving (we never save plain password)
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // send success message (don't send password back)
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

// login user - POST /login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email and password are sent
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    // find user by email
    const user = await User.findOne({ email });

    // if no user found
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // create jwt token (this proves user is logged in)
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // token works for 7 days
    );

    // send token back to user
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
