import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Timer, Brain } from "lucide-react";
import { cn } from '@/lib/utils';

const SpeedMath = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [options, setOptions] = useState<number[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operation = Math.random() < 0.5 ? '+' : '×';
    const correct = operation === '+' ? num1 + num2 : num1 * num2;
    
    // Generate wrong answers
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      const wrong = correct + (Math.floor(Math.random() * 10) - 5);
      if (wrong !== correct) wrongAnswers.add(wrong);
    }
    
    const allOptions = [...Array.from(wrongAnswers), correct];
    setOptions(allOptions.sort(() => Math.random() - 0.5));
    setCorrectAnswer(correct);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    generateQuestion();
  };

  const checkAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === correctAnswer) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: `Score: ${score + 1}`,
      });
    } else {
      toast({
        title: "Wrong!",
        description: `The correct answer was ${correctAnswer}`,
        variant: "destructive",
      });
    }
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
        title: "Time's Up! 🎮",
        description: `Final score: ${score}`,
      });
    }
    return () => clearInterval(timer);
  }, [timeLeft, isPlaying, score, toast]);

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Timer className="w-6 h-6 text-rose-500" />
          <h2 className="text-xl font-bold">Speed Math</h2>
        </div>
        <div className="text-sm font-medium">
          Time: {timeLeft}s | Score: {score}
        </div>
      </div>

      {!isPlaying ? (
        <Button 
          onClick={startGame}
          className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
        >
          Start Game
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="text-center text-3xl font-bold mb-6">
            {options.length > 0 && "Choose the correct answer"}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => checkAnswer(option)}
                className={cn(
                  "h-16 text-xl font-bold",
                  "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                )}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeedMath;