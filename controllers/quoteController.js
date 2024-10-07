const Quote = require("../models/quoteModel");

// Get all quotes
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a random quote
const getRandomQuote = async (req, res) => {
  try {
    const randomQuote = await Quote.aggregate([{ $sample: { size: 1 } }]);
    res.json(randomQuote[0]); // Return the first random quote
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Seed the database with quotes
const seedQuotes = async () => {
  const count = await Quote.countDocuments();
  if (count === 0) {
    const quotes = [
      {
        author: "Nelson Mandela",
        quote:
          "Education is the most powerful weapon which you can use to change the world.",
      },
      {
        author: "Albert Einstein",
        quote:
          "Education is not the learning of facts, but the training of the mind to think.",
      },
      {
        author: "Aristotle",
        quote: "The roots of education are bitter, but the fruit is sweet.",
      },
      {
        author: "Malcolm X",
        quote:
          "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
      },
      {
        author: "Mahatma Gandhi",
        quote:
          "Live as if you were to die tomorrow. Learn as if you were to live forever.",
      },
      {
        author: "John Dewey",
        quote:
          "Education is not preparation for life; education is life itself.",
      },
      {
        author: "Confucius",
        quote:
          "Education breeds confidence. Confidence breeds hope. Hope breeds peace.",
      },
      {
        author: "Plato",
        quote:
          "The direction in which education starts a man will determine his future in life.",
      },
      {
        author: "Benjamin Franklin",
        quote: "An investment in knowledge pays the best interest.",
      },
      {
        author: "Helen Keller",
        quote: "The highest result of education is tolerance.",
      },
      {
        author: "Martin Luther King Jr.",
        quote:
          "The function of education is to teach one to think intensively and to think critically. Intelligence plus character—that is the goal of true education.",
      },
      {
        author: "Dr. Seuss",
        quote:
          "The more that you read, the more things you will know. The more that you learn, the more places you’ll go.",
      },
      {
        author: "Kofi Annan",
        quote:
          "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family.",
      },
      {
        author: "B.B. King",
        quote:
          "The beautiful thing about learning is that no one can take it away from you.",
      },
      {
        author: "Leonardo da Vinci",
        quote: "Learning never exhausts the mind.",
      },
      {
        author: "Malala Yousafzai",
        quote:
          "One child, one teacher, one book, one pen can change the world.",
      },
      {
        author: "W.B. Yeats",
        quote:
          "Education is not the filling of a pail, but the lighting of a fire.",
      },
      {
        author: "George Washington Carver",
        quote: "Education is the key to unlock the golden door of freedom.",
      },
      {
        author: "Marie Curie",
        quote:
          "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
      },
      {
        author: "Frederick Douglass",
        quote: "Once you learn to read, you will be forever free.",
      },
      {
        author: "John F. Kennedy",
        quote:
          "The goal of education is the advancement of knowledge and the dissemination of truth.",
      },
      {
        author: "Abraham Lincoln",
        quote: "Whatever you are, be a good one.",
      },
      {
        author: "Socrates",
        quote:
          "Education is the kindling of a flame, not the filling of a vessel.",
      },
      {
        author: "B.F. Skinner",
        quote:
          "Education is what survives when what has been learned is forgotten.",
      },
      {
        author: "Margaret Mead",
        quote: "Children must be taught how to think, not what to think.",
      },
      {
        author: "C.S. Lewis",
        quote:
          "The task of the modern educator is not to cut down jungles, but to irrigate deserts.",
      },
      {
        author: "Mark Twain",
        quote: "Don’t let schooling interfere with your education.",
      },
      {
        author: "John Locke",
        quote:
          "The only defense against the world is a thorough knowledge of it.",
      },
      {
        author: "Immanuel Kant",
        quote:
          "The human mind is not a vessel to be filled, but a fire to be kindled.",
      },
      {
        author: "Edward Everett",
        quote:
          "Education is a better safeguard of liberty than a standing army.",
      },
      {
        author: "Henry Brooks Adams",
        quote: "They know enough who know how to learn.",
      },
      {
        author: "Epictetus",
        quote: "Only the educated are free.",
      },
      {
        author: "Ralph Waldo Emerson",
        quote: "The secret of education lies in respecting the pupil.",
      },
      {
        author: "Malcolm Forbes",
        quote:
          "Education’s purpose is to replace an empty mind with an open one.",
      },
      {
        author: "Jean Piaget",
        quote:
          "The goal of education is not to increase the amount of knowledge but to create the possibilities for a child to invent and discover.",
      },
      {
        author: "Henry David Thoreau",
        quote: "It’s not what you look at that matters, it’s what you see.",
      },
      {
        author: "Maria Montessori",
        quote:
          "The greatest sign of success for a teacher is to be able to say, 'The children are now working as if I did not exist.'",
      },
      {
        author: "Benjamin Disraeli",
        quote:
          "Upon the education of the people of this country, the fate of this country depends.",
      },
      {
        author: "Confucius",
        quote:
          "He who learns but does not think, is lost! He who thinks but does not learn is in great danger.",
      },
      {
        author: "John Holt",
        quote:
          "Learning is not the product of teaching. Learning is the product of the activity of learners.",
      },
      {
        author: "Winston Churchill",
        quote:
          "Personally, I’m always ready to learn, although I do not always like being taught.",
      },
      {
        author: "Galileo Galilei",
        quote:
          "You cannot teach a man anything; you can only help him discover it in himself.",
      },
      {
        author: "Bill Gates",
        quote:
          "We always overestimate the change that will occur in the next two years and underestimate the change that will occur in the next ten. Don’t let yourself be lulled into inaction.",
      },
      {
        author: "Howard Gardner",
        quote:
          "The biggest mistake of past centuries in teaching has been to treat all children as if they were variants of the same individual.",
      },
      {
        author: "Frank Herbert",
        quote:
          "The mind commands the body and it obeys. The mind orders itself and meets resistance.",
      },
      {
        author: "Anne Sullivan",
        quote:
          "Children require guidance and sympathy far more than instruction.",
      },
      {
        author: "Albert Schweitzer",
        quote:
          "The purpose of human life is to serve, and to show compassion and the will to help others.",
      },
    ];

    await Quote.insertMany(quotes);
    console.log("Quotes seeded");
  }
};

module.exports = { getAllQuotes, getRandomQuote, seedQuotes };
