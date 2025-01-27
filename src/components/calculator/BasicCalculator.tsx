import React from 'react';
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { calculateResult } from '@/utils/calculator';

interface BasicCalculatorProps {
  isDarkMode: boolean;
  setInput: (value: string) => void;
}

const BasicCalculator = ({ isDarkMode, setInput }: BasicCalculatorProps) => {
  const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];
  const operators = ['+', '-', '×', '÷', '=', 'C'];
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '=') {
      const currentInput = document.querySelector('input')?.value || '';
      try {
        const processedInput = currentInput
          .replace(/×/g, '*')
          .replace(/÷/g, '/');
        const result = calculateResult(processedInput);
        setInput(result.toString());
      } catch (error) {
        setInput('Error');
      }
    } else {
      const currentInput = document.querySelector('input')?.value || '';
      setInput(currentInput + value);
    }
  };

  return (
    <div className="space-y-4 px-2 sm:px-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mb-4">
        <div className={cn(
          "p-3 rounded-lg",
          isDarkMode ? "bg-gray-700" : "bg-indigo-50"
        )}>
          <div className="flex items-center gap-2 mb-1">
            <Calculator className={cn("h-4 w-4 sm:h-5 sm:w-5", isDarkMode ? "text-indigo-400" : "text-indigo-600")} />
            <h3 className={cn(
              "font-semibold text-sm sm:text-base",
              isDarkMode ? "text-gray-200" : "text-indigo-900"
            )}>Basic Math</h3>
          </div>
          <p className={cn(
            "text-xs sm:text-sm",
            isDarkMode ? "text-gray-400" : "text-slate-600"
          )}>Use +, -, ×, /, (), ^, sqrt()</p>
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          isDarkMode ? "bg-gray-700" : "bg-purple-50"
        )}>
          <div className="flex items-center gap-2 mb-1">
            <Calculator className={cn("h-4 w-4 sm:h-5 sm:w-5", isDarkMode ? "text-purple-400" : "text-purple-600")} />
            <h3 className={cn(
              "font-semibold text-sm sm:text-base",
              isDarkMode ? "text-gray-200" : "text-purple-900"
            )}>Time Calc</h3>
          </div>
          <p className={cn(
            "text-xs sm:text-sm",
            isDarkMode ? "text-gray-400" : "text-slate-600"
          )}>Format: HH:MM + HH:MM</p>
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          isDarkMode ? "bg-gray-700" : "bg-pink-50"
        )}>
          <div className="flex items-center gap-2 mb-1">
            <Calculator className={cn("h-4 w-4 sm:h-5 sm:w-5", isDarkMode ? "text-pink-400" : "text-pink-600")} />
            <h3 className={cn(
              "font-semibold text-sm sm:text-base",
              isDarkMode ? "text-gray-200" : "text-pink-900"
            )}>Percentages</h3>
          </div>
          <p className={cn(
            "text-xs sm:text-sm",
            isDarkMode ? "text-gray-400" : "text-slate-600"
          )}>Format: X% of Y</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {numbers.map((num) => (
          <Button
            key={num}
            onClick={() => handleButtonClick(num)}
            variant={isDarkMode ? "outline" : "secondary"}
            className={cn(
              "h-10 sm:h-12 text-base sm:text-lg font-medium",
              isDarkMode ? "border-gray-600 hover:bg-gray-700" : "hover:bg-gray-100"
            )}
          >
            {num}
          </Button>
        ))}
        
        {operators.map((op) => (
          <Button
            key={op}
            onClick={() => handleButtonClick(op)}
            variant="default"
            className={cn(
              "h-10 sm:h-12 text-base sm:text-lg font-medium",
              isDarkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-500 hover:bg-indigo-600"
            )}
          >
            {op}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
        {alphabet.map((letter) => (
          <Button
            key={letter}
            onClick={() => handleButtonClick(letter)}
            variant={isDarkMode ? "outline" : "secondary"}
            className={cn(
              "h-10 sm:h-12 text-base sm:text-lg font-medium",
              isDarkMode ? "border-gray-600 hover:bg-gray-700" : "hover:bg-gray-100"
            )}
          >
            {letter}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BasicCalculator;