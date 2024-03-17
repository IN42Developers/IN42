import { Platform, Image, SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import DefaultButton from '../components/buttons/AuthButton'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Logo from '../components/svg/logo'

import {authorizeUser} from '../Utilities/apiAuthorization.js'
import {getAccessToken, setAccessToken, retrieveStoredValue, isTokenStillValid } from '../Utilities/TokenStorage';
import { getTokenFromCode } from '../Utilities/apiAuthorization.js'
import { setKeyValuePair } from '../Utilities/TokenStorage'
import { AssertUserCanRequestData } from '../Utilities/UserData'

import { AuthContext } from '../Context'


export default function IndexScreen() {
    const {Login} = React.useContext(AuthContext);
    const navigation = useNavigation();

    const { response,promptAsync: AuthUser } = authorizeUser();

  useEffect( () => {
    const tokenExchange = async() =>{
      try {
        
        if (response?.type === 'success') {
          const { code } = response.params;
          console.log('CODE = ', code);
          
          //const accessToken = await getTokenFromCode(code);
          const accessToken = await getTokenFromCode(code);
          console.log('saved TOKEN = ', accessToken);
          setKeyValuePair('AccessToken', accessToken);
          setAccessToken(accessToken);
        }
      } catch (error) {
         console.log(error);
      }
    }
    
    try {
      (async () => {
          await tokenExchange();
          const token = getAccessToken();
          console.log('token = ', token);
          if(token != null) {
            console.log('Authorization Successful. Logging in');
            Login();
          }
        }
        )();
    } catch (error) {
      console.log(error);
      alert(error)
    }
    //self invoking async function wtf?!
  },[response])


  const getXSecret = async () => {
    console.log(`X-SECRET = ${process.env.BASIC_HEADER_HASH}`)
    console.log(`EXPO_PUBLIC_AUTH_SERVER_IP = ${process.env.EXPO_PUBLIC_AUTH_SERVER_IP}`)
    console.log(`EXPO_PUBLIC_REDIRECT_URI = ${process.env.EXPO_PUBLIC_REDIRECT_URI}`)
  }

  const handlePress = async () => {
    try {
      if (AssertUserCanRequestData() == false) {
        return;
      }
      await AuthUser();
    }

    catch(error){
      console.log(error);
    }
  }

  return (
    <View id='General container' style={styles.container}>
      <View id='Pattern Group' style={styles.group}>
      <Image source={require('../assets/images/HeadLayout.png')} style={{
        width: Dimensions.get('window').width * 1.1,
        height: Dimensions.get('window').height * 0.38,
      }} />
        <View id='Logo' style={styles.logo}>
          <Logo />
        </View>
      </View>
      <SafeAreaView>
          <DefaultButton onPress={getXSecret} title='get X-Secret' />
          <DefaultButton onPress={handlePress} title='Authorize' />
      <View id='Main Container' style={styles.main}>
        <View id='Text field with Button' style={styles.field}>
          <View style={styles.seperator} />
          <Text style={styles.textHeading}>Welcome back</Text>
          <Text style={styles.textDescription}>Login as one from over 21,000 students in the 42 Network - ever-evolving intra companion, free and with focus on most-advanced mobile experience.</Text>
          <View style={styles.seperator} />
          <View style={styles.seperator} />
        </View>
      </View>
    </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headLayout: {
  },
  group: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
  },
  seperator: {
    height: 8,
  },
  textHeading: {
    fontSize: 42,
    fontWeight: '500',
    color: '#E0E0E0',
  },
  textDescription: {
    ...Platform.select({
      ios: {
        fontSize: 20,
      },
      android: {
        fontSize: 18,
      },
    }),
    color: '#A7A7A7',
    textAlign: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  field: {
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 24,
    gap: 28,
    textAlign: 'center',
  },
  });