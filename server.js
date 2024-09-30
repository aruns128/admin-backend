const express = require('express');
const bodyParser = require('body-parser');
const dotenv=require('dotenv');
const connectDB = require('./config/db');
const { router: authRoutes } = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const reportRoutes = require('./routes/reports');

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', reportRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
