const mongoose = require("mongoose");

// Define a schema for the quotes
const quoteSchema = new mongoose.Schema({
  author: String,
  quote: String,
});

// Create a model for the quotes
const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;
