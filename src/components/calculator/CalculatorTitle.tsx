import React from 'react';
import { cn } from '@/lib/utils';

interface CalculatorTitleProps {
  isDarkMode: boolean;
  isScientific: boolean;
  activeGame: 'none' | 'math-challenge' | 'number-memory' | 'speed-math' | 'memory-grid' | 'math-sequence';
}

const CalculatorTitle = ({ isDarkMode, isScientific, activeGame }: CalculatorTitleProps) => {
  return (
    <div className="text-center space-y-2">
      <h1 className={cn(
        "text-4xl font-bold bg-clip-text text-transparent",
        isDarkMode 
          ? "bg-gradient-to-r from-purple-400 to-pink-300" 
          : "bg-gradient-to-r from-purple-600 to-indigo-600"
      )}>
        {activeGame === 'none' 
          ? (isScientific ? 'Scientific Calculator' : 'Advanced Calculator')
          : activeGame === 'math-challenge'
          ? 'Math Challenge'
          : activeGame === 'number-memory'
          ? 'Number Memory'
          : activeGame === 'speed-math'
          ? 'Speed Math'
          : activeGame === 'memory-grid'
          ? 'Memory Grid'
          : 'Math Sequence'}
      </h1>
      <p className={cn(
        "text-lg",
        isDarkMode ? "text-gray-300" : "text-slate-600"
      )}>
        {activeGame === 'none'
          ? `Perform ${isScientific ? 'scientific' : 'advanced'} calculations including math, time, and memory operations`
          : activeGame === 'math-challenge'
          ? "Challenge yourself with quick math problems!"
          : activeGame === 'number-memory'
          ? "Test your memory by remembering number sequences!"
          : activeGame === 'speed-math'
          ? "Race against time to solve math problems!"
          : activeGame === 'memory-grid'
          ? "Remember and recreate patterns on a grid!"
          : "Predict the next number in the sequence!"}
      </p>
    </div>
  );
};

export default CalculatorTitle;