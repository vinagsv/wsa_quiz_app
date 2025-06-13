const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  const token = authHeader.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    try {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(403).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error authenticating user:", error.message);
      res.status(500).json({ message: error.message });
    }
  });
};

module.exports = authenticateUser;
