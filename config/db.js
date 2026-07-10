// Import mongoose - this helps us connect to MongoDB
const mongoose = require("mongoose");

// This function connects our app to MongoDB database
const connectDB = async () => {
  try {
    // Connect using the MONGO_URI from .env file
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    // If connection fails, show error and stop the server
    console.log("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
