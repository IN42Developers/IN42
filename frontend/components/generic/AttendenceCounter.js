import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { UsersIcon } from 'lucide-react-native';


const AttendenceCounter = ({currentCount,maxCount,scale=1}) =>{

    let text = `${currentCount}`;
    if(maxCount != null)
        text += `/${maxCount}`;
    if(maxCount != null && currentCount >= maxCount)
        text = 'FULL';

    return(
        <View  style={styles.container}>
        <UsersIcon stroke='gray' size='20' />
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