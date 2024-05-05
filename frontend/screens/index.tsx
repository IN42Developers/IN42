import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { Button } from '../components/buttons/Button'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import {authorizeUser} from '../Utilities/apiAuthorization.js'
import {getAccessToken, setAccessToken, retrieveStoredValue, isTokenStillValid } from '../Utilities/TokenStorage';
import { getTokenFromCode } from '../Utilities/apiAuthorization.js'
import { setKeyValuePair } from '../Utilities/TokenStorage'
import { AssertUserCanRequestData } from '../Utilities/UserData'
import { AuthContext } from '../Context'
import EntryHeader from '../components/ui/EntryHeader'
import LogData, { logType } from '../Utilities/debugging'

export default function IndexScreen() {

  const {Login} = React.useContext(AuthContext);
  const navigation = useNavigation();

  const { response, promptAsync: AuthUser } = authorizeUser();

  useEffect( () => {
    const tokenExchange = async() =>{
      try {
        if (response?.type === 'success') {
          const { code } = response.params;
          LogData(logType.INFO,'CODE = ', code);
          
          //const accessToken = await getTokenFromCode(code);
          const accessToken = await getTokenFromCode(code);
          LogData(logType.INFO,'saved TOKEN = ', accessToken);
          setKeyValuePair('AccessToken', accessToken);
          setAccessToken(accessToken);
        }
      } catch (error) {
        LogData(logType.ERROR,error);
      }
    }
    
    try {
      (async () => {
          await tokenExchange();
          const token = getAccessToken();
          LogData(logType.INFO,'token = ', token);
          if(token != null) {
            LogData(logType.INFO,'Authorization Successful. Logging in');
            Login();
          }
        }
        )();
    } catch (error) {
      LogData(logType.ERROR,error);
      alert(error)
    }
    //self invoking async function wtf?!
  },[response])

  const handlePress = async () => {
    LogData(logType.INFO,"process.env.IN42_DEV", process.env.IN42_DEV);
    try {
      if (AssertUserCanRequestData() == false) {
        return;
      }
      await AuthUser();
    }

    catch(error){
      LogData(logType.ERROR,error);
    }
    LogData(logType.INFO,'Logged in');
  };

  return (
    <View style={{ display: 'flex', flex: 1 }}>
      <EntryHeader />
      <View style={{ flex: 1, marginTop: 36 }}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', rowGap: 16, marginTop: 48 }}>
          <View>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 28, fontFamily: 'Inter_500Medium' }}>Welcome back</Text>
            <Text style={{ color: 'gray', textAlign: 'center', fontSize: 18, padding: 16, marginTop: 48, fontFamily: 'Inter_400Regular', lineHeight: 28 }}>Login as one from over 21,000 students in the 42 Network - ever-evolving intra companion, free, mobile and accessible. Built together with the community.</Text>
          </View>
          <View style={{ bottom: 0, position: 'absolute', width: '90%', marginBottom: 48, justifyContent: 'center', alignSelf: 'center', marginHorizontal: 'auto' }}>
            <Button onPress={handlePress}>
              <Text style={{ textAlign: 'center', fontFamily: 'Inter_700Bold', fontSize: 22 }}>Authorize</Text>
            </Button>
            <Text style={{ textAlign: 'center', marginTop: 28, fontSize: 12, color: 'gray' }}>You will be redirected to 42 Intra where you may authorize our app. If successful, you will be redirected back.</Text>
          </View>
        </View>
      </View>
    </View>
  )
}