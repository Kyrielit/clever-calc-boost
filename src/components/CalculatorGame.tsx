import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Brain } from "lucide-react";
import { cn } from '@/lib/utils';

const CalculatorGame = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState<'+' | '-' | '×' | '÷'>('+');
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const generateQuestion = () => {
    const operations = ['+', '-', '×', '÷'];
    const newOp = operations[Math.floor(Math.random() * operations.length)] as '+' | '-' | '×' | '÷';
    let n1 = Math.floor(Math.random() * 12) + 1;
    let n2 = Math.floor(Math.random() * 12) + 1;
    
    // Ensure division results in whole numbers
    if (newOp === '÷') {
      n2 = Math.floor(Math.random() * 10) + 1;
      n1 = n2 * (Math.floor(Math.random() * 10) + 1);
    }
    
    setNum1(n1);
    setNum2(n2);
    setOperation(newOp);
    setUserAnswer('');
  };

  const calculateCorrectAnswer = () => {
    switch (operation) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '×': return num1 * num2;
      case '÷': return num1 / num2;
      default: return 0;
    }
  };

  const checkAnswer = () => {
    const correctAnswer = calculateCorrectAnswer();
    if (parseFloat(userAnswer) === correctAnswer) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: `Great job! Your score is now ${score + 1}`,
      });
    } else {
      toast({
        title: "Not quite right",
        description: `The correct answer was ${correctAnswer}`,
        variant: "destructive",
      });
    }
    generateQuestion();
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    generateQuestion();
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
        title: "Game Over! 🎮",
        description: `Final score: ${score}`,
      });
    }
    return () => clearInterval(timer);
  }, [timeLeft, isPlaying, score, toast]);

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-indigo-500" />
          <h2 className="text-xl font-bold">Math Challenge</h2>
        </div>
        <div className="text-sm font-medium">
          Time: {timeLeft}s | Score: {score}
        </div>
      </div>

      {!isPlaying ? (
        <Button 
          onClick={startGame}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition hover:scale-105"
        >
          Start Game
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="text-center text-3xl font-bold">
            {num1} {operation} {num2} = ?
          </div>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full p-2 text-lg border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your answer"
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
          />
          <Button 
            onClick={checkAnswer}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition hover:scale-105"
          >
            Submit Answer
          </Button>
        </div>
      )}
    </div>
  );
};

export default CalculatorGame;