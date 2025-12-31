import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Play } from "lucide-react";
import { useSessionStorage } from "@/hooks/useSessionStorage";

export default function Timer() {
  const [startTime, setStartTime] = useSessionStorage<number | null>(
    "timerStartTime",
    null
  );
  const [elapsed, setElapsed] = useSessionStorage<number>("timerElapsed", 0);
  const [isRunning, setIsRunning] = useSessionStorage("timerIsRunning", false);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      if (!startTime) {
        setStartTime(Date.now() - elapsed * 1000);
      }

      intervalRef.current = window.setInterval(() => {
        if (startTime) {
          setElapsed(Math.floor((Date.now() - startTime) / 1000));
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, startTime]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setElapsed(0);
    setStartTime(null);
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <span className="text-sm">Cooking Timer</span>
      </CardHeader>

      <CardContent>
        <div className="font-medium text-4xl text-primary mb-8">
          {formatTime(elapsed)}
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex gap-2">
          <Button
            size="icon"
            onClick={toggleTimer}
            className="rounded-full bg-[#B5B5B5] hover:bg-[#B5B5B5]/80 text-[#1C1C1C]"
          >
            {isRunning ? (
              <svg
                width="25"
                height="31"
                viewBox="0 0 25 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.000488281"
                  width="7.60024"
                  height="31"
                  rx="2"
                  fill="currentColor"
                />
                <rect
                  x="17.3716"
                  width="7.60024"
                  height="31"
                  rx="2"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <Play className="fill-current" />
            )}
          </Button>

          <Button
            size="icon"
            onClick={resetTimer}
            className="rounded-full bg-[#EF4141] hover:bg-[#EF4141]/80 text-[#EDEDED]"
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="27" height="27" rx="2" fill="currentColor" />
            </svg>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
