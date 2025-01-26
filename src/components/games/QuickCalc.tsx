import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Timer } from "lucide-react";
import { Input } from "@/components/ui/input";

const QuickCalc = () => {
  const [problem, setProblem] = useState('');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const generateProblem = () => {
    const operations = ['+', '-'];
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    const operation = operations[Math.floor(Math.random() * operations.length)];
    setProblem(`${num1} ${operation} ${num2}`);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      toast({
        title: "Time's up! 🎮",
        description: `Final score: ${score}`,
      });
    }
    return () => clearInterval(timer);
  }, [timeLeft, isPlaying, score, toast]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    generateProblem();
  };

  const checkAnswer = () => {
    const correctAnswer = eval(problem);
    if (Number(answer) === correctAnswer) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: `Score: ${score + 1}`,
      });
      generateProblem();
      setAnswer('');
    } else {
      toast({
        title: "Wrong!",
        description: `The correct answer was ${correctAnswer}`,
        variant: "destructive",
      });
      setAnswer('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Timer className="w-6 h-6 text-rose-500" />
          <h2 className="text-xl font-bold">Quick Calc</h2>
        </div>
        <div className="text-sm font-medium">
          Time: {timeLeft}s | Score: {score}
        </div>
      </div>

      {!isPlaying ? (
        <Button 
          onClick={startGame}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
        >
          Start Game
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="text-center text-3xl font-bold">
            {problem}
          </div>
          <Input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="text-center text-lg"
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
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

export default QuickCalc;