const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure email is unique
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'agent'],
    required: true,
  },
});

// Exclude password from JSON output
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password; // Remove the password field
    return ret;
  },
});

// Create a unique index on email
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
