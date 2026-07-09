// Load environment variables from .env file (like PORT number)
require("dotenv").config();

// Import our express app from app.js
const app = require("./app");

// Get port from .env file, or use 5000 if not set
const PORT = process.env.PORT || 5000;

// Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
