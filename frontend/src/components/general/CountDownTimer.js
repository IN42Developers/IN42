import {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import useCountdown from '../../hooks/useCountdown';
import LogData, { logType } from '../../utils/debugging/debugging';

export default CountDownTimer = ({totalTimeInSeconds,textStyle=styles }) =>{

    const [totalSecondsLeft, StartTimer] = useCountdown();
    const [hoursLeft, setHoursLeft] = useState('00');
    const [minutesLeft, setMinutesLeft] = useState('00');
    const [secondLeft, setSecondsLeft] = useState('00');

    useEffect(() =>{
        StartTimer(totalTimeInSeconds);
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
            //in the future this should not be hard coded
            StartTimer(60*60 -1);
        }
        // LogData(logType.INFO,totalSecondsLeft);
    },[totalSecondsLeft])

    const formatTimeValue = (value) => {
        return value < 10 ? `0${value}` : `${value}`;
    };

    return(
        <Text style={textStyle.text}>{minutesLeft}:{secondLeft}</Text>
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