import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import CalculatorHeader from '@/components/calculator/CalculatorHeader';
import CalculatorTitle from '@/components/calculator/CalculatorTitle';
import ScientificButtons from '@/components/calculator/ScientificButtons';
import BasicCalculator from '@/components/calculator/BasicCalculator';
import CalculatorHistory from '@/components/calculator/CalculatorHistory';
import CalculatorGame from '@/components/CalculatorGame';
import NumberMemory from '@/components/games/NumberMemory';
import SpeedMath from '@/components/games/SpeedMath';
import MemoryGrid from '@/components/games/MemoryGrid';
import MathSequence from '@/components/games/MathSequence';

const Index = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScientific, setIsScientific] = useState(false);
  const [activeGame, setActiveGame] = useState<'none' | 'math-challenge' | 'number-memory' | 'speed-math' | 'memory-grid' | 'math-sequence'>('none');
  const { toast } = useToast();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleCalculate = () => {
    try {
      const result = eval(input);
      setHistory(prev => [...prev, `${input} = ${result}`]);
      setInput(result.toString());
      toast({
        title: "Calculation complete",
        description: `${input} = ${result}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid calculation",
        variant: "destructive",
      });
    }
  };

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      handleCalculate();
    } else if (value === 'C') {
      setInput('');
    } else {
      setInput(prev => prev + value);
    }
  };

  const calculatorButtons = [
    ['C', '⌫', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '±', '='],
  ];

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300 p-8",
      isDarkMode ? "bg-background" : "bg-background"
    )}>
      <div className="max-w-md mx-auto space-y-8">
        <CalculatorHeader
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isScientific={isScientific}
          setIsScientific={setIsScientific}
          activeGame={activeGame}
          setActiveGame={setActiveGame}
        />

        {activeGame === 'none' ? (
          <div className={cn(
            "rounded-3xl shadow-lg p-8 space-y-6",
            isDarkMode ? "bg-card" : "bg-card"
          )}>
            <div className="text-right space-y-2">
              <div className="calculation-history">{history[history.length - 1] || ''}</div>
              <div className="display-text">{input || '0'}</div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {calculatorButtons.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {row.map((button, buttonIndex) => (
                    <button
                      key={buttonIndex}
                      onClick={() => handleButtonClick(button)}
                      className={cn(
                        button.match(/[0-9.]/) ? 'number-button' : 'operator-button',
                        button === 'C' && 'bg-destructive hover:bg-destructive/80'
                      )}
                    >
                      {button}
                    </button>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : activeGame === 'math-challenge' ? (
          <CalculatorGame />
        ) : activeGame === 'number-memory' ? (
          <NumberMemory />
        ) : activeGame === 'speed-math' ? (
          <SpeedMath />
        ) : activeGame === 'memory-grid' ? (
          <MemoryGrid />
        ) : (
          <MathSequence />
        )}
      </div>
    </div>
  );
};

export default Index;