const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

// CORS - allow Vercel frontend and local dev
app.use(cors({
  origin: [
    "https://course1-sage.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true
}));

app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
  const mongoose = require("mongoose");
  res.json({ 
    status: "ok", 
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    env: process.env.MONGO_URI ? "MONGO_URI set" : "MONGO_URI missing"
  });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));

// Export for Vercel serverless
module.exports = app;

// Run locally
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
