import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Brain } from "lucide-react";
import { Input } from "@/components/ui/input";

const NumberMemory = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState('');
  const [showSequence, setShowSequence] = useState(true);
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const generateSequence = () => {
    const newSequence = Array.from(
      { length: level + 2 },
      () => Math.floor(Math.random() * 10)
    );
    setSequence(newSequence);
    setShowSequence(true);
    setTimeout(() => setShowSequence(false), 2000 + (level * 500));
  };

  const startGame = () => {
    setIsPlaying(true);
    setLevel(1);
    generateSequence();
  };

  const checkAnswer = () => {
    if (userInput === sequence.join('')) {
      toast({
        title: "Correct! 🎉",
        description: `Moving to level ${level + 1}`,
      });
      setLevel(prev => prev + 1);
      setUserInput('');
      generateSequence();
    } else {
      toast({
        title: "Game Over! 🎮",
        description: `The sequence was: ${sequence.join('')}. You reached level ${level}!`,
        variant: "destructive",
      });
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-bold">Number Memory</h2>
        </div>
        <div className="text-sm font-medium">Level: {level}</div>
      </div>

      {!isPlaying ? (
        <Button 
          onClick={startGame}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Start Game
        </Button>
      ) : (
        <div className="space-y-4">
          {showSequence ? (
            <div className="text-center text-3xl font-bold tracking-wider">
              {sequence.join(' ')}
            </div>
          ) : (
            <>
              <Input
                type="number"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter the sequence you saw"
                className="text-center text-lg"
              />
              <Button 
                onClick={checkAnswer}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                Submit Answer
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NumberMemory;