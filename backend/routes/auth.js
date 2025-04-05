const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

// ➕ Register (After MetaMask)
router.post("/register", async (req, res) => {
  const { walletAddress, username, firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }, { walletAddress }] });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      walletAddress,
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      credentials: [{
        type: 'email',
        value: email,
        verified: true
      }]
    });

    await user.save();

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔐 Login with Username/Email & Password
router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    return res.status(400).json({ message: "Username or email required" });
  }

  try {
    // Try to find user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Create token with user ID
    // Return success message and basic user info
    res.json({ 
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔑 Login with Wallet (MetaMask)
router.post("/wallet-login", async (req, res) => {
  const { walletAddress } = req.body;

  try {
    const user = await User.findOne({ walletAddress });
    if (!user) return res.status(404).json({ message: "Wallet not registered" });

    // Add wallet credential if not already present
    if (!user.credentials.some(c => c.type === 'wallet' && c.value === walletAddress)) {
      user.credentials.push({
        type: 'wallet',
        value: walletAddress,
        verified: true
      });
      await user.save();
    }

    res.json({ message: "Login via wallet successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new credential
router.post("/credentials", async (req, res) => {
  const { userId, type, value } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if credential already exists
    if (user.credentials.some(c => c.type === type && c.value === value)) {
      return res.status(400).json({ message: "Credential already exists" });
    }

    user.credentials.push({
      type,
      value,
      verified: false
    });
    await user.save();

    res.json({ message: "Credential added", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const auth = require('../middleware/auth');

// Admin routes to check users - protected
router.get('/users', auth, async (req, res) => {
  try {
    const { email, username, walletAddress } = req.query;
    const filter = {};
    if (email) filter.email = email;
    if (username) filter.username = username;
    if (walletAddress) filter.walletAddress = walletAddress;
    
    const users = await User.find(filter).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check if specific field exists - protected
router.get('/users/exists', auth, async (req, res) => {
  try {
    const { field, value } = req.query;
    if (!field || !value) return res.status(400).json({ message: 'Missing field or value' });
    
    const exists = await User.exists({ [field]: value });
    res.json({ exists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
