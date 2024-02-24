import {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import useCountdown from '../../Utilities/useCountdown';

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
        if(seconds >= 10)
            setSecondsLeft(seconds); 
        else
            setSecondsLeft(`0${seconds}`);  
        if(minutes >= 10)
            setMinutesLeft(minutes); 
        else
            setMinutesLeft(`0${minutes}`);  
        if(hours >= 10)
            setHoursLeft(hours); 
        else
            setHoursLeft(`0${hours}`);  

        // console.log(totalSecondsLeft);
    },[totalSecondsLeft])

    return(
        <Text style={textStyle.text}>{hoursLeft}:{minutesLeft}:{secondLeft}</Text>
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