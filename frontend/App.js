import React, { useEffect, useState } from 'react'
import { StatusBar, Platform } from 'react-native';

import { DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as Linking from "expo-linking";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, Inter_900Black } from '@expo-google-fonts/inter';
import * as NavigationBar from 'expo-navigation-bar';

import { isTokenStillValid} from './Utilities/TokenStorage';
import { HomeNavigationSubStack,  AppStack, AuthStack } from './Utilities/NavigationStack';
import { AuthContext } from './Context';
import { LoadCounterPeriod,AssertUserCanRequestData } from './Utilities/UserData';
import LogData, { logType } from './Utilities/debugging';

import {setJSExceptionHandler,setNativeExceptionHandler} from 'react-native-exception-handler'

const prefix = Linking.createURL('/');

//

setJSExceptionHandler( (error,isFatal) => {
  console.log("EXCEPTION FUNCTIOn",error,isFatal);

  const string = "WOWOWOWOWOWOWOWOWOWOWOWOWOWOWOWOWOWOWOWOWO"
  let crashData = {
    errorDump: JSON.stringify(error),
    fatality: isFatal,
    random: string}

  
  const tokenRequest = {
    method: 'POST',
    body: JSON.stringify(crashData),
  };

  fetch("https://crashdata-7y7fitjvjq-uc.a.run.app",tokenRequest);
},true)


export const PostDataToEndPoint = async (endpoint, params ) => {

  if(AssertUserCanRequestData() == false)
      return;

  let uri = `https://api.intra.42.fr${endpoint}`;
  let tokendata = getAccessToken();
  // LogData(logType.INFO,"tokendata in getdata = ",tokendata);

  const tokenRequest = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${tokendata.access_token}`,
      },
      body: params,
    };

  try {
      LogData(logType.INFO,'POSTing to',uri)
      await IncrementRequestCounter()
      // LogData(logType.INFO,"Post Request = ",tokenRequest)
      const response = await fetch(uri,tokenRequest);
      if(response.ok){
          LogData(logType.INFO,'Suceess')
          return response.json();
      } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
  }
  } catch (error){
      LogData(logType.ERROR,error);
      throw error;
  }
}


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
