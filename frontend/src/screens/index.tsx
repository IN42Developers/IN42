import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { Button } from '../components/general/Button'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import {getAccessToken, setAccessToken, retrieveStoredValue, isTokenStillValid } from '../utils/TokenStorage';
import { getTokenFromCode, authorizeUser } from '../utils/apiAuthorization'
import { setKeyValuePair } from '../utils/TokenStorage'
import { AssertUserCanRequestData } from '../utils/UserData'
import { AuthContext } from '../../Context'
import EntryHeader from '../components/index/EntryHeader'
import LogData, { logType } from '../utils/debugging/debugging'
import { useTranslation } from 'react-i18next'

export const IndexScreen:React.FC = ()=> {

  const {Login} = React.useContext(AuthContext);
  const navigation = useNavigation();

  const { response, promptAsync: AuthUser } = authorizeUser();
  const { t } = useTranslation();

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
    <View style={styles.container}>
      <View style={styles.image}>
        <EntryHeader />

      </View>
      <View style={styles.bottomContainer}>
            <Text style={styles.titleText}>{t('index_title')}</Text>
            <Text style={styles.descriptionText}>{t('index_description')}</Text>
          <View style={styles.buttonContainer}>
            <Button onPress={handlePress}>
              <Text style={styles.buttonText}>{t('index_auth_btn')}</Text>
            </Button>
            <Text style={styles.detailText}>{t('index_footer')}</Text>
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    flex:1,
  },
  bottomContainer: {
    // borderColor: 'green',
    // borderWidth: 2,
    flex: 1,
    justifyContent: 'space-between',
    // justifyContent: 'flex-end',
  },
  titleText: {
    // borderColor: 'red',
    // borderWidth: 1,
    color: 'white',
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'Inter_500Medium'
  },
  descriptionText:{
    // borderColor: 'red',
    // borderWidth: 1,
    color: 'gray',
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 16,
    fontFamily:'Inter_400Regular',
    // lineHeight: 28
  },
  buttonContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    // paddingBottom: 42,
    // justifyContent: 'center',
    // flex: 0.8,
    // justifyContent: 'space-evenly',
    alignSelf: 'center',
    width: '90%',
  },
  buttonText:{
    textAlign: 'center',
    fontFamily:'Inter_700Bold',
    fontSize: 22
  },
  detailText:{
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 12,
    color: 'gray'
  },
})

export default IndexScreen