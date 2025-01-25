import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

interface ScientificButtonsProps {
  isDarkMode: boolean;
  setInput: (value: string) => void;
}

const ScientificButtons = ({ isDarkMode, setInput }: ScientificButtonsProps) => {
  const { toast } = useToast();
  
  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', '√', 'π', 'e', '^', 'abs', 'fact', 'cbrt'].map((op) => (
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
  );
};

export default ScientificButtons;