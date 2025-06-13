const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

require("dotenv").config(); // Ensure .env is loaded

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false, // Add success flag
        message: "Username, email, and password are required",
      });
    }

    // Consider adding more validation (e.g., password strength, email format)
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User with this email already exists",
        });
    }
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true, // Add success flag
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error registering user: " + error.message,
      });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Generic message to avoid user enumeration
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, username: user.username }, // Optionally include username or roles
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: process.env.JWT_EXPIRES_IN || "300m" } // Use env var for expiry
    );

    res.status(200).json({
      success: true, // Add success flag
      message: "Login successful",
      accessToken,
      user: {
        // Send some user details
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error.message); // Corrected console log
    res
      .status(500)
      .json({ success: false, message: "Error logging in: " + error.message });
  }
};

const quizAttempts = async (req, res) => {
  try {
    const userId = req.user._id;
    // Corrected: quiz_attempts is a direct field, no need to populate
    const user = await User.findById(userId).select("quiz_attempts"); // Select only the needed field

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, attempts: user.quiz_attempts });
  } catch (error) {
    console.error("Error Fetching quiz attempts:", error.message); // Corrected typo: console.error
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching quiz attempts: " + error.message,
      });
  }
};

module.exports = { register, login, quizAttempts };
