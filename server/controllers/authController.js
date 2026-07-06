const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email }).maxTimeMS(5000);
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 8); // reduced from 10 to 8 for speed
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.json({ msg: "Registered successfully" });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ msg: "Error registering user", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).maxTimeMS(5000);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ msg: "Error logging in", error: err.message });
  }
};
