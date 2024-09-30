const express = require('express');
const Contact = require('../models/ContactSchema');
const { authenticateJWT } = require('./auth');
const router = express.Router();

// Add a new contact
router.post('/contacts',authenticateJWT, async (req, res) => {
  const { schoolName, studentName, fatherName, phoneNumber, callStatus, notes, assignedTo } = req.body;

  try {
      // Check for existing contact by unique fields
      const existingContact = await Contact.findOne({ 
          schoolName, 
          studentName, 
          fatherName, 
          phoneNumber 
      });
      
      if (existingContact) {
          return res.status(400).json({ message: 'Contact already exists with the provided details.' });
      }

      // Create a new contact
      const contact = new Contact({
          schoolName,
          studentName,
          fatherName,
          phoneNumber,
          callStatus,
          notes,
          assignedTo,
      });

      await contact.save();
      return res.status(201).json({ message: 'Contact created successfully', contact });
  } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
  }
});



// Get all contacts
router.get('/contacts', authenticateJWT, async (req, res) => {
  const contacts = await Contact.find().populate('assignedTo', 'name');
  res.json(contacts);
});

// Update contact status or notes
router.patch('/contacts/:id', authenticateJWT, async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!contact) return res.status(404).json({ message: 'Contact not found' });
  res.json(contact);
});

module.exports = router;
