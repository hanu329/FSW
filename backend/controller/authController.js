import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


import multer from "multer";
import cloudinary from "../cloudinary.js";
const upload = multer({ storage: multer.memoryStorage(),
                          limits: { fileSize: 1024 * 1024 },
 });


export const register = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, email, password } = req.body;
     if (name.length > 30) return res.status(400).json({ message: "Name too long" });
  if (email.length > 50) return res.status(400).json({ message: "Email too long" });
   if (password.length > 20) return res.status(400).json({ message: "Password too long" });

    const hashed = await bcrypt.hash(password, 10);

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
      password: hashed,
      avatar: result.secure_url,
    });

    console.log("Cloudinary result:", result);

    res.json({ message: "User registered", user });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Register failed" });
  }
};

//////////////////////

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // 🔐 CREATE JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login success",
      token
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

