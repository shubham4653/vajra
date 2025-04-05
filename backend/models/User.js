const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  credentials: [{
    type: { type: String, required: true, enum: ['email', 'phone', 'wallet'] },
    value: { type: String, required: true },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

// Add virtual isAdmin property
userSchema.virtual('isAdmin').get(function() {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  return adminEmails.includes(this.email);
});

module.exports = mongoose.model("User", userSchema);
