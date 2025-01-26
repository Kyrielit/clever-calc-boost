import React from 'react';
import { cn } from '@/lib/utils';

interface CalculatorTitleProps {
  isDarkMode: boolean;
  isScientific: boolean;
  activeGame: 'none' | 'math-challenge' | 'number-memory' | 'speed-math' | 'memory-grid' | 'math-sequence' | 'math-puzzle' | 'pattern-match' | 'quick-calc' | 'number-series' | 'math-grid';
}

const CalculatorTitle = ({ isDarkMode, isScientific, activeGame }: CalculatorTitleProps) => {
  return (
    <div className="text-center space-y-2 my-8">
      <h1 className={cn(
        "text-4xl font-bold bg-clip-text text-transparent animate-in fade-in-50 duration-1000",
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
          : activeGame === 'math-sequence'
          ? 'Math Sequence'
          : activeGame === 'math-puzzle'
          ? 'Math Puzzle'
          : activeGame === 'pattern-match'
          ? 'Pattern Match'
          : activeGame === 'quick-calc'
          ? 'Quick Calc'
          : activeGame === 'number-series'
          ? 'Number Series'
          : 'Math Grid'}
      </h1>
      <p className={cn(
        "text-lg animate-in fade-in-50 duration-1000 delay-200",
        isDarkMode ? "text-gray-300" : "text-slate-600"
      )}>
        {activeGame === 'none'
          ? `Perform ${isScientific ? 'scientific' : 'advanced'} calculations with ease`
          : activeGame === 'math-challenge'
          ? "Challenge yourself with quick math problems!"
          : activeGame === 'number-memory'
          ? "Test your memory by remembering number sequences!"
          : activeGame === 'speed-math'
          ? "Race against time to solve math problems!"
          : activeGame === 'memory-grid'
          ? "Remember and recreate patterns on the grid!"
          : activeGame === 'math-sequence'
          ? "Predict the next number in the sequence!"
          : activeGame === 'math-puzzle'
          ? "Solve mathematical puzzles and improve your skills!"
          : activeGame === 'pattern-match'
          ? "Match the pattern sequence to advance!"
          : activeGame === 'quick-calc'
          ? "Solve calculations quickly before time runs out!"
          : activeGame === 'number-series'
          ? "Find the next number in the series!"
          : "Select numbers that sum up to the target!"}
      </p>
    </div>
  );
};

export default CalculatorTitle;