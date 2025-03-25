const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login User with JWT session
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side access
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 3600000, // 1 hour expiry
    });

    res.json({ message: "Login successful", user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

// Logout User by clearing the cookie
exports.logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.json({ message: "Logout successful" });
};

// Check if user is logged in
exports.isAuthenticated = (req, res) => {
  const token = req.cookies?.token; // Safe way to access cookies

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ isAuthenticated: true, userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
