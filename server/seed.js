const mongoose = require("mongoose");
require("dotenv").config();

const Teacher = require("./models/Teacher");
const Course = require("./models/Course");

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Clean existing
  await Teacher.deleteMany({});
  await Course.deleteMany({});

  // Teachers
  const teachers = await Teacher.insertMany([
    {
      name: "Dr.M.Sravan Kumar Reddy",
      background: "PhD in AI from IIT Madras",
      ratings: [4.5, 4.6, 4.7, 4.4],
      research: ["NLP in Education", "AI Mentorship"],
      patents: ["AI Chatbot for Students"],
    },
    {
      name: "Dr.K.Subba Reddy",
      background: "MTech from NIT Trichy",
      ratings: [4.1, 4.3, 4.2, 4.0],
      research: ["Blockchain Research"],
      patents: ["Secure Exam Systems"],
    },
    
  {
    name: "Dr.P.Sreedevi",
    ratings: [4.5, 4.7, 4.6, 4.8],
    background: "PhD in Machine Learning from IIT Delhi. 12 years of teaching experience.",
    patents: ["Smart Attendance System", "AI-based Learning Assistant"],
    research: ["Deep Learning in Healthcare", "NLP for Regional Languages"]
  },
  {
    name: "Mr.P.Naveen Sundar Kumar",
    ratings: [4.2, 4.0, 4.1, 4.3],
    background: "M.Tech in Cyber Security, IISc Bangalore. Industry expert turned academic.",
    patents: ["Encrypted Data Exchange Protocol"],
    research: ["Cloud Security", "Cryptography"]
  },
  {
    name: "Mrs.P.Sucharitha",
    ratings: [4.6, 4.7, 4.5, 4.4],
    background: "PhD in Embedded Systems from NIT Trichy. 10+ years of research & teaching.",
    patents: ["Energy-efficient Microcontroller"],
    research: ["IoT systems", "VLSI design"]
  },
  {
    name: "Mr.P.Narasimhulu",
    ratings: [3.9, 4.0, 3.8, 4.2],
    background: "MCA from Delhi University. Specialized in software engineering.",
    patents: [],
    research: ["Agile Methodologies", "Software Testing"]
  },
  {
    name: "Dr.N.Madhu Sudhan Reddy",
    ratings: [4.8, 4.9, 4.7, 5.0],
    background: "PhD in Artificial Intelligence from Stanford. Visiting faculty and mentor.",
    patents: ["AI-based Smart Tutor"],
    research: ["Reinforcement Learning", "Ethical AI"]
  },
  {
    name: "Mr.K.Vishwanath",
    ratings: [4.1, 4.0, 4.2, 4.3],
    background: "M.Tech in Data Science. 15 years of undergraduate teaching.",
    patents: [],
    research: ["Big Data Analytics", "Educational Data Mining"]
  }
]


);

  // Courses
  await Course.insertMany([
    { name: "Data Structures", type: "theory", teachers: [teachers[0]._id] },
    { name: "Full Stack", type: "theory", teachers: [teachers[1]._id] },
    { name: "JAVA", type: "theory", teachers: [teachers[2]._id] },
    { name: "Python", type: "theory", teachers: [teachers[3]._id] },
    { name: "Operating Systems", type: "theory", teachers: [teachers[4]._id] },
    { name: "Computer Networks", type: "theory", teachers: [teachers[5]._id] },
    { name: "DBMS", type: "theory", teachers: [teachers[1]._id] },
    { name: "DS Lab", type: "lab", teachers: [teachers[0]._id] },
    { name: "CN Lab", type: "lab", teachers: [teachers[1]._id] },
    { name: "OS Lab", type: "lab", teachers: [teachers[2]._id] },
    { name: "FSAD Lab", type: "lab", teachers: [teachers[3]._id] },
  ]);

  console.log("Seeding complete");
  process.exit();
};

start();