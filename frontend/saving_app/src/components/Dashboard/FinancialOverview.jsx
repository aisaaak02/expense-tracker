import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { addThousandsSeparator } from '../../utils/helper';


const FinancialOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const data = [
    { name: 'Total Balance', value: totalBalance },
    { name: 'Total Expenses', value: totalExpense },
    { name: 'Total Income', value: totalIncome },
  ];

  // Colors correspond to data order: balance (purple), expense (red), income (orange)
  const colors = ['#8B5CF6', '#EF4444', '#F97316'];

  return (
    <div className="card">
      <h5 className="text-lg mb-4">Financial Overview</h5>
      <CustomPieChart
        data={data}
        label="Total Balance"
        totalAmount={addThousandsSeparator(totalBalance)}
        colors={colors}
      />
    </div>
  );
};

export default FinancialOverview;
