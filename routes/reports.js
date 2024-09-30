const express = require('express');
const Contact = require('../models/ContactSchema');
const { authenticateJWT } = require('./auth');
const router = express.Router();

// Get analytics summary
router.get('/reports/summary', authenticateJWT, async (req, res) => {
  const totalContacts = await Contact.countDocuments();
  const interestedContacts = await Contact.countDocuments({ callStatus: 'interested' });
  res.json({ totalContacts, interestedContacts });
});

module.exports = router;
