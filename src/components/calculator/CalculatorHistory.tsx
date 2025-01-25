import React from 'react';
import { cn } from '@/lib/utils';

interface CalculatorHistoryProps {
  isDarkMode: boolean;
  history: string[];
}

const CalculatorHistory = ({ isDarkMode, history }: CalculatorHistoryProps) => {
  if (history.length === 0) return null;
  
  return (
    <div className={cn(
      "border-t pt-4",
      isDarkMode ? "border-gray-700" : ""
    )}>
      <h3 className={cn(
        "font-semibold mb-2",
        isDarkMode ? "text-gray-200" : "text-slate-700"
      )}>History</h3>
      <div className="space-y-2">
        {history.map((item, index) => (
          <div
            key={index}
            className={cn(
              "p-2 rounded",
              isDarkMode
                ? index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                : index % 2 === 0 ? "bg-slate-50" : "bg-white"
            )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalculatorHistory;