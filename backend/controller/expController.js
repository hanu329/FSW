import Expense from "../models/Expense.js";

export const createExpense = async (req, res) => {
  try {

    const expenses = req.body.map(exp => ({
      ...exp,
      user: req.userId
    }));
    console.log(expenses)

    const savedExpenses = await Expense.insertMany(expenses);

    res.status(201).json(savedExpenses);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getExpenses = async (req,res)=>{
  try{

    const expenses = await Expense.find({ user: req.userId });

    res.json(expenses);

  }catch(error){
    res.status(500).json({message:error.message})
  }
}