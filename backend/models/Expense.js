import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: String,
  hour: String,
  minute: String,
  period: String,
  location: String,
  shop: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;