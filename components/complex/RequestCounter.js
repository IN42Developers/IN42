import { StyleSheet, Text, View } from 'react-native';
import { GetRequestCounter, GetRequestCounterMax } from '../../Utilities/UserData';

const RequestCounter = ({textStyle=styles}) =>{

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