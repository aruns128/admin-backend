const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true,
    trim: true,
  },
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  fatherName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  callStatus: {
    type: String,
    enum: ['pending', 'called', 'interested', 'not interested'],
    default: 'pending',
  },
  notes: {
    type: String,
    default: null,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  }
});

// Create a compound index to ensure uniqueness across all specified fields
contactSchema.index({ schoolName: 1, studentName: 1, fatherName: 1, phoneNumber: 1 }, { unique: true });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
