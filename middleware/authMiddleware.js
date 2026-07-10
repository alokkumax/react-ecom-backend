// Import jsonwebtoken to verify the token
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token before accessing protected routes
const verifyToken = (req, res, next) => {
  try {
    // Get token from Authorization header
    // Format should be: Bearer <token>
    const authHeader = req.headers.authorization;

    // If no token is sent
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided" });
    }

    // Remove "Bearer " and get only the token
    const token = authHeader.split(" ")[1];

    // Verify token using JWT_SECRET from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save user id from token into request (can use later if needed)
    req.userId = decoded.userId;

    // Move to next function (cart controller)
    next();
  } catch (error) {
    // If token is invalid or expired
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
