const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: String,
  background: String,
  ratings: [Number],
  projects: [String],
  patents: [String],
});

module.exports = mongoose.model("Teacher", TeacherSchema);