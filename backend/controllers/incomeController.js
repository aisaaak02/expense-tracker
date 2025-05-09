const User = require('../models/User');
const Income = require('../models/Income');

exports.addIncome = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const { icon, source, amount, date } = req.body;
  
      // Only source, amount and date are required
      if (!source || !amount || !date) {
        return res
          .status(400)
          .json({ message: 'Please fill all required fields: source, amount, date' });
      }
  
      // Build payload, adding icon only if provided
      const newIncomeData = { userId, source, amount, date };
      if (icon) {
        newIncomeData.icon = icon;
      }
  
      // Create & return
      const income = await Income.create(newIncomeData);
      return res.status(201).json(income);
  
    } catch (error) {
      console.error('❌ Error adding income', error);
      return res
        .status(500)
        .json({ message: 'Error adding income', error: error.message });
    }
  };

exports.getAllIncome = async (req, res) => {
    const userId = req.user._id;

    try{
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    }catch(error){
        res.status(500).json({ message: 'Error: fetching incomes', error: error.message });
    }
}

exports.deleteIncome = async (req, res) => {

    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error: deleting income', error: error.message });
    }
}

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for excel
        const data = incomes.map((income) => ({
            Source: income.source,
            Amount: income.amount,
            Date: income.date.toISOString().split('T')[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Incomes');
        xlsx.writeFile(wb, 'incomes_details.xlsx');
        res.download('incomes_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: 'Error: downloading income excel', error: error.message });
    }
};


