const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const cloudinary = require("../cloudinary");

// REGISTER


const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", upload.single("image"), async (req, res) => {
  try {

     console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const { name, email, password } = req.body;

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profiles" },
        (error, result) => {

          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    const user = await User.create({
      name,
      email,
      password,
      avatar: result.secure_url, // image URL
    });
   console.log("Cloudinary result:", result);
    res.json({ message: "User registered", user });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Register failed" });
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
