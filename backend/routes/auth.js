//onst router = require("express").Router();
import express from "express";
const router = express.Router();


import { login, register } from "../controller/authController.js";
import jwt from "jsonwebtoken";

// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const multer = require("multer");
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import multer from "multer";


const upload = multer({ storage: multer.memoryStorage() });


router.post("/register", upload.single("image"), register);
router.post("/login",  login);


//module.exports = router;
export default router;





// router.post("/register", upload.single("image"), async (req, res) => {
//   try {

//      console.log("BODY:", req.body);
//     console.log("FILE:", req.file);
//     const { name, email, password } = req.body;
//       const hashed = await bcrypt.hash(password, 10);

//     // Upload image to Cloudinary
//     const result = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: "profiles" },
//         (error, result) => {

//           if (error) reject(error);
//           else resolve(result);
//         }
//       );

//       stream.end(req.file.buffer);
//     });

//     const user = await User.create({
//       name,
//       email,
//       password:hashed,
//       avatar: result.secure_url, // image URL
//     });
//    console.log("Cloudinary result:", result);
//     res.json({ message: "User registered", user });
//   } catch (err) {
//     console.error("Server error:", err);
//     res.status(500).json({ message: "Register failed" });
//   }
// });

///////

// export const register = async (req, res) => {
//   try {
//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);

//     const { name, email, password } = req.body;

//     const hashed = await bcrypt.hash(password, 10);

//     // Upload image to Cloudinary
//     const result = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: "profiles" },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );

//       stream.end(req.file.buffer);
//     });

//     const user = await User.create({
//       name,
//       email,
//       password: hashed,
//       avatar: result.secure_url,
//     });

//     console.log("Cloudinary result:", result);

//     res.json({ message: "User registered", user });
//   } catch (err) {
//     console.error("Server error:", err);
//     res.status(500).json({ message: "Register failed" });
//   }
// };





// LOGIN
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   console.log("logindata : ",req.body)
//   const user = await User.findOne({ email });
//   console.log('user: ', user)
//   if (!user) return res.status(400).json({ error: "User not found" });

//   const isMatch = await bcrypt.compare(password, user.password);
//    console.log('ismatch: ', isMatch)
//   if (!isMatch) return res.status(400).json({ error: "Wrong password" });

//   res.json({ message: "Login successful", user: user.name });
// });




// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res.status(400).json({ message: "All fields required" });

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     // 🔐 CREATE JWT
//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       message: "Login success",
//       token
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


// module.exports = router;
