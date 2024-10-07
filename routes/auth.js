const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); // Add nodemailer for sending emails
const User = require("../models/UserSchema");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const url = process.env.MONGODB_URI;
console.log(url, JWT_SECRET);

// Transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

// Register Admin/User
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Check for existing user by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Hash the password
    const saltRounds = 10; // Adjust the salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const user = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      role,
    });

    await user.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "30s",
  });
  res.json({ role: user.role, token });
});

// Request Password Reset
router.post("/reset-password/request", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate a password reset token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "10m",
    });

    // Send the email with the reset link
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`; // Update with your frontend URL
    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      text: `This token will expired in 10m, Click the link to reset your password: ${resetLink}`,
    });

    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful! Redirecting to login..." });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        message: "Session expired, please request a new password reset link.",
      });
    }
    // Handle other JWT verification errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token. Please request a new password reset link.",
      });
    }
    // Generic server error response
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { router, authenticateJWT };
