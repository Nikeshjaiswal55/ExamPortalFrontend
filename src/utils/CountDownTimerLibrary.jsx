
import {memo,useEffect} from 'react';
import Countdown from 'react-countdown';

const CompletionTimer = () => <p>Time Remaining: 0:0:0</p>;
let flag = false;

const renderer = ({hours,minutes,seconds,completed},timeProps) => {
    if(completed) {
        return <CompletionTimer />;
    } else if(minutes < 5 && hours === 0) {
        if(!flag) {
            alert("Last 5 minutes remaining");
            flag = true;
        }
    }

    return <p>Time Remaining: {hours}:{minutes}:{seconds}</p>;
};

export const CountDownTimerLibrary = memo(function CountDownTimerLibrary({initialTime,setInitialTime,onTimerEnd}) {
    useEffect(() => {
        if(initialTime <= 0) {
            onTimerEnd();
        }
    },[initialTime]);

    const handleTick = ({hours,minutes,seconds}) => {
        // Update initialTime using setInitialTime on each tick
        const newTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
        console.log("New time in second is :-  ",newTimeInSeconds)
        setInitialTime(newTimeInSeconds);
    };

    return (
        <>
            <Countdown
                date={Date.now() + initialTime * 1000}
                renderer={(props) => renderer(props,{onTick: handleTick})}
                onComplete={onTimerEnd}
            />
        </>
    );
})
