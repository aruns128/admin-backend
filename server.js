const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors
const connectDB = require("./config/db");
const { router: authRoutes } = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const adminRoutes = require("./routes/admin");
const reportRoutes = require("./routes/reports");

const app = express();

// Connect to DB
connectDB();

// Middleware
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204, // For legacy browser support
};

app.use(cors(corsOptions)); // Use CORS middleware with options
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", reportRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
