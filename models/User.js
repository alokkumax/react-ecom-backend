// this file defines how a user looks in the database

const mongoose = require("mongoose");

// schema = structure of data we want to save
const userSchema = new mongoose.Schema({
  // full name of user
  name: {
    type: String,
    required: true,
  },

  // email for login
  email: {
    type: String,
    required: true,
    unique: true, // no two users can have same email
  },

  // password (we save hashed password, not plain text)
  password: {
    type: String,
    required: true,
  },
});

// create User model - saves data in "users" collection in mongodb
module.exports = mongoose.model("User", userSchema);
