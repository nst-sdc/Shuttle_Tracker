const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: false, // Not required for Google users
  },
  role: {
    type: String,
    enum: ['student', 'driver'],
    required: true,
  },
  googleId: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);