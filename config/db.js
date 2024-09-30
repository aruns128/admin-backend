const mongoose = require("mongoose");

const connectDB = async () => {
  const url = process.env.MONGODB_URI;
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
