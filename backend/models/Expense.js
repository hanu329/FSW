import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  details: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: String,
    required: true,
    default: () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
  time: {
    type: String,
    required: true,
    default: () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;