// Load environment variables from .env file (like PORT number)
require("dotenv").config();

// Import our express app from app.js
const app = require("./app");

// Import database connection function
const connectDB = require("./config/db");

// Get port from .env file, or use 5000 if not set
const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
