// TransactionInfoCard.jsx
import React from 'react';
import { LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu';

const TransactionInfoCard = ({
  title,
  icon,            // now: a React node, e.g. <LuUtensils /> or any custom icon
  date,            // formatted date string
  amount,          // number or string
  type,            // 'income' or 'expense'
  hideDeleteBtn,   // boolean
}) => {
  const isExpense = type === 'expense';

  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50">
      {/* Left: user-passed icon + title/date */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-full">
          {icon}
        </div>
        <div>
          <h6 className="text-base font-medium text-gray-800">{title}</h6>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>

      {/* Right: amount + arrow + (optional) delete */}
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-1 ${isExpense ? 'text-red-500' : 'text-green-500'}`}>
          {isExpense ? <LuTrendingDown /> : <LuTrendingUp />}
          <span className="font-medium">
            {isExpense ? `- $${amount}` : `+ $${amount}`}
          </span>
        </div>
        {!hideDeleteBtn && (
          <button className="text-gray-400 hover:text-red-500">
            <LuTrash2 />
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionInfoCard;
