const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed });
    await user.save();
    console.log("is it working")

    res.json({ message: "User registered successfully" });

  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Wrong password" });

  res.json({ message: "Login successful", user: user.name });
});

module.exports = router;
