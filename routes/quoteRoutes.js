const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quoteController");

// Route to get all quotes
router.get("/quotes", quoteController.getAllQuotes);

// Route to get a random quote
router.get("/quotes/random", quoteController.getRandomQuote);

module.exports = router;
