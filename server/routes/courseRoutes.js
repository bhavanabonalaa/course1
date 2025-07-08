const express = require("express");
const router = express.Router();
const { getCourses, selectCourses, getSelectedCourses } = require("../controllers/courseController");
const auth = require("../middlewares/authMiddleware");
const User = require("../models/User");

router.get("/", getCourses);
router.post("/select", auth, selectCourses);

//fetches selected courses
router.get("/selections", auth, getSelectedCourses);
module.exports = router;