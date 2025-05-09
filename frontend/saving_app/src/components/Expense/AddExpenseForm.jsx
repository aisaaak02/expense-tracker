import React, { useState } from "react";
import Input from "../inputs/input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setExpense(prev => ({ ...prev, [key]: value }));

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={icon => handleChange("icon", icon)}
      />

      {/* CATEGORY */}
      <Input
        value={expense.category}
        onChange={e => handleChange("category", e.target.value)}
        label="Expense Category"
        placeholder="Enter expense category"
        type="text"
      />

      {/* AMOUNT */}
      <Input
        value={expense.amount}
        onChange={e => handleChange("amount", e.target.value)}
        label="Expense Amount"
        placeholder="Enter expense amount"
        type="number"
      />

      {/* DATE */}
      <Input
        value={expense.date}
        onChange={e => handleChange("date", e.target.value)}
        label="Expense Date"
        placeholder="Enter expense date"
        type="date"
      />

      {/* SUBMIT */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
