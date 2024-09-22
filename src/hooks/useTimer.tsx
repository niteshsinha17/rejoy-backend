"use client";
import { useEffect, useRef, useState } from "react";

interface IUserTimerProps {
  timeInSecond: number;
  autoStart?: boolean;
}

const getFormattedTime = (timeInSecond: number): string => {
  const minutes = Math.floor(timeInSecond / 60);
  const seconds = timeInSecond - minutes * 60;
  return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

const useTimer = (props: IUserTimerProps) => {
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(props.timeInSecond);
  const timeInterval = useRef<any>(null);

  const start = () => {
    setRunning(true);
    timeInterval.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stop();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stop = () => {
    setRunning(false);
    if (timeInterval.current) {
      clearInterval(timeInterval.current);
    }
  };

  const restart = () => {
    setTimeLeft(props.timeInSecond);
    start();
  };

  useEffect(() => {
    if (props.autoStart) {
      start();
    }
    return () => {
      stop();
    };
  }, []);

  return {
    running,
    timeLeft,
    formattedTime: getFormattedTime(timeLeft),
    start,
    stop,
    restart,
  };
};

export default useTimer;
