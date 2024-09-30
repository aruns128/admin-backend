const mongoose = require('mongoose');

const connectDB = async () => {
    const url = process.env.MONGO_DB_URL;
  try {
    await mongoose.connect(url);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

module.exports = connectDB;
