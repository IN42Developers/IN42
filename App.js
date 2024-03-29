import { DefaultTheme, Link, NavigationContainer} from '@react-navigation/native';
import React from 'react'

import { isTokenStillValid} from './Utilities/TokenStorage';
import { useEffect,useState } from 'react';
import { HomeNavigationSubStack,  AppStack, AuthStack } from './Utilities/NavigationStack';
import { AuthContext } from './Context';
import { StyleSheet, Image, View, StatusBar } from 'react-native';
import { LoadCounterPeriod,AssertUserCanRequestData } from './Utilities/UserData';

import * as Linking from "expo-linking";

const prefix = Linking.createURL('/');

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading,setIsLoading] = useState(true)

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
        setIsLoading(false);
        setIsLoggedIn(true);
      },
      Logout: () => {
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    }
  },[])
  
  const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'rgba(16, 16, 16, 1)'
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
  },[])



  if(isLoading){
    //display the loading screen screen
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={AppTheme} linking={linking}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
        { isLoggedIn ? <AppStack/> : <AuthStack/> }
      </NavigationContainer>
      </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCircle: {
    width: 45,
    height: 45,
  }
});
