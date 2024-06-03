import { useState } from "react"
import { View,StyleSheet,Text } from "react-native"
import { Switch } from "react-native-gesture-handler"

export default function SettingsToggle({text='options',defaultState=false}) {

    const [isEnabled, SetIsEnabled] = useState(defaultState);

    const ToggleSwitch= ()=>{
        SetIsEnabled(!isEnabled);
    }

    return (
        <View style={styles.rowContainer}>
            <Text style={styles.text}>{text}</Text>
            <Switch style={styles.switch} 
                trackColor={{false: '#454545',true: '#27655E'}}
                thumbColor={'white'}
                // ios_backgroundColor={'#27655E'}
                onValueChange={ToggleSwitch}
                value={isEnabled}
            />
        </View>
    )
}

const styles =  StyleSheet.create({
    rowContainer:{
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'green',
        // alignContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: 'red',
        // borderWidth: 1,
        paddingVertical: 2,
    },
    text: {
        flex: 1,
        color: '#A3A3A3',
        fontSize: 16,
        // borderColor: 'red',
        // borderWidth: 1,
    },
    switch: {
        // fontSize: 30,
    },
})