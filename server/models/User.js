const mongoose = require("mongoose");

const CourseSelectionSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  selectedCourses: {
    theory: [CourseSelectionSchema],
    lab: [CourseSelectionSchema]
  }
});

module.exports = mongoose.model("User", UserSchema);