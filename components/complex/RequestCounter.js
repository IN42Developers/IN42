import { StyleSheet, Text, View } from 'react-native';
import { GetRequestCounter, GetRequestCounterMax } from '../../Utilities/UserData';

const RequestCounter = ({textStyle=styles}) =>{

    return(
        <Text style={textStyle.text}>{GetRequestCounter()}/{GetRequestCounterMax()}</Text>
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