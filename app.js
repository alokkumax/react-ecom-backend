// Import express - this is the main library we use to build our API
const express = require("express");

// Import cors - allows our frontend to talk to this backend
const cors = require("cors");

// Create an express application
const app = express();

// Use cors so other websites (like our React app) can call our API
app.use(cors());

// This helps express read JSON data sent in requests (we will use this later)
app.use(express.json());

// Root route - when someone visits http://localhost:PORT/
// they will see this message
app.get("/", (req, res) => {
  res.send("Backend Running...");
});

// Export the app so server.js can use it
module.exports = app;
