import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialTime, onTimerEnd }) => {
  const [time, setTime] = useState(initialTime);
  const [lastminError, setLastMinError] = useState(true);
  console.log('time', time);

  useEffect(() => {
    if (time > 0) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        if (lastminError === true && time <= 300) {
          console.log(lastminError, 'lastminError');
          alert('Last 5min remaining!');
          setLastMinError(false);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      onTimerEnd();
    }
  }, [time, onTimerEnd]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      <p>Time Remaining: {formatTime(time)}</p>
    </div>
  );
};

export default CountdownTimer;
