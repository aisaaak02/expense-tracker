// controllers/dashboardController.js

const { isValidObjectId } = require('mongoose');
const Income  = require('../models/Income');
const Expense = require('../models/Expense');

exports.getDashboardData = async (req, res) => {
  try {
    // 1️⃣ Validate user
    const userId = req.user?._id;
    if (!userId || !isValidObjectId(userId)) {
      return res.status(401).json({ message: 'Unauthorized or invalid user' });
    }

    // 2️⃣ Compute date thresholds
    const now = Date.now();
    const threshold30 = new Date(now - 30 * 24 * 60 * 60 * 1000);
    const threshold60 = new Date(now - 60 * 24 * 60 * 60 * 1000);

    // 3️⃣ Sum total income & expense
    const [incAgg, expAgg] = await Promise.all([
      Income.aggregate([
        { $match: { userId } },
        { $group: { _id: null, totalIncome: { $sum: '$amount' } } }
      ]),
      Expense.aggregate([
        { $match: { userId } },
        { $group: { _id: null, totalExpense: { $sum: '$amount' } } }
      ])
    ]);
    const totalIncome  = incAgg[0]?.totalIncome  || 0;
    const totalExpense = expAgg[0]?.totalExpense || 0;

    // 4️⃣ Fetch raw transactions for last 30 days (expenses) and last 60 days (income)
    const [last30DayExpenseTransactions, last60DayIncomeTransactions] = await Promise.all([
      Expense.find({ userId, date: { $gte: threshold30 } })
             .sort({ date: -1 })
             .lean(),
      Income.find({ userId, date: { $gte: threshold60 } })
            .sort({ date: -1 })
            .lean()
    ]);

    // 5️⃣ Build your “recentTransactions” as the top 5 across both
    const [recentIncomes, recentExpenses] = await Promise.all([
      Income.find({ userId }).sort({ date: -1 }).limit(5).lean(),
      Expense.find({ userId }).sort({ date: -1 }).limit(5).lean()
    ]);

    const recentTransactions = [
      ...recentIncomes.map(i => ({
        id:     i._id,
        type:   'income',
        source: i.source,
        icon:   i.icon,
        amount: i.amount,
        date:   i.date,
      })),
      ...recentExpenses.map(e => ({
        id:       e._id,
        type:     'expense',
        category: e.category,
        icon:     e.icon,
        amount:   e.amount,
        date:     e.date,
      }))
    ]
    .sort((a, b) => b.date - a.date)
    .slice(0, 5);

    // 6️⃣ Return sums + transaction arrays
    return res.json({
      totalBalance:          totalIncome - totalExpense,
      totalIncome,
      totalExpense,

      last30DaysExpense:     last30DayExpenseTransactions, // array of Expense docs
      last60DaysIncome:      last60DayIncomeTransactions,  // array of Income docs
      recentTransactions,                                // top-5 mixed list
    });
  } catch (error) {
    console.error('Error in getDashboardData:', error);
    return res.status(500).json({
      message: 'Server error',
      error:   error.message,
    });
  }
};
