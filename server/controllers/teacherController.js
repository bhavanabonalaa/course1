const Teacher = require("../models/Teacher");

exports.getAllTeachers = async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
};

exports.getTeacherById = async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) return res.status(404).json({ msg: "Teacher not found" });
  res.json(teacher);
};
