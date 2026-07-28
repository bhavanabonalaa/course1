const express = require("express");
const router = express.Router();
const { submitFeedback, checkFeedbackStatus } = require("../controllers/feedbackController");
const auth = require("../middlewares/authMiddleware");

router.get("/status", auth, checkFeedbackStatus);
router.post("/", auth, submitFeedback);

module.exports = router;