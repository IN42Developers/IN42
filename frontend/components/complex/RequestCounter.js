import { StyleSheet, Text, View } from 'react-native';
import { GetRequestCounter, GetRequestCounterMax } from '../../Utilities/UserData';
import { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import LogData, { logType } from '../../Utilities/debugging';

const RequestCounter = ({textStyle=styles}) =>{

    const [currentRequests, SetCurrentRequests] = useState(GetRequestCounter())

    //not the best... but works for the time being
    useFocusEffect(()=>{
        let req = GetRequestCounter()
        if(currentRequests != req){
            LogData(logType.INFO,"Request amount changed, rerendering")
            SetCurrentRequests(req)
        }
        LogData(logType.INFO,"RequestCounter useFocusEffect")

    })
    return (
        <View className='flex flex-row'>
            <Text className='text-white font-InterBold'>{GetRequestCounter()}/</Text>
            <Text className='text-gray-500 font-InterBold'>{GetRequestCounterMax()}</Text>
        </View>
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

export default RequestCounter