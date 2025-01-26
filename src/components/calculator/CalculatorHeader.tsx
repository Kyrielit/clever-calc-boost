import React from 'react';
import { Calculator, Brain, Grid, Puzzle } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import CalculatorTheme from '@/components/CalculatorTheme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CalculatorHeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  isScientific: boolean;
  setIsScientific: (value: boolean) => void;
  activeGame: 'none' | 'math-challenge' | 'number-memory' | 'speed-math';
  setActiveGame: (game: 'none' | 'math-challenge' | 'number-memory' | 'speed-math') => void;
}

const CalculatorHeader = ({
  isDarkMode,
  setIsDarkMode,
  isScientific,
  setIsScientific,
  activeGame,
  setActiveGame
}: CalculatorHeaderProps) => {
  return (
    <div className="flex justify-between items-start bg-card/50 backdrop-blur-sm rounded-lg p-4 shadow-lg">
      <CalculatorTheme isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="flex flex-col gap-2">
        <Toggle
          pressed={isScientific}
          onPressedChange={setIsScientific}
          className="gap-2 bg-opacity-80 backdrop-blur-sm h-12 px-4 hover:bg-primary/20 data-[state=on]:bg-primary/30"
        >
          {isScientific ? <Brain className="h-5 w-5" /> : <Calculator className="h-5 w-5" />}
          {isScientific ? 'Scientific' : 'Advanced'}
        </Toggle>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className={cn(
              "gap-2 bg-opacity-80 backdrop-blur-sm h-12 px-6 hover:bg-primary/20",
              activeGame === 'none' && "bg-primary text-primary-foreground hover:bg-primary/90"
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
                  "gap-2 bg-opacity-80 backdrop-blur-sm h-12 px-6 hover:bg-primary/20",
                  activeGame !== 'none' && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <span className="text-xl">🎮</span>
                Games
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2">
              <DropdownMenuItem className="h-12 text-lg cursor-pointer" onClick={() => setActiveGame('math-challenge')}>
                <Brain className="h-5 w-5 mr-2" />
                Math Challenge
              </DropdownMenuItem>
              <DropdownMenuItem className="h-12 text-lg cursor-pointer" onClick={() => setActiveGame('number-memory')}>
                <span className="mr-2 text-xl">🧠</span>
                Number Memory
              </DropdownMenuItem>
              <DropdownMenuItem className="h-12 text-lg cursor-pointer" onClick={() => setActiveGame('speed-math')}>
                <span className="mr-2 text-xl">⚡</span>
                Speed Math
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default CalculatorHeader;