import React from 'react';
import { Calculator } from "lucide-react";
import { cn } from '@/lib/utils';

interface BasicCalculatorProps {
  isDarkMode: boolean;
}

const BasicCalculator = ({ isDarkMode }: BasicCalculatorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className={cn(
        "p-4 rounded-lg",
        isDarkMode ? "bg-gray-700" : "bg-indigo-50"
      )}>
        <div className="flex items-center gap-2 mb-2">
          <Calculator className={isDarkMode ? "text-indigo-400" : "text-indigo-600"} />
          <h3 className={cn(
            "font-semibold",
            isDarkMode ? "text-gray-200" : "text-indigo-900"
          )}>Basic Math</h3>
        </div>
        <p className={cn(
          "text-sm",
          isDarkMode ? "text-gray-400" : "text-slate-600"
        )}>Use +, -, ×, /, (), ^, sqrt()</p>
      </div>
      <div className={cn(
        "p-4 rounded-lg",
        isDarkMode ? "bg-gray-700" : "bg-purple-50"
      )}>
        <div className="flex items-center gap-2 mb-2">
          <Calculator className={isDarkMode ? "text-purple-400" : "text-purple-600"} />
          <h3 className={cn(
            "font-semibold",
            isDarkMode ? "text-gray-200" : "text-purple-900"
          )}>Time Calc</h3>
        </div>
        <p className={cn(
          "text-sm",
          isDarkMode ? "text-gray-400" : "text-slate-600"
        )}>Format: HH:MM + HH:MM</p>
      </div>
      <div className={cn(
        "p-4 rounded-lg",
        isDarkMode ? "bg-gray-700" : "bg-pink-50"
      )}>
        <div className="flex items-center gap-2 mb-2">
          <Calculator className={isDarkMode ? "text-pink-400" : "text-pink-600"} />
          <h3 className={cn(
            "font-semibold",
            isDarkMode ? "text-gray-200" : "text-pink-900"
          )}>Percentages</h3>
        </div>
        <p className={cn(
          "text-sm",
          isDarkMode ? "text-gray-400" : "text-slate-600"
        )}>Format: X% of Y</p>
      </div>
    </div>
  );
};

export default BasicCalculator;