import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import LoginLogo from '../components/svg/loginLogo';
// import TabNavigator from '../TabNavigator';
import { Color, Ui, UiText } from '../constants/Styles';
import { StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import IndexScreen from '../screens';
import HomeScreen from '../screens/home';
import SettingsScreen from '../screens/SettingsScreen';
import EventDetailScreen from "../screens/EventDetailScreen"
import EvaluationDetailScreen from '../screens/EvaluationDetailScreen';
import CampusEventsScreen from '../screens/CampusEventsScreen';
import UserSlotsScreen from '../screens/UserSlotsScreen';
import RequestCounter from '../components/complex/RequestCounter';
import { GetRequestCounter,GetRequestCounterMax } from './UserData';

import { setAccessToken, setKeyValuePair } from './TokenStorage';
import { AuthContext } from '../Context'


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TestingScreen from "../screens/testing/testingScreen"
import TestingScreen2 from "../screens/testing/testingScreen2"
import TestingScreenGestures from '../screens/testing/testingScreen_gestures';
import { AntDesign } from '@expo/vector-icons';
import { Gradient } from '../constants/Styles';


const Stack = createStackNavigator();
const DetailStack = createStackNavigator();

//logout and MainStackHome are proxies to nest navigation components. Its good practice to have separated navigations
//, not sure if used it correct tho

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#101010',
        },
      }}>
        <Stack.Screen name="index" options={{ statusBarColor: '#000', headerShown: false }} component={IndexScreen}/>
        <Stack.Screen name="home" options={{ statusBarColor: '#000', headerShown: false }} component={HomeScreen}/>
      </Stack.Navigator>
  );
};
export const AppStack = () => {
    return (
      <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#101010',
            
          },
          headerShown:false,
        }}>
          <Stack.Screen name="home" 
            component={TabNavigator}/>
        </Stack.Navigator>
    );
  };


  export const HomeNavigationSubStack = () => {
    return (
      <DetailStack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#101010',
            // elevation: '',
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontFamily: 'Bold',
            fontSize: 16,
          },
          headerTintColor: '#fff',
          headerTitle: '',
          // headerStatusBarHeight: 84,
        }}>
          <DetailStack.Screen name="home" options={{
              headerShown: false,
                    }}
        component={HomeScreen}/>
          <DetailStack.Screen name="EventDetails" component={EventDetailScreen} options={{
              headerShown: false,
                    }}/>
          <DetailStack.Screen name="EvaluationDetailScreen" component={EvaluationDetailScreen}/>
          <DetailStack.Screen name="CampusEvents" component={CampusEventsScreen}/>
          <DetailStack.Screen name="UserSlotScreen" component={UserSlotsScreen}/>
        </DetailStack.Navigator>
    );
  };


  
  export  const TabNavigator = () => {
  
    const Tab = createBottomTabNavigator();

    const insets = useSafeAreaInsets();

    return (
      <Tab.Navigator screenOptions={{
        tabBarStyle: {
            backgroundColor: '#000',
            borderTopColor: '#1B1B1B',
            borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontFamily: 'Bold',
          fontSize: 16,
        },
        tabBarLabel: '',
        headerShown: false,
        tabBarActiveTintColor: '#fff',
    }}>
  
          <Tab.Screen name="Home" options={{
              tabBarIcon: ({ color, size }) => ( <AntDesign name="home" color={'#fff'} size={28} />),
              tabBarLabel: '',
          }} component={HomeNavigationSubStack} />
          <Tab.Screen name="testing" options={{
              tabBarIcon: ({ color, size }) => ( <AntDesign name="home" color={'#fff'} size={28} />),
              tabBarLabel: '',
          }} component={TestingScreen} />
          <Tab.Screen name="Gestures" options={{
              tabBarIcon: ({ color, size }) => ( <AntDesign name="home" color={'#fff'} size={28} /> ),
              tabBarLabel: '',
          }} component={TestingScreenGestures} />
          <Tab.Screen name="Settings" options={{
              tabBarIcon: ({ color, size }) => ( <AntDesign name="setting" color={'#fff'} size={28} /> ),
              tabBarLabel: '',
          }} component={SettingsScreen} />
      </Tab.Navigator>
    )
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
      marginRight: 16
    },
    RequestCounter:{
      fontSize: 30,
      color: 'white',
    },
  });
