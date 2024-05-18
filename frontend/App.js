import React, { useEffect, useState } from 'react'
import { StatusBar, Platform } from 'react-native';

import { DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as Linking from "expo-linking";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, Inter_900Black } from '@expo-google-fonts/inter';
import * as NavigationBar from 'expo-navigation-bar';

import { isTokenStillValid} from './Utilities/TokenStorage';
import { HomeNavigationSubStack,  AppStack, AuthStack } from './Utilities/NavigationStack';
import { AuthContext } from './Context';
import { LoadCounterPeriod,AssertUserCanRequestData, GetUserData } from './Utilities/UserData';
import LogData, { logType, sendJSCrashData, sendNativeCrashData } from './Utilities/debugging';

import {setJSExceptionHandler,setNativeExceptionHandler} from 'react-native-exception-handler'

//setup deep linking
const prefix = Linking.createURL('/');

//handle crashes for JS and Native
setJSExceptionHandler((error ,isFatal) => {

  let userData = GetUserData();

  sendJSCrashData(error,isFatal,userData)
});

//this could break your setup if you don't have it defined
if(!process.env.IN42_DEV)
  setNativeExceptionHandler((msg) =>{
    let userData = GetUserData();
    sendNativeCrashData(msg,userData)
});

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  const linking = {
    prefixes:[prefix],
    config:{
      screens: {
        index: "index",
        home: "home"
      }
    }
  }


  //way to create function to be called from different screens to switch stacks
  const authContext = React.useMemo(() =>{
    return {
      Login: () => {
        LogData(logType.INFO, "isLoggedIn =",isLoggedIn )
        setIsLoading(false);
        setIsLoggedIn(true);
      },
      Logout: () => {
        LogData(logType.INFO, "isLoggedIn =",isLoggedIn )
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    }
  },[])
  
  const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'rgba(16, 16, 16, 1)',
      navigationBarHandleColor: '#0E0E0E'
    },
  };
  //random invalid time 1693689163
  useEffect(() => {
    const retrieveData = async () => {
      try {
          await LoadCounterPeriod();
          if(AssertUserCanRequestData() == false){
            return;
          }
          LogData(logType.INFO,'after Counter Retrieval');
          const validToken = await isTokenStillValid();
          setIsLoggedIn(validToken);
          setIsLoading(false); //currently does nothing 
      } catch (error) {
        LogData(logType.ERROR,error);
        alert(error);
      }
    }
    retrieveData();
    if (Platform.OS == 'android')
      NavigationBar.setBackgroundColorAsync("#202020");
  },[])



  if(isLoading){
    //display the loading screen screen
  }

  let [fontsLoaded] = useFonts({
    // Loads the Inter Font from Expo's Google Font package and renders them
    // Also take a look at tailwind.config.js file
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={AppTheme} linking={linking}>
      <StatusBar barStyle="light-content" navigationBarHandleColor="#202020" backgroundColor="transparent" showHideTransition={true} translucent={true} />
        { isLoggedIn ? <AppStack/> : <AuthStack/> }
      </NavigationContainer>
      </AuthContext.Provider>
  );
}
