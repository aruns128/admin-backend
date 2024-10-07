const Contact = require("../models/ContactSchema");

// Add a new contact
exports.createContact = async (req, res) => {
  const {
    schoolName,
    studentName,
    fatherName,
    phoneNumber,
    callStatus,
    notes,
    assignedTo,
  } = req.body;

  try {
    // Check for existing contact by unique fields
    const existingContact = await Contact.findOne({
      schoolName,
      studentName,
      fatherName,
      phoneNumber,
    });

    if (existingContact) {
      return res
        .status(400)
        .json({ message: "Contact already exists with the provided details." });
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
    return res
      .status(201)
      .json({ message: "Contact created successfully", contact });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().populate("assignedTo", "name");
    res.json(contacts);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Update contact status or notes
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
