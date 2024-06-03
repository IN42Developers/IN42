import { StyleSheet, Text, View } from 'react-native';
import { CalculateRemainingTimePeriod,GetRequestCounterPeriod } from '../../utils/UserData';
import {useEffect, useState} from 'react'
import CountDownTimer from '../general/CountDownTimer';
import { useFocusEffect } from '@react-navigation/native';
import LogData, { logType } from '../../utils/debugging/debugging';

const CurrenPeriodCounter = ({textStyle=styles}) =>{

    const [timeInSeconds, setTimeInSeconds] = useState(0);

    LogData(logType.INFO,"rendering")
    useEffect( () => {
            InitTimerPeriod();

    },[])


    
    const InitTimerPeriod =() => {
        let timeData2 = CalculateRemainingTimePeriod(GetRequestCounterPeriod());
        let totaltimeInSeconds = timeData2.days * 24 * 60 * 60;
        totaltimeInSeconds += timeData2.hours * 60 * 60;
        totaltimeInSeconds += timeData2.minutes * 60;
        totaltimeInSeconds += timeData2.seconds;
        LogData(logType.INFO,"SETTING totTimeinSeconds to: ", totaltimeInSeconds)
        setTimeInSeconds(totaltimeInSeconds);
        LogData(logType.INFO,"time in seconds =",timeInSeconds)
    }



    return(
        <CountDownTimer totalTimeInSeconds={timeInSeconds} className="text-gray-300"></CountDownTimer>
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