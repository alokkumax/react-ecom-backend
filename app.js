// this file sets up our express app and connects all routes

// express is the main package we use to build apis
const express = require("express");

// cors lets our frontend app talk to this backend
const cors = require("cors");

// create the express app
const app = express();

// use cors middleware
app.use(cors());

// this lets us read json data from postman or frontend
app.use(express.json());

// import our route files
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");

// connect product routes - all urls will start with /products
app.use("/products", productRoutes);

// connect cart routes - all urls will start with /cart
app.use("/cart", cartRoutes);

// connect auth routes - /register and /login
app.use("/", authRoutes);

// simple test route - open http://localhost:5000/ in browser to check server is working
app.get("/", (req, res) => {
  res.send("Backend Running...");
});

// export app so server.js can use it
module.exports = app;
