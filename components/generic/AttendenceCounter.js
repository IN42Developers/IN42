import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'


const AttendenceCounter = ({currentCount,maxCount,scale=1}) =>{

    let text = `${currentCount}`;
    if(maxCount != null)
        text += `/${maxCount}`;
    if(maxCount != null && currentCount >= maxCount)
        text = 'FULL';

    return(
        <View  style={styles.container}>
        <AntDesign style={styles.text  }
            size={20 * scale} 
            name={'team'}/>
            <Text style={[styles.text, {fontSize: 14 * scale}]}> {text}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text:{
        color: '#838383',
    }
})

export default AttendenceCounter