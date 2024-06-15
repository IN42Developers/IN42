import {useEffect, useState} from 'react'
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import useCountdown from '../../hooks/useCountdown';
import LogData, { logType } from '../../utils/debugging/debugging';
import { validateRange } from '../../utils/settings_utilities';

/**
 * Props for CountDownTimer
 *
 * @param totalTimeInSeconds - Start value for countdown Timer, value between 1 and 86,400
 * @param totalRestartTime - The reset time after countdwon is completed, value between 1 and 86,400
 * @param showHours - boolean to toggle hours.
 * @param showMinutes - boolean to toggle minutes.
 * @param showSeconds - boolean to toggle seconds.
 * @param textStyle - Optional text styling.
 */
interface CountDownTimerProps {
    totalTimeInSeconds: number,
    totalRestartTime?: number,
    showHours?: boolean,
    showMinutes?: boolean,
    showSeconds?: boolean,
    textStyle?: TextStyle,
}

const CountDownTimer:React.FC<CountDownTimerProps> = ({
    totalTimeInSeconds,
    totalRestartTime = 60*60 -1,
    showHours=true,
    showMinutes=true,
    showSeconds=true,
    textStyle=styles.text }) => {

    const [totalSecondsLeft, StartTimer] = useCountdown();
    const [hoursLeft, setHoursLeft] = useState('00');
    const [minutesLeft, setMinutesLeft] = useState('00');
    const [secondLeft, setSecondsLeft] = useState('00');

    useEffect(() =>{
        StartTimer(validateRange(totalTimeInSeconds,1,60*60*24));
    },[totalTimeInSeconds])

    useEffect(()=>{
        let seconds = totalSecondsLeft % 60; 
        let minutes = Math.floor(totalSecondsLeft / 60);
        let hours = Math.floor(totalSecondsLeft / 3600);
        
        setHoursLeft(formatTimeValue(hours));
        setMinutesLeft(formatTimeValue(minutes));
        setSecondsLeft(formatTimeValue(seconds)); 


        if(totalSecondsLeft <= 0){
            LogData(logType.INFO,'Timer is complete')
            StartTimer(validateRange(totalRestartTime,1,60*60*24));
        }
    },[totalSecondsLeft])

    const formatTimeValue = (value: number) => {
        return value < 10 ? `0${value}` : `${value}`;
    };

    return(
        <Text style={textStyle}>
            {showHours == true ? hoursLeft + ':' : ''}
            {showMinutes == true ? minutesLeft + ':' : ''}
            {showSeconds == true ? secondLeft : ''}
        </Text>
    )
}


const styles = StyleSheet.create({
    text:{
        // flex: 1,
        color: 'white',
        // backgroundColor: '#1F1F1F', 
        alignSelf: 'center',
    },
})

export default CountDownTimer;