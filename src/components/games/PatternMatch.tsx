import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Brain } from "lucide-react";

const PatternMatch = () => {
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [level, setLevel] = useState(1);
  const { toast } = useToast();

  const generatePattern = () => {
    const newPattern = Array.from(
      { length: level + 2 },
      () => Math.floor(Math.random() * 4)
    );
    setPattern(newPattern);
    showPattern(newPattern);
  };

  const showPattern = async (newPattern: number[]) => {
    setUserPattern([]);
    for (let i = 0; i < newPattern.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const button = document.getElementById(`pattern-${newPattern[i]}`);
      if (button) {
        button.classList.add('bg-purple-500');
        setTimeout(() => button.classList.remove('bg-purple-500'), 500);
      }
    }
  };

  const handleButtonClick = (index: number) => {
    if (!isPlaying) return;
    
    const newUserPattern = [...userPattern, index];
    setUserPattern(newUserPattern);

    if (newUserPattern.length === pattern.length) {
      if (newUserPattern.every((val, i) => val === pattern[i])) {
        toast({
          title: "Correct! 🎉",
          description: `Moving to level ${level + 1}`,
        });
        setLevel(prev => prev + 1);
        setTimeout(generatePattern, 1000);
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

  const startGame = () => {
    setIsPlaying(true);
    setLevel(1);
    generatePattern();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-indigo-500" />
          <h2 className="text-xl font-bold">Pattern Match</h2>
        </div>
        <div className="text-sm font-medium">Level: {level}</div>
      </div>

      {!isPlaying ? (
        <Button 
          onClick={startGame}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          Start Game
        </Button>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Button
              key={index}
              id={`pattern-${index}`}
              onClick={() => handleButtonClick(index)}
              className="h-24 transition-colors duration-200 bg-gray-200 hover:bg-gray-300"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatternMatch;