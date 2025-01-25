import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Calculator, Brain } from "lucide-react";
import { cn } from '@/lib/utils';
import { calculateResult } from '@/utils/calculator';
import { Toggle } from "@/components/ui/toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CalculatorTheme from '@/components/CalculatorTheme';
import CalculatorGame from '@/components/CalculatorGame';
import NumberMemory from '@/components/games/NumberMemory';
import SpeedMath from '@/components/games/SpeedMath';

const Index = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScientific, setIsScientific] = useState(false);
  const { toast } = useToast();
  const [activeGame, setActiveGame] = useState<'none' | 'math-challenge' | 'number-memory' | 'speed-math'>('none');

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

  const renderCalculator = () => (
    <div className={cn(
      "rounded-xl shadow-lg p-8 space-y-6 backdrop-blur-sm min-h-[500px]", // Increased padding and added min-height
      isDarkMode 
        ? "bg-gray-800/50 border border-gray-700" 
        : "bg-white/50 border border-gray-200"
    )}>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={isScientific ? "Enter scientific calculation (e.g., 'sin(30)', 'log(100)')" : "Enter calculation"}
        className={cn(
          "text-lg h-12", // Increased input height
          isDarkMode ? "bg-gray-700 text-white border-gray-600" : ""
        )}
      />
      <Button onClick={handleCalculate} className="bg-indigo-600 hover:bg-indigo-700 h-12 text-lg w-full">
        Calculate
      </Button>

      <div className="flex gap-2 justify-center">
        <Button onClick={() => handleMemoryOperation('MC')} variant="outline" size="sm">MC</Button>
        <Button onClick={() => handleMemoryOperation('MR')} variant="outline" size="sm">MR</Button>
        <Button onClick={() => handleMemoryOperation('M+')} variant="outline" size="sm">M+</Button>
        <Button onClick={() => handleMemoryOperation('M-')} variant="outline" size="sm">M-</Button>
      </div>

      {isScientific && (
        <>
          <div className="grid grid-cols-4 gap-3 mt-6">
            {['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', '√', 'π', 'e', '^', 'abs', 'fact', 'cbrt'].map((op) => (
              <Button
                key={op}
                variant="outline"
                onClick={() => setInput(prev => prev + op + (op !== 'π' && op !== 'e' ? '(' : ''))}
                className={cn(
                  isDarkMode ? "border-gray-600 text-gray-200" : "",
                  "h-14 text-lg" // Increased button height
                )}
              >
                {op}
              </Button>
            ))}
          </div>
          
          <div className={cn(
            "mt-4 p-4 rounded-lg",
            isDarkMode ? "bg-gray-700" : "bg-indigo-50"
          )}>
            <h3 className={cn(
              "font-semibold mb-2",
              isDarkMode ? "text-gray-200" : "text-indigo-900"
            )}>
              Common Formulas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                { name: 'Circle Area', formula: 'πr²' },
                { name: 'Rectangle Area', formula: 'l×w' },
                { name: 'Triangle Area', formula: '½bh' },
                { name: 'Sphere Volume', formula: '⁴⁄₃πr³' },
                { name: 'Cylinder Volume', formula: 'πr²h' },
                { name: 'Cube Volume', formula: 'a³' },
                { name: 'Velocity', formula: 'd/t' },
                { name: 'Force', formula: 'F=ma' },
                { name: 'Quadratic', formula: '(-b±√(b²-4ac))/2a' }
              ].map((formula) => (
                <div
                  key={formula.name}
                  className={cn(
                    "p-2 rounded text-sm",
                    isDarkMode ? "bg-gray-600" : "bg-white",
                    "cursor-pointer hover:opacity-80 transition-opacity"
                  )}
                  onClick={() => {
                    toast({
                      title: formula.name,
                      description: `Formula: ${formula.formula}`,
                    });
                  }}
                >
                  <div className="font-medium">{formula.name}</div>
                  <div className="text-xs opacity-80">{formula.formula}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {history.length > 0 && (
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
      )}
    </div>
  );

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800" 
        : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50",
      "p-8"
    )}>
      <div className="max-w-3xl mx-auto space-y-8"> {/* Increased max-width */}
        <div className="flex justify-between items-center">
          <CalculatorTheme isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <div className="flex gap-4">
            <Toggle
              pressed={isScientific}
              onPressedChange={setIsScientific}
              className="gap-2 bg-opacity-80 backdrop-blur-sm h-12 px-4" // Increased height
            >
              {isScientific ? <Brain className="h-5 w-5" /> : <Calculator className="h-5 w-5" />}
              {isScientific ? 'Scientific' : 'Advanced'}
            </Toggle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className={cn(
                  "gap-2 bg-opacity-80 backdrop-blur-sm h-12 px-6", // Increased height and padding
                  activeGame === 'none' && "bg-primary text-primary-foreground"
                )}
                onClick={() => setActiveGame('none')}
              >
                <Calculator className="h-5 w-5" />
                Calculator
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "gap-2 bg-opacity-80 backdrop-blur-sm h-12 px-6", // Increased height and padding
                      activeGame !== 'none' && "bg-primary text-primary-foreground"
                    )}
                  >
                    <span className="text-xl">🎮</span>
                    Games
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 p-2"> {/* Increased width and padding */}
                  <DropdownMenuItem className="h-12 text-lg" onClick={() => setActiveGame('math-challenge')}>
                    <Brain className="h-5 w-5 mr-2" />
                    Math Challenge
                  </DropdownMenuItem>
                  <DropdownMenuItem className="h-12 text-lg" onClick={() => setActiveGame('number-memory')}>
                    <span className="mr-2 text-xl">🧠</span>
                    Number Memory
                  </DropdownMenuItem>
                  <DropdownMenuItem className="h-12 text-lg" onClick={() => setActiveGame('speed-math')}>
                    <span className="mr-2 text-xl">⚡</span>
                    Speed Math
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

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
              : 'Speed Math'}
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
              : "Race against time to solve math problems!"}
          </p>
        </div>

        {activeGame === 'none' ? (
          renderCalculator()
        ) : activeGame === 'math-challenge' ? (
          <CalculatorGame />
        ) : activeGame === 'number-memory' ? (
          <NumberMemory />
        ) : (
          <SpeedMath />
        )}
      </div>
    </div>
  );
};

export default Index;
