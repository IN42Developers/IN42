import {useEffect, useState} from "react"

export default function useCountdown() {
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() =>{
        const timeout = setTimeout(() => {
            if (secondsLeft > 0) {
                setSecondsLeft(secondsLeft - 1);
            }
        }, 1000);

        return () => clearTimeout(timeout);
    },[secondsLeft])

    function start(seconds){
        const nonNegativeSeconds = Math.max(0, seconds);
        setSecondsLeft(nonNegativeSeconds);
    }
    
    return [secondsLeft, start];
}