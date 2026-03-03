import Expense from "../models/Expense.js";

export const createExpense = async (req, res) => {
  console.log('expbackendfun',req)
  try {
    const expense = new Expense({
      ...req.body,
      user: req.userId, // comes from auth middleware
    });

    await expense.save();

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};