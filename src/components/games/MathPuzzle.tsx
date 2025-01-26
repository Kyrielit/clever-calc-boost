import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Puzzle } from "lucide-react";
import { Input } from "@/components/ui/input";

const MathPuzzle = () => {
  const [puzzle, setPuzzle] = useState<string>('');
  const [answer, setAnswer] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const generatePuzzle = () => {
    const operations = ['+', '-', '*'];
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operation = operations[Math.floor(Math.random() * operations.length)];
    setPuzzle(`${num1} ${operation} ${num2}`);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    generatePuzzle();
  };

  const checkAnswer = () => {
    const correctAnswer = eval(puzzle);
    if (Number(answer) === correctAnswer) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: `Your score: ${score + 1}`,
      });
      generatePuzzle();
      setAnswer('');
    } else {
      toast({
        title: "Wrong answer",
        description: `The correct answer was ${correctAnswer}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Puzzle className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-bold">Math Puzzle</h2>
        </div>
        <div className="text-sm font-medium">Score: {score}</div>
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
          <div className="text-center text-3xl font-bold">
            {puzzle}
          </div>
          <Input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="text-center text-lg"
          />
          <Button 
            onClick={checkAnswer}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            Submit Answer
          </Button>
        </div>
      )}
    </div>
  );
};

export default MathPuzzle;