import { View,StyleSheet,Text } from "react-native"
import { AntDesign } from '@expo/vector-icons'

export default function SettingsSection({iconName='home',header='HEADER',children}) {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
            <AntDesign style={styles.icon}
                size={26} 
                name={iconName}>
            </AntDesign>
                <Text style={styles.header}>{header}</Text>
            </View>
            {children}
        </View>
    )
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'grey',
        paddingHorizontal: 16,
        paddingVertical: 15,

        borderColor: '#383838',
        borderBottomWidth: 1,
    },
    headerContainer: {
        flex: 1,
        // paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        // backgroundColor: 'grey',
        paddingBottom: 10,
        gap: 15,

        // borderColor: 'red',
        // borderWidth: 1,
    },
    icon: {
        color: '#D2D2D2',
    },
    header: {
        color: '#B9B9B9',
        fontSize: 16,
    },
})