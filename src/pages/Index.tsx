import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Calculator, Moon, Sun, Calculator as CalculatorIcon, Brain } from "lucide-react";
import { cn } from '@/lib/utils';
import { calculateResult } from '@/utils/calculator';
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";

const Index = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScientific, setIsScientific] = useState(false);
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

  const scientificOperations = [
    'sin', 'cos', 'tan',
    'asin', 'acos', 'atan',
    'log', 'ln', '√',
    'π', 'e', '^',
    'abs', 'fact', 'cbrt'
  ];

  const commonFormulas = [
    { name: 'Circle Area', formula: 'πr²' },
    { name: 'Rectangle Area', formula: 'l×w' },
    { name: 'Triangle Area', formula: '½bh' },
    { name: 'Sphere Volume', formula: '⁴⁄₃πr³' },
    { name: 'Cylinder Volume', formula: 'πr²h' },
    { name: 'Cube Volume', formula: 'a³' },
    { name: 'Velocity', formula: 'd/t' },
    { name: 'Force', formula: 'F=ma' },
    { name: 'Quadratic', formula: '(-b±√(b²-4ac))/2a' }
  ];

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-indigo-50 to-purple-50",
      "p-8"
    )}>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="data-[state=checked]:bg-indigo-600"
            />
            {isDarkMode ? <Moon className="h-5 w-5 text-gray-200" /> : <Sun className="h-5 w-5 text-yellow-500" />}
          </div>
          <Toggle
            pressed={isScientific}
            onPressedChange={setIsScientific}
            className="gap-2"
          >
            {isScientific ? <Brain className="h-5 w-5" /> : <CalculatorIcon className="h-5 w-5" />}
            {isScientific ? 'Scientific' : 'Advanced'}
          </Toggle>
        </div>

        <div className="text-center space-y-2">
          <h1 className={cn(
            "text-4xl font-bold",
            isDarkMode ? "text-white" : "text-indigo-900"
          )}>
            {isScientific ? 'Scientific Calculator' : 'Advanced Calculator'}
          </h1>
          <p className={cn(
            isDarkMode ? "text-gray-300" : "text-slate-600"
          )}>
            Perform {isScientific ? 'scientific' : 'advanced'} calculations including math, time, and memory operations
          </p>
        </div>

        <div className={cn(
          "rounded-xl shadow-lg p-6 space-y-6",
          isDarkMode ? "bg-gray-800" : "bg-white"
        )}>
          <div className="flex gap-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isScientific ? "Enter scientific calculation (e.g., 'sin(30)', 'log(100)')" : "Enter calculation"}
              className={cn(
                "text-lg",
                isDarkMode ? "bg-gray-700 text-white border-gray-600" : ""
              )}
            />
            <Button onClick={handleCalculate} className="bg-indigo-600 hover:bg-indigo-700">
              Calculate
            </Button>
          </div>

          <div className="flex gap-2 justify-center">
            <Button onClick={() => handleMemoryOperation('MC')} variant="outline" size="sm">MC</Button>
            <Button onClick={() => handleMemoryOperation('MR')} variant="outline" size="sm">MR</Button>
            <Button onClick={() => handleMemoryOperation('M+')} variant="outline" size="sm">M+</Button>
            <Button onClick={() => handleMemoryOperation('M-')} variant="outline" size="sm">M-</Button>
          </div>

          {isScientific && (
            <>
              <div className="grid grid-cols-4 gap-2">
                {scientificOperations.map((op) => (
                  <Button
                    key={op}
                    variant="outline"
                    onClick={() => setInput(prev => prev + op + (op !== 'π' && op !== 'e' ? '(' : ''))}
                    className={cn(
                      isDarkMode ? "border-gray-600 text-gray-200" : "",
                      "h-12"
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
                  {commonFormulas.map((formula) => (
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

          {!isScientific && (
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
      </div>
    </div>
  );
};

export default Index;
