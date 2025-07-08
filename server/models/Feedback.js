const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  message: String,
  rating: Number,
});

module.exports = mongoose.model("Feedback", FeedbackSchema);