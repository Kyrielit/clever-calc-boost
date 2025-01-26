import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Brain } from "lucide-react";
import { Input } from "@/components/ui/input";

const NumberSeries = () => {
  const [series, setSeries] = useState<number[]>([]);
  const [answer, setAnswer] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const generateSeries = () => {
    const start = Math.floor(Math.random() * 10);
    const increment = Math.floor(Math.random() * 5) + 1;
    const newSeries = Array.from({ length: 4 }, (_, i) => start + (increment * i));
    setSeries(newSeries);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    generateSeries();
  };

  const checkAnswer = () => {
    const correctAnswer = series[series.length - 1] + (series[1] - series[0]);
    if (Number(answer) === correctAnswer) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: `Score: ${score + 1}`,
      });
      generateSeries();
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
          <Brain className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-bold">Number Series</h2>
        </div>
        <div className="text-sm font-medium">Score: {score}</div>
      </div>

      {!isPlaying ? (
        <Button 
          onClick={startGame}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
        >
          Start Game
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="text-center text-3xl font-bold tracking-wider">
            {series.join(' , ')} , ?
          </div>
          <Input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="What comes next?"
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

export default NumberSeries;