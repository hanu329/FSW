// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String
// });

// module.exports = mongoose.model("User", UserSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // name: String,
  // email: { type: String, unique: true },
  // password: String,
  // avatar: String, // Cloudinary image URL
  name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
      maxlength: 50,
    //  match: [
    //   /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    //   "Please enter a valid email address",
    // ],
  },
  password: {
    type: String,
    required: true,
    //minlength: 6,
     // maxlength: 30,
  },
  avatar: String,
});

//module.exports = mongoose.model("User", userSchema);
export default mongoose.model("User", userSchema);
