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
    <div className="flex items-center gap-4">
      <Switch
        checked={isDarkMode}
        onCheckedChange={setIsDarkMode}
        className={cn(
          "data-[state=checked]:bg-indigo-600",
          "transition-all duration-300"
        )}
      />
      {isDarkMode ? (
        <Moon className="h-5 w-5 text-gray-200" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500" />
      )}
    </div>
  );
};

export default CalculatorTheme;