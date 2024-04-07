import React from 'react';
import { StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

// import TabNavigator from '../TabNavigator';
import { GetRequestCounter,GetRequestCounterMax } from './UserData';
import { setAccessToken, setKeyValuePair } from './TokenStorage';
import RequestCounter from '../components/complex/RequestCounter';
import { AuthContext } from '../Context'
import IndexScreen from '../screens';
import HomeScreen from '../screens/home';
import SettingsScreen from '../screens/SettingsScreen';
import EventDetailScreen from "../screens/EventDetailScreen"
import EvaluationDetailScreen from '../screens/EvaluationDetailScreen';
import CampusEventsScreen from '../screens/CampusEventsScreen';
import UserSlotsScreen from '../screens/UserSlotsScreen';

import Icon from '../constants/AutoIcon';

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
        {/* <Stack.Screen name="home" options={{ statusBarColor: '#000', headerShown: false }} component={HomeScreen}/> */}
      </Stack.Navigator>
  );
};
export const AppStack = () => {
    return (
      <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#101010',
          },
          headerShown: false,
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
            fontWeight: 'bold',
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

  export const DetailNavigationSubStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    )
  }
  
  export const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#00D2A0',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#202020',
          borderTopColor: '#595959'
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter_500Medium',
          fontSize: 11
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
          (
            <Icon name='Home' color={color} focused={focused} />
          )
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventDetailScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name='CalendarFold' color={color} focused={focused} />
          )
        }}
      />
      <Tab.Screen
        name="Evaluations"
        component={EvaluationDetailScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name='UserCheck' color={color} focused={focused} />
          )
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#202020',
            borderColor: '#595959',
            borderEndWidth: 0,
            shadowRadius: 0
          },
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'Inter_500Medium',
          },
          tabBarIcon: ({ color, focused }) => (
            <Icon name='Cog' color={color} focused={focused} />
          )
        }}
      />
    </Tab.Navigator>
    );
  };
