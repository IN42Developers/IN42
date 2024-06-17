import { StyleSheet, Text, View } from 'react-native';
import In42Icon from './ui_basic/In42Icon';

interface AttendenceCounterProps {
    currentCount: number,
    maxCount: number,
    scale?: number,
}

const AttendenceCounter:React.FC<AttendenceCounterProps> = ({currentCount,maxCount,scale=1}) =>{

    let text = `${currentCount}`;
    if(maxCount != null)
        text += `/${maxCount}`;
    if(maxCount != null && currentCount >= maxCount)
        text = 'FULL';

    return(
        <View  style={styles.container}>
            <In42Icon origin={'lucide'} color={'grey'} size={20} name='Users'></In42Icon>
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