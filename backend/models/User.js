// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String
// });

// module.exports = mongoose.model("User", UserSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  avatar: String, // Cloudinary image URL
});

module.exports = mongoose.model("User", userSchema);
