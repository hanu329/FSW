const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

// MongoDB connect
mongoose.connect("mongodb+srv://Hanu329:Trip9452@cluster0.xn0gaae.mongodb.net/viteauth")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
