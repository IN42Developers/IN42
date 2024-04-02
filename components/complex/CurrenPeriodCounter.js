import { StyleSheet, Text, View } from 'react-native';
import { CalculateRemainingTimePeriod,GetRequestCounterPeriod } from '../../Utilities/UserData';
import {useEffect, useState} from 'react'
import CountDownTimer from '../generic/CountDownTimer';
import { useFocusEffect } from '@react-navigation/native';

const CurrenPeriodCounter = ({textStyle=styles}) =>{

    const [timeInSeconds, setTimeInSeconds] = useState(0);

    console.log("rendering")
    useEffect( () => {
            InitTimerPeriod();

    },[])


    
    const InitTimerPeriod =() => {
        let timeData2 = CalculateRemainingTimePeriod(GetRequestCounterPeriod());
        let totaltimeInSeconds = timeData2.days * 24 * 60 * 60;
        totaltimeInSeconds += timeData2.hours * 60 * 60;
        totaltimeInSeconds += timeData2.minutes * 60;
        totaltimeInSeconds += timeData2.seconds;
        console.log("SETTING totTimeinSeconds to: ", totaltimeInSeconds)
        setTimeInSeconds(totaltimeInSeconds);
        console.log("time in seconds =",timeInSeconds)
    }



    return(
        <CountDownTimer totalTimeInSeconds={timeInSeconds} textStyle={textStyle} />
    )
}


const styles = StyleSheet.create({
    text:{
        // flex: 1,
        color: 'white',
        // backgroundColor: '#1F1F1F',
        alignSelf: 'center',
    }
})

export default CurrenPeriodCounter