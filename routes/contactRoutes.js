const express = require("express");
const { authenticateJWT } = require("./auth");
const {
  createContact,
  getAllContacts,
  updateContact,
} = require("../controllers/contactController");

const router = express.Router();

// Add a new contact
router.post("/contacts", authenticateJWT, createContact);

// Get all contacts
router.get("/contacts", authenticateJWT, getAllContacts);

// Update contact status or notes
router.patch("/contacts/:id", authenticateJWT, updateContact);

module.exports = router;
