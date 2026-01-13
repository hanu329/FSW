// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String
// });

// module.exports = mongoose.model("User", UserSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  avatar: String, // Cloudinary image URL
});

//module.exports = mongoose.model("User", userSchema);
export default mongoose.model("User", userSchema);
