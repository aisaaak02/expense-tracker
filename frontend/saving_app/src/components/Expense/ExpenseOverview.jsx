import React from "react";
import {LuPlus} from "react-icons/lu";
//import CustomBarChart from "../charts/CustomBarChart";
import { prepareExpenseBarChartData } from "../../utils/helper";



const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className = "">
          <h5 className="text-lg">Expense overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spendings over time and analyze your expense trends. 
          </p>
        </div>

        <button className="add-btn" onClick={onExpenseIncome}>
          <LuPlus className="text-lg" />
          Add expense
        </button>

        
      </div>
    </div>
  );
};

export default ExpenseOverview;
