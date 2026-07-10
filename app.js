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

// Import product and cart routes
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");

// Use routes - all product APIs will start with /products
app.use("/products", productRoutes);

// All cart APIs will start with /cart
app.use("/cart", cartRoutes);

// Auth routes - register and login
app.use("/", authRoutes);

// Root route - when someone visits http://localhost:PORT/
// they will see this message
app.get("/", (req, res) => {
  res.send("Backend Running...");
});

// Export the app so server.js can use it
module.exports = app;
