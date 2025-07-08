const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  const { teacherId, rating, message } = req.body;
  const userId = req.user.id;

  const feedback = new Feedback({ userId, teacherId, rating, message });
  await feedback.save();
  res.json({ msg: "Feedback submitted" });
};