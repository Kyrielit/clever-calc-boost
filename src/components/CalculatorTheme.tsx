import React from 'react';
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from '@/lib/utils';

interface CalculatorThemeProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const CalculatorTheme = ({ isDarkMode, setIsDarkMode }: CalculatorThemeProps) => {
  return (
    <div className="flex items-center gap-4 p-2 rounded-lg bg-background/50 backdrop-blur-sm">
      <Switch
        checked={isDarkMode}
        onCheckedChange={setIsDarkMode}
        className={cn(
          "data-[state=checked]:bg-primary",
          "transition-all duration-300"
        )}
      />
      {isDarkMode ? (
        <Moon className="h-5 w-5 text-primary animate-in fade-in-50" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500 animate-in fade-in-50" />
      )}
    </div>
  );
};

export default CalculatorTheme;