import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

interface LapTime {
  id: number;
  time: number;
  lapTime: number;
}

export const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<LapTime[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastLapTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (timeInMs: number): string => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const centiseconds = Math.floor((timeInMs % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLapTimes([]);
    lastLapTimeRef.current = 0;
  };

  const handleLap = () => {
    if (isRunning) {
      const lapTime = time - lastLapTimeRef.current;
      const newLap: LapTime = {
        id: lapTimes.length + 1,
        time: time,
        lapTime: lapTime
      };
      setLapTimes(prev => [newLap, ...prev]);
      lastLapTimeRef.current = time;
    }
  };

  const getFastestSlowestLap = () => {
    if (lapTimes.length === 0) return { fastest: null, slowest: null };
    
    const fastest = lapTimes.reduce((min, lap) => 
      lap.lapTime < min.lapTime ? lap : min
    );
    const slowest = lapTimes.reduce((max, lap) => 
      lap.lapTime > max.lapTime ? lap : max
    );
    
    return { fastest, slowest };
  };

  const { fastest, slowest } = getFastestSlowestLap();

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 relative">
      {/* Timer Display */}
      <Card className="p-8 text-center bg-card border-2 border-neon-pink relative overflow-hidden scanlines">
        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-center gap-2 text-neon-purple">
            <Timer className="w-5 h-5 animate-retro-flicker" />
            <span className="text-sm font-bold tracking-wider animate-retro-flicker">STOPWATCH</span>
          </div>
          <div className="text-6xl font-mono font-black text-primary tracking-tight">
            {formatTime(time)}
          </div>
        </div>
        {/* Retro grid overlay */}
        <div className="absolute inset-0 retro-grid opacity-20"></div>
      </Card>

      {/* Control Buttons */}
      <div className="flex gap-3 justify-center">
        <Button
          onClick={handleStartStop}
          size="lg"
          variant={isRunning ? "destructive" : "default"}
          className={`flex-1 h-14 text-lg font-bold border-2 transition-all duration-300 ${
            isRunning 
              ? 'shadow-neon-pink border-destructive text-destructive-foreground' 
              : 'shadow-neon-cyan border-primary text-primary-foreground hover:shadow-neon-pink'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Start
            </>
          )}
        </Button>
        
        {isRunning ? (
          <Button
            onClick={handleLap}
            size="lg"
            variant="secondary"
            className="h-14 px-6 font-bold border-2 border-secondary shadow-neon-purple hover:shadow-neon-cyan transition-all duration-300"
          >
            <Timer className="w-5 h-5 mr-2" />
            LAP
          </Button>
        ) : (
          <Button
            onClick={handleReset}
            size="lg"
            variant="outline"
            className="h-14 px-6 font-bold border-2 border-muted hover:border-primary hover:shadow-neon-cyan transition-all duration-300"
            disabled={time === 0}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            RESET
          </Button>
        )}
      </div>

      {/* Lap Times */}
      {lapTimes.length > 0 && (
        <Card className="p-4 bg-card border-2 border-muted relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <h3 className="text-lg font-bold text-center mb-4 text-primary neon-glow tracking-wider">LAP TIMES</h3>
            <ScrollArea className="h-64">
              <div className="space-y-2 pr-4">
              {lapTimes.map((lap) => (
                <div
                  key={lap.id}
                  className={`flex justify-between items-center p-3 rounded-lg text-sm border-2 transition-all duration-300 ${
                    fastest && lap.id === fastest.id
                      ? 'bg-success/20 text-success border-success neon-glow font-bold shadow-neon-cyan'
                      : slowest && lap.id === slowest.id && lapTimes.length > 1
                      ? 'bg-destructive/20 text-destructive border-destructive neon-glow font-bold shadow-neon-pink'
                      : 'bg-muted/30 border-muted text-foreground hover:border-primary hover:shadow-neon-purple'
                  }`}
                >
                  <span className="font-bold tracking-wide">LAP {lap.id}</span>
                  <div className="text-right">
                    <div className="font-mono font-black text-lg">
                      {formatTime(lap.lapTime)}
                    </div>
                    <div className="text-xs opacity-70 font-mono">
                      {formatTime(lap.time)}
                    </div>
                  </div>
                </div>
               ))}
              </div>
            </ScrollArea>
          </div>
          {/* Subtle grid for lap times */}
          <div className="absolute inset-0 retro-grid opacity-5"></div>
        </Card>
      )}
    </div>
  );
};