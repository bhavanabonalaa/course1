const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();
app.use(cors(
    {
        origin:"https://courseelection.netlify.app",
        methods:["GET", "POST" ,"PUT", "DELETE"],
        credentials:true,
    }
));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
// Add more like /courses, /teachers, /feedback later
app.use("/api/courses",require("./routes/courseRoutes"));
app.use("/api/teachers",require("./routes/teacherRoutes"));
app.use("/api/feedback",require("./routes/feedbackRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
