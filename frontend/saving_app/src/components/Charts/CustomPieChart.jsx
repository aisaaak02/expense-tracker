// src/components/Charts/CustomPieChart.jsx
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CustomPieChart = ({ data, label, totalAmount, colors }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={360}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={2}
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          {/* Center text: label and amount */}
          <text x="50%" y="45%" textAnchor="middle" fill="#555" fontSize={14}>
            {label}
          </text>
          <text x="50%" y="55%" textAnchor="middle" fill="#111" fontSize={20} fontWeight={600}>
            ${totalAmount}
          </text>
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-sm text-gray-700">{entry.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default CustomPieChart;
