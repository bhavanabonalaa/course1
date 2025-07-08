const express = require("express");
const router = express.Router();
const { getAllTeachers, getTeacherById } = require("../controllers/teacherController");

router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);

module.exports = router;