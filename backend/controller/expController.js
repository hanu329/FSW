import Expense from "../models/Expense.js";


export const createExpense = async (req, res) => {

  
  try {
    // Expect single object, not array
    const { details, amount, date, time, location } = req.body;
   
    // Validate required fields
    if (!details || !amount || !date || !time || !location) {
      return res.status(400).json({ 
        message: "Missing required fields: details, amount, date, time, location" 
      });
    }

    // Create new expense
      const expense = new Expense({
      details: details.trim(),
      amount: Number(amount), // Convert to number (instead of parseFloat)
      date: new Date(date),
      time: time,
      location: location.trim(),
      user: req.userId
    });

      console.log("body", expense)

    const savedExpense = await expense.save();

    res.status(201).json({
      success: true,
      data: savedExpense
    });

  } catch (error) {
    console.error("Create expense error:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    
    res.status(500).json({ message: error.message });
  }
};


export const getExpenses = async (req,res)=>{
  try{

 //   const expenses = await Expense.find({ user: req.userId });

  const expenses = await Expense.find({ user: req.userId })
  .sort({ date: 1, time: 1 }); // Ascending order

    res.json(expenses);

  }catch(error){
    res.status(500).json({message:error.message})
  }
}