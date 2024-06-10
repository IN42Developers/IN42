import React from 'react';
import IndexScreen from '../../screens';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const AuthStack:React.FC = () => {
    return (
      <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#101010',
          },
        }}>
          <Stack.Screen name="index" options={{ statusBarColor: '#000', headerShown: false }} component={IndexScreen}/>
        </Stack.Navigator>
    );
  };