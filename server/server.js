const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS - allow frontend URLs
app.use(cors({
  origin: [
    "https://course1-sage.vercel.app",
    "http://localhost:3000",
    "https://stupendous-eclair-14fb8e.netlify.app"
  ],
  credentials: true
}));

app.use(express.json());

// ✅ Connect DB on every request (required for Vercel serverless)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Root route - for Railway healthcheck
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Course Selection API running" });
});

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

// Start server (for Railway / local)
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));

