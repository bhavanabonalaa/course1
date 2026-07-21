const Course = require("../models/Course");
const User = require("../models/User");

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teachers");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch courses" });
  }
};

exports.selectCourses = async (req, res) => {
  const userId = req.user.id;
  const { theory, lab } = req.body;

  if (!Array.isArray(theory) || !Array.isArray(lab)) {
    return res.status(400).json({ msg: "Invalid data format" });
  }

  if (theory.length !== 4 || lab.length !== 2) {
    return res.status(400).json({ msg: "Select exactly 4 theory and 2 lab courses." });
  }

  try {
    // ✅ Check if user already submitted selections
    const existingUser = await User.findById(userId);
    if (
      existingUser.selectedCourses &&
      existingUser.selectedCourses.theory &&
      existingUser.selectedCourses.theory.length > 0
    ) {
      return res.status(409).json({ msg: "You have already submitted your course selection. You cannot select again." });
    }

    await User.findByIdAndUpdate(userId, {
      selectedCourses: {
        theory,
        lab
      }
    });

    res.json({ msg: "Courses selected successfully." });
  } catch (err) {
    console.error("Error saving courses:", err);
    res.status(500).json({ msg: "Server error while saving courses" });
  }
};

// ✅ New: Get selected courses
exports.getSelectedCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("selectedCourses.theory.courseId selectedCourses.theory.teacherId")
      .populate("selectedCourses.lab.courseId selectedCourses.lab.teacherId");

    res.json(user.selectedCourses || { theory: [], lab: [] });
  } catch (err) {
    console.error("Error fetching selected courses:", err);
    res.status(500).json({ msg: "Failed to fetch selected courses" });
  }
};