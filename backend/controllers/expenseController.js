const User = require('../models/User');
const Expense = require('../models/Expense');


// controllers/expenseController.js

exports.addExpense = async (req, res) => {
    const userId = req.user._id;
  
    try {
      // pull out the right fields
      const { icon, category, amount, date } = req.body;
  
      // only these three are required
      if (!category || !amount || !date) {
        return res
          .status(400)
          .json({ message: 'Please fill all required fields: category, amount, date' });
      }
  
      // build the payload, adding icon only if provided
      const newExpenseData = { userId, category, amount, date };
      if (icon) {
        newExpenseData.icon = icon;
      }
  
      // save and return
      const newExpense = await Expense.create(newExpenseData);
      return res.status(201).json(newExpense);
  
    } catch (error) {
      console.error('❌ Error adding expense: controller', error);
      return res
        .status(500)
        .json({ message: 'Error adding expense', error: error.message });
    }
  };
  

exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;

    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expense);
    }catch(error){
        res.status(500).json({ message: 'Error: fetching expense in controller', error: error.message });
    }
}

exports.deleteExpense = async (req, res) => {

    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error: deleting expense', error: error.message });
    }
}

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;

    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data for excel
        const data = expenses.map((income) => ({
            Source: expenses.source,
            Amount: expenses.amount,
            Date: expenses.date.toISOString().split('T')[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Incomes');
        xlsx.writeFile(wb, 'incomes_details.xlsx');
        res.download('incomes_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: 'Error: downloading expense excel', error: error.message });
    }
};


