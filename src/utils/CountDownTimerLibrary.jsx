
// import {memo,useEffect} from 'react';
// import Countdown from 'react-countdown';

// const CompletionTimer = () => <p>Time Remaining: 0:0:0</p>;
// let flag = false;

// const renderer = ({hours,minutes,seconds,completed},timeProps) => {
//     if(completed) {
//         return <CompletionTimer />;
//     } else if(minutes < 5 && hours === 0) {
//         if(!flag) {
//             alert("Last 5 minutes remaining");
//             flag = true;
//         }
//     }

//     return <p>Time Remaining: {hours}:{minutes}:{seconds}</p>;
// };

// export const CountDownTimerLibrary = memo(function CountDownTimerLibrary({
//     initialTime,
//     setInitialTime,
//     onTimerEnd,
//   }) {
//     useEffect(() => {
//       // Call onTimerEnd when initialTime <= 0
//       if (initialTime <= 0) {
//         onTimerEnd();
//       }
//     }, [initialTime, onTimerEnd]);
  
//     const handleTick = ({ hours, minutes, seconds }) => {
//       // Update initialTime using setInitialTime on each tick
//       const newTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
//       setInitialTime(newTimeInSeconds);
//     };
  
//     return (
//       <Countdown
//         date={Date.now() + initialTime * 1000}
//         renderer={(props) => renderer(props, { onTick: handleTick })}
//         onComplete={onTimerEnd}
//         autoStart={true}
//       />
//     );
//   });

import { memo, useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";

// const CompletionTimer = () => <p>Time Remaining: 0:0:0</p>;
const CompletionTimer = () => <span>00:00:00</span>;

export const CountDownTimerLibrary = memo(function CountDownTimerLibrary({
  initialTime,
  onTimerEnd,
}) {
  const [remainingTime, setRemainingTime] = useState(() => {
    // Load saved time or use initial time
    const savedTime = localStorage.getItem("remainingTime");
    const savedTimestamp = localStorage.getItem("savedTimestamp");

    if (savedTime && savedTimestamp) {
      const elapsed = Math.floor((Date.now() - parseInt(savedTimestamp, 10)) / 1000);
      const timeLeft = parseInt(savedTime, 10) - elapsed;
      return timeLeft > 0 ? timeLeft : initialTime;
    }

    return initialTime;
  });

  const flag = useRef(false);

  useEffect(() => {
    // Save remaining time and current timestamp
    localStorage.setItem("remainingTime", remainingTime.toString());
    localStorage.setItem("savedTimestamp", Date.now().toString());
  }, [remainingTime]);

  const handleTick = ({ hours, minutes, seconds }) => {
    const newTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
    setRemainingTime(newTimeInSeconds);
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      onTimerEnd();
      return <CompletionTimer />;
    } else if (minutes < 5 && hours === 0 && !flag.current) {
      alert("Last 5 minutes remaining");
      flag.current = true;
    }
    return <span> {hours}:{minutes}:{seconds}</span>;
  };

  return (
    remainingTime > 0 && (
      <Countdown
        key={remainingTime} // Ensure proper re-rendering
        date={Date.now() + remainingTime * 1000}
        renderer={renderer}
        onTick={handleTick}
        onComplete={onTimerEnd}
        autoStart={true}
      />
    )
  );
});
