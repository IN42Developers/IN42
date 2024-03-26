import React from 'react';
import { View,Text, SafeAreaView,StyleSheet,ScrollView,TouchableOpacity } from "react-native"
import { AuthContext } from '../Context'
import { setAccessToken, setKeyValuePair } from '../Utilities/TokenStorage';
import RequestCounter from '../components/complex/RequestCounter';
import { GetRequestCounter, GetRequestCounterMax, GetUserData } from '../Utilities/UserData';
import CurrenPeriodCounter from '../components/complex/CurrenPeriodCounter';
import SettingsSection from '../components/generic/SettingsSection';
import SettingsToggle from '../components/generic/SettingsToggle';
import { AntDesign } from '@expo/vector-icons'

export default function SettingsScreen () {

    const UserData = GetUserData();

    const {Logout} = React.useContext(AuthContext);
    const LogoutUser =  async () =>{
        try {
            
            await setKeyValuePair('AccessToken', '');
            setAccessToken(null);
            console.log('Trying to Logout');
            Logout();
        } catch (error) {
            console.log('Logout Failed for some reason?',error)
        }
  
    } 

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
            <Text style={styles.header}>Settings</Text>
            <ScrollView style={styles.scrollview}>
                <SettingsSection iconName='car' header='GENERAL'>
                    <SettingsToggle text='Cache userinfo on rate limit'></SettingsToggle>
                </SettingsSection>
                <SettingsSection iconName='cloud' header='NOTIFICATIONS'>
                    <SettingsToggle text='Upcoming evaluations'></SettingsToggle>
                    <SettingsToggle text='Event notifications'></SettingsToggle>
                </SettingsSection>
                <SettingsSection iconName='cloud' header='REQUESTS'>
                <View style={styles.vertContainer}>
                    <Text style={styles.text}>Requests</Text>
                    <RequestCounter textStyle={styles}/>
                </View>
                <View style={styles.vertContainer}>
                    <Text style={styles.text}>New Request Period</Text>
                    <CurrenPeriodCounter textStyle={styles}></CurrenPeriodCounter>
                </View>
                </SettingsSection>
                <View style={styles.vertContainerLogout}>
                    <View style={{justifyContent: 'center',}}>
                        <Text style={[styles.text,{fontSize: 18,color: 'white',}]}>{UserData.displayname}</Text>
                        <Text style={[styles.text,{fontSize: 14}]}>{UserData.login}</Text>
                    </View>
                    <TouchableOpacity style={styles.LogoutButton} onPress={LogoutUser}>
                        <View  style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
                            <AntDesign style={styles.buttonIcon} name='home' size={30} />
                            <Text style={styles.buttonText}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    scrollview:{
        flex: 1,
    },
    view:{
        flex: 1,
        paddingTop: 20,
    },
    LogoutButton: {
        flex: 0.7,
        padding: 5,
        // backgroundColor: '#303030',
        // justifyContent: 'center',
        // alignItems: 'center',
        borderColor: 'white',
        borderRadius: 2000,
        borderWidth: 2,
    },
    buttonIcon: {
        color: 'white',
        alignSelf: 'center',
    },
    buttonText:{
        // flex: 1,
        color: 'white',
        fontSize: 28,
        left: 5,
        // alignSelf: 'center',
    },
    text:{
        // flex: 1,
        color: '#A3A3A3',
        fontSize: 16,
        // alignSelf: 'center',
        // alignSelf: 'flex-end',
    },
    vertContainer:{
        // flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        // backgroundColor: 'grey',
        paddingVertical: 10,
        // borderColor: 'red',
        // borderWidth: 1,
    },
    vertContainerLogout:{
        // flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        // backgroundColor: 'grey',
        paddingVertical: 30,
        paddingHorizontal: 16,
        // borderColor: 'red',
        // borderWidth: 1,
    },
    header: {
        fontSize: 35,
        padding: 10,
        color: 'white',
    },
})




