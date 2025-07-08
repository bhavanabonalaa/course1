const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["theory", "lab"] },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
});

module.exports = mongoose.model("Course", CourseSchema);