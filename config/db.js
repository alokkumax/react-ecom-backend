// this file connects our app to mongodb

const mongoose = require("mongoose");

// function to connect to mongodb
const connectDB = async () => {
  try {
    // connect using url from .env file
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    // if connection fails, print error and stop server
    console.log("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
