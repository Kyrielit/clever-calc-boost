import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Grid, Brain } from "lucide-react";
import { cn } from '@/lib/utils';

const MemoryGrid = () => {
  const [grid, setGrid] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [showPattern, setShowPattern] = useState(true);
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const generateGrid = () => {
    const gridSize = Math.min(level + 2, 9);
    const sequence = Array.from(
      { length: gridSize },
      () => Math.floor(Math.random() * 9)
    );
    setGrid(sequence);
    setShowPattern(true);
    setTimeout(() => setShowPattern(false), 2000 + (level * 500));
    setUserSequence([]);
  };

  const startGame = () => {
    setIsPlaying(true);
    setLevel(1);
    generateGrid();
  };

  const handleCellClick = (index: number) => {
    if (showPattern) return;
    
    const newSequence = [...userSequence, index];
    setUserSequence(newSequence);

    if (newSequence.length === grid.length) {
      const isCorrect = newSequence.every((num, i) => num === grid[i]);
      if (isCorrect) {
        toast({
          title: "Correct! 🎉",
          description: `Moving to level ${level + 1}`,
        });
        setLevel(prev => prev + 1);
        setTimeout(generateGrid, 1000);
      } else {
        toast({
          title: "Game Over! 🎮",
          description: `You reached level ${level}!`,
          variant: "destructive",
        });
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Grid className="w-6 h-6 text-emerald-500" />
          <h2 className="text-xl font-bold">Memory Grid</h2>
        </div>
        <div className="text-sm font-medium">Level: {level}</div>
      </div>

      {!isPlaying ? (
        <Button 
          onClick={startGame}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
        >
          Start Game
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, index) => (
              <Button
                key={index}
                onClick={() => handleCellClick(index)}
                className={cn(
                  "h-20 w-full",
                  showPattern && grid.includes(index)
                    ? "bg-emerald-500"
                    : userSequence.includes(index)
                    ? "bg-blue-500"
                    : "bg-gray-200 hover:bg-gray-300"
                )}
              />
            ))}
          </div>
          {!showPattern && (
            <p className="text-center text-sm text-gray-600">
              Click the cells in the same order they appeared
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MemoryGrid;