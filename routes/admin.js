const express = require('express');
const User = require('../models/User');
const Contact = require('../models/Contact')
const { authenticateJWT } = require('./auth');
const router = express.Router();

// Get all users (admin only)
router.get('/users', authenticateJWT, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const users = await User.find(); // Retrieve all users
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Assign contacts to an agent
router.patch('/contacts/assign/:contactId', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  
  const { agentId } = req.body;
  const contact = await Contact.findByIdAndUpdate(req.params.contactId, { assignedTo: agentId }, { new: true });
  
  if (!contact) return res.status(404).json({ message: 'Contact not found' });
  res.json(contact);
});

module.exports = router;
