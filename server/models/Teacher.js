const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: String,
  background: String,
  ratings: [Number],
  research: [String],
  patents: [String],
});

module.exports = mongoose.model("Teacher", TeacherSchema);
