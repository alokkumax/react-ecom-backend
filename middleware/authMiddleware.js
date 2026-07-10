// this file checks if user is logged in before allowing cart access

const jwt = require("jsonwebtoken");

// middleware = function that runs before the actual route
const verifyToken = (req, res, next) => {
  try {
    // get token from header sent by postman
    // format: Bearer <token>
    const authHeader = req.headers.authorization;

    // if user did not send token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided" });
    }

    // remove "Bearer " word and get only token
    const token = authHeader.split(" ")[1];

    // check if token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // save user id from token (we can use later)
    req.userId = decoded.userId;

    // token is valid, go to next step (cart function)
    next();
  } catch (error) {
    // token is wrong or expired
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
