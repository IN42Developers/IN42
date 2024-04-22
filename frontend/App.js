import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native';

import { DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as Linking from "expo-linking";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import * as NavigationBar from 'expo-navigation-bar';

import { isTokenStillValid} from './Utilities/TokenStorage';
import { HomeNavigationSubStack,  AppStack, AuthStack } from './Utilities/NavigationStack';
import { AuthContext } from './Context';
import { LoadCounterPeriod,AssertUserCanRequestData } from './Utilities/UserData';
import "./global.css"

const prefix = Linking.createURL('/');

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
        console.log("isLoggedIn =",isLoggedIn )
        setIsLoading(false);
        setIsLoggedIn(true);
      },
      Logout: () => {
        console.log("isLoggedIn =",isLoggedIn )
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
          console.log('after Counter Retrieval');
          const validToken = await isTokenStillValid();
          console.log('isToken valid? = ', validToken)
          setIsLoggedIn(validToken);
          setIsLoading(false); //currently does nothing 
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
    retrieveData();
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
    Inter_800ExtraBold
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
