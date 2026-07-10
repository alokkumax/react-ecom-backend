// this file starts our server

// load variables from .env file like PORT, MONGO_URI, JWT_SECRET
require("dotenv").config();

// import express app from app.js
const app = require("./app");

// import function to connect mongodb
const connectDB = require("./config/db");

// get port number from .env, if not found use 5000
const PORT = process.env.PORT || 5000;

// first connect to database, then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
