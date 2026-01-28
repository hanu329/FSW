// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const routeAuth= require("./routes/auth")
// const profile= require("./routes/userRoutes")

import dotenv from "dotenv";
import axios from "axios"
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Razorpay from "razorpay";
import crypto from "crypto";


import routeAuth from "./routes/auth.js";
import profile from "./routes/userRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Backend is live!");
});

////------RazorStart-----------

const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET",
});

// --- Create order ---
app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Verify payment ---
app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", "YOUR_KEY_SECRET")
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true });
    // ✅ Save payment in MongoDB here if needed
  } else {
    res.status(400).json({ success: false });
  }
});



///---ai------

app.post("/api/ai", async (req, res) => {
  const { question } = req.body;
console.log('hf',process.env.HF_API_KEY)
  try {
    const response = await axios.post(
     "https://router.huggingface.co/hf-inference/models/google/flan-t5-base", // example model

      { inputs: question },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );

    // If the API returns a text array (depends on model type)
    const answer = Array.isArray(response.data)
      ? response.data[0].generated_text
      : response.data.generated_text;

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI call failed" });
  }
});

//ai ends 


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

app.use("/api/auth",routeAuth );
app.use("/api/user",profile );
// app.use("/api/auth", require("./routes/userRoutes"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));
