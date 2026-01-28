// After verification in backend
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  amount: Number,
  status: String,
});

const Payment = mongoose.model("Payment", paymentSchema);

// Save after verification
await Payment.create({
  orderId: razorpay_order_id,
  paymentId: razorpay_payment_id,
  amount: 100,
  status: "success",
});
