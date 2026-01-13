// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const routeAuth= require("./routes/auth")
// const profile= require("./routes/userRoutes")

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import routeAuth from "./routes/auth.js";
import profile from "./routes/userRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Backend is live!");
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

app.use("/api/auth",routeAuth );
app.use("/api/user",profile );
// app.use("/api/auth", require("./routes/userRoutes"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));
