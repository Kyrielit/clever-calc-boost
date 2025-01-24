import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Calculator, Clock, Percent, Square, Power, Brain } from "lucide-react";
import { cn } from '@/lib/utils';
import { calculateResult } from '@/utils/calculator';

const Index = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState<number>(0);
  const { toast } = useToast();

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-indigo-900">Advanced Calculator</h1>
          <p className="text-slate-600">Perform advanced calculations including math, time, and memory operations</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="flex gap-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter calculation (e.g., 'sqrt(16)', '2^3', '20% of 100')"
              className="text-lg"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="text-indigo-600" />
                <h3 className="font-semibold text-indigo-900">Basic Math</h3>
              </div>
              <p className="text-sm text-slate-600">Use +, -, ×, /, (), ^, sqrt()</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-purple-600" />
                <h3 className="font-semibold text-purple-900">Time Calc</h3>
              </div>
              <p className="text-sm text-slate-600">Format: HH:MM + HH:MM</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="text-pink-600" />
                <h3 className="font-semibold text-pink-900">Percentages</h3>
              </div>
              <p className="text-sm text-slate-600">Format: X% of Y</p>
            </div>
          </div>

          {history.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-semibold text-slate-700 mb-2">History</h3>
              <div className="space-y-2">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-2 rounded",
                      index % 2 === 0 ? "bg-slate-50" : "bg-white"
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