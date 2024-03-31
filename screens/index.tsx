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

  const { response, promptAsync: AuthUser } = authorizeUser();

  useEffect( () => {
    const tokenExchange = async() =>{
      try {
        console.log('logging Response =',response);
        console.log('Response Type =',response?.type);
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
    /* console.log("process.env.IN42_DEV", process.env.IN42_DEV);
    try {
      if (AssertUserCanRequestData() == false) {
        return;
      }
      await AuthUser();
    }

    catch(error){
      console.log(error);
    } */
    navigation.navigate('home', { screen: 'HomeScreen' });
  }

  return (
    <View className='flex-1 items-center'>
      <Image
        source={require('../assets/images/HeadLayout.png')}
        style={{width: 480, height: 280}}
      />
      <View className='flex flex-col items-center absolute top-24'>
        <Logo />
      </View>
      <View className='flex mt-12' />
      <SafeAreaView>
        <View className='flex gap-y-4'>
          <Text className='text-white text-center text-3xl font-InterMedium'>Welcome back</Text>
          <Text className='text-white/50 text-center text-lg p-4 font-InterRegular'>Login as one from over 21,000 students in the 42 Network - ever-evolving intra companion, free and with focus on most-advanced mobile experience.</Text> 
        </View>
      </SafeAreaView>
      <View className='flex-1 w-full bottom-0'>
        <DefaultButton
          title="Authorize"
          onPress={handlePress}
        />
      </View>
    </View>
  )
}