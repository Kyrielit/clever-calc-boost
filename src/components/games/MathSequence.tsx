import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Puzzle } from "lucide-react";
import { Input } from "@/components/ui/input";

const MathSequence = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const generateSequence = () => {
    const start = Math.floor(Math.random() * 10) + 1;
    const increment = Math.floor(Math.random() * 5) + 1;
    const newSequence = Array.from({ length: 4 }, (_, i) => start + (increment * i));
    setSequence(newSequence);
    setUserAnswer('');
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    generateSequence();
  };

  const checkAnswer = () => {
    const lastNumber = sequence[sequence.length - 1];
    const increment = sequence[1] - sequence[0];
    const correctAnswer = lastNumber + increment;

    if (parseInt(userAnswer) === correctAnswer) {
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
    generateSequence();
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
          <Puzzle className="w-6 h-6 text-violet-500" />
          <h2 className="text-xl font-bold">Math Sequence</h2>
        </div>
        <div className="text-sm font-medium">
          Time: {timeLeft}s | Score: {score}
        </div>
      </div>

      {!isPlaying ? (
        <Button 
          onClick={startGame}
          className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600"
        >
          Start Game
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="text-center text-3xl font-bold tracking-wider space-x-4">
            {sequence.map((num, i) => (
              <span key={i}>{num}</span>
            ))}
            <span className="text-violet-500">?</span>
          </div>
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="What comes next?"
            className="text-center text-lg"
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
          />
          <Button 
            onClick={checkAnswer}
            className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600"
          >
            Submit Answer
          </Button>
        </div>
      )}
    </div>
  );
};

export default MathSequence;