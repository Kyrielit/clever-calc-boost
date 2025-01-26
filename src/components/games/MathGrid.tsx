import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Grid } from "lucide-react";

const MathGrid = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [target, setTarget] = useState<number>(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const generateGrid = () => {
    const newNumbers = Array.from(
      { length: 9 },
      () => Math.floor(Math.random() * 9) + 1
    );
    setNumbers(newNumbers);
    setTarget(Math.floor(Math.random() * 20) + 10);
    setSelected([]);
  };

  const handleNumberClick = (index: number) => {
    if (selected.includes(index)) {
      setSelected(selected.filter(i => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const checkSum = () => {
    const sum = selected.reduce((acc, index) => acc + numbers[index], 0);
    if (sum === target) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: `Score: ${score + 1}`,
      });
      generateGrid();
    } else {
      toast({
        title: "Wrong combination",
        description: "Try again!",
        variant: "destructive",
      });
      setSelected([]);
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    generateGrid();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Grid className="w-6 h-6 text-emerald-500" />
          <h2 className="text-xl font-bold">Math Grid</h2>
        </div>
        <div className="text-sm font-medium">Score: {score}</div>
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
          <div className="text-center text-xl font-bold mb-4">
            Target Sum: {target}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {numbers.map((number, index) => (
              <Button
                key={index}
                onClick={() => handleNumberClick(index)}
                className={`h-16 text-xl font-bold ${
                  selected.includes(index)
                    ? 'bg-emerald-500 hover:bg-emerald-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {number}
              </Button>
            ))}
          </div>
          <Button 
            onClick={checkSum}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
          >
            Check Sum
          </Button>
        </div>
      )}
    </div>
  );
};

export default MathGrid;