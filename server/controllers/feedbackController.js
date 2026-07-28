const Feedback = require("../models/Feedback");

// Check if user already submitted feedback
exports.checkFeedbackStatus = async (req, res) => {
  const userId = req.user.id;
  const existing = await Feedback.findOne({ userId });
  res.json({ submitted: !!existing });
};

exports.submitFeedback = async (req, res) => {
  const { teacherId, rating, message } = req.body;
  const userId = req.user.id;

  // Block duplicate submissions
  const existing = await Feedback.findOne({ userId });
  if (existing) {
    return res.status(409).json({ msg: "Feedback already submitted" });
  }

  const feedback = new Feedback({ userId, teacherId, rating, message });
  await feedback.save();
  res.json({ msg: "Feedback submitted" });
};