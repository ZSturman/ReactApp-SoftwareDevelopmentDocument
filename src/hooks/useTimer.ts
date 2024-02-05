/* import { useState, useEffect } from 'react';

function useTimer(initialCount = 0, onThresholdReached: () => void) {
  const [timer, setTimer] = useState(initialCount);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId: number;

    if (isActive) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= 2) {
            clearInterval(intervalId);
            onThresholdReached();
            setIsActive(false);
            return 0;
          }
          return prevTimer + 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, onThresholdReached]);

  const startTimer = () => {
    console.log('Timer started');
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
    setTimer(0);
  };

  return { timer, startTimer, stopTimer };
}



export default useTimer;
 */