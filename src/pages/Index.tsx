import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Calculator, Clock, Percent } from "lucide-react";
import { cn } from '@/lib/utils';
import { calculateResult } from '@/utils/calculator';

const Index = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-indigo-900">Productivity Calculator</h1>
          <p className="text-slate-600">Perform calculations, time operations, and percentage computations</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="flex gap-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter calculation (e.g., '2 + 2' or '2:30 + 1:15' or '20% of 100')"
              className="text-lg"
            />
            <Button onClick={handleCalculate} className="bg-indigo-600 hover:bg-indigo-700">
              Calculate
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="text-indigo-600" />
                <h3 className="font-semibold text-indigo-900">Basic Math</h3>
              </div>
              <p className="text-sm text-slate-600">Use +, -, ×, / for basic calculations</p>
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