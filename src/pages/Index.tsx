import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { calculateResult } from '@/utils/calculator';
import CalculatorGame from '@/components/CalculatorGame';
import NumberMemory from '@/components/games/NumberMemory';
import SpeedMath from '@/components/games/SpeedMath';
import MemoryGrid from '@/components/games/MemoryGrid';
import MathSequence from '@/components/games/MathSequence';
import MathPuzzle from '@/components/games/MathPuzzle';
import PatternMatch from '@/components/games/PatternMatch';
import QuickCalc from '@/components/games/QuickCalc';
import NumberSeries from '@/components/games/NumberSeries';
import MathGrid from '@/components/games/MathGrid';
import CalculatorHeader from '@/components/calculator/CalculatorHeader';
import CalculatorTitle from '@/components/calculator/CalculatorTitle';
import ScientificButtons from '@/components/calculator/ScientificButtons';
import BasicCalculator from '@/components/calculator/BasicCalculator';
import CalculatorHistory from '@/components/calculator/CalculatorHistory';

const Index = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScientific, setIsScientific] = useState(false);
  const { toast } = useToast();
  const [activeGame, setActiveGame] = useState<'none' | 'math-challenge' | 'number-memory' | 'speed-math' | 'memory-grid' | 'math-sequence' | 'math-puzzle' | 'pattern-match' | 'quick-calc' | 'number-series' | 'math-grid'>('none');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleCalculate = () => {
    try {
      const result = calculateResult(input);
      setHistory(prev => [...prev, `${input} = ${result}`]);
      setInput('');
      toast({
        title: "Calculation complete",
        description: `${input} = ${result}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Invalid input",
        variant: "destructive",
      });
    }
  };

  const handleMemoryOperation = (operation: 'MC' | 'MR' | 'M+' | 'M-') => {
    try {
      const currentValue = parseFloat(calculateResult(input) || '0');
      
      switch (operation) {
        case 'MC':
          setMemory(0);
          toast({ title: "Memory cleared" });
          break;
        case 'MR':
          setInput(memory.toString());
          break;
        case 'M+':
          setMemory(memory + currentValue);
          toast({ title: "Added to memory" });
          break;
        case 'M-':
          setMemory(memory - currentValue);
          toast({ title: "Subtracted from memory" });
          break;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid memory operation",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800" 
        : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50",
      "p-4 sm:p-8"
    )}>
      <div className="max-w-3xl mx-auto space-y-6">
        <CalculatorTitle
          isDarkMode={isDarkMode}
          isScientific={isScientific}
          activeGame={activeGame}
        />

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
            "rounded-xl shadow-lg p-8 space-y-6 backdrop-blur-sm",
            isDarkMode 
              ? "bg-gray-800/50 border border-gray-700" 
              : "bg-white/50 border border-gray-200"
          )}>
            <Input
              value={input}
              readOnly
              placeholder={isScientific ? "Enter scientific calculation (e.g., 'sin(30)', 'log(100)')" : "Enter calculation"}
              className={cn(
                "text-lg h-12",
                isDarkMode ? "bg-gray-700 text-white border-gray-600" : ""
              )}
            />
            <Button onClick={handleCalculate} className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-lg">
              Calculate
            </Button>

            <div className="flex gap-2 justify-center">
              <Button onClick={() => handleMemoryOperation('MC')} variant="outline" size="sm">MC</Button>
              <Button onClick={() => handleMemoryOperation('MR')} variant="outline" size="sm">MR</Button>
              <Button onClick={() => handleMemoryOperation('M+')} variant="outline" size="sm">M+</Button>
              <Button onClick={() => handleMemoryOperation('M-')} variant="outline" size="sm">M-</Button>
            </div>

            <BasicCalculator isDarkMode={isDarkMode} setInput={setInput} />

            {isScientific && (
              <ScientificButtons isDarkMode={isDarkMode} setInput={setInput} />
            )}

            <CalculatorHistory isDarkMode={isDarkMode} history={history} />
          </div>
        ) : activeGame === 'math-challenge' ? (
          <CalculatorGame />
        ) : activeGame === 'number-memory' ? (
          <NumberMemory />
        ) : activeGame === 'speed-math' ? (
          <SpeedMath />
        ) : activeGame === 'memory-grid' ? (
          <MemoryGrid />
        ) : activeGame === 'math-sequence' ? (
          <MathSequence />
        ) : activeGame === 'math-puzzle' ? (
          <MathPuzzle />
        ) : activeGame === 'pattern-match' ? (
          <PatternMatch />
        ) : activeGame === 'quick-calc' ? (
          <QuickCalc />
        ) : activeGame === 'number-series' ? (
          <NumberSeries />
        ) : (
          <MathGrid />
        )}
      </div>
    </div>
  );
};

export default Index;
