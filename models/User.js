// Import mongoose to create a schema (structure) for our data
const mongoose = require("mongoose");

// This defines what a User document will look like in MongoDB
const userSchema = new mongoose.Schema({
  // User's full name
  name: {
    type: String,
    required: true,
  },

  // User's email address (used for login later)
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // User's password (we will hash this later in auth step)
  password: {
    type: String,
    required: true,
  },
});

// Create and export the User model
// "User" is the collection name in MongoDB (it becomes "users")
module.exports = mongoose.model("User", userSchema);
