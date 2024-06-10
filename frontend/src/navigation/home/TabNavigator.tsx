import React from 'react';
import Icon from '../../../assets/svgs/AutoIcon';
import ShowModalButton from '../../components/general/ShowModalButton';
import { useIn42Store } from '../../services/state/store';

import CampusEventsScreen from '../../screens/CampusEventsScreen';
import UserSlotsScreen from '../../screens/UserSlotScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import TestingScreen3 from '../../screens/testing/testingScreen3';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeNavigationSubStack } from './HomeNavigationSubStack';
import { defaultNavigationStyle } from '../../styles/generalStyles/defaultNavigationStyle';

    //   {
    //     {
    //     tabBarActiveTintColor: '#00B5C0',
    //     tabBarInactiveTintColor: 'gray',
    //     headerShown: true,
    //     headerTitleAlign: 'center',
    //     tabBarStyle: {
    //       backgroundColor: '#202020',
    //       borderTopColor: '#202020',
    //     },
    //     tabBarLabelStyle: {
    //       fontFamily: 'Inter_500Medium',
    //       fontSize: 11
    //     },
    //     headerStyle: {
    //         backgroundColor: '#202020',
    //         borderColor: '#595959',
    //         borderEndWidth: 0,
    //         shadowRadius: 0
    //       },
    //       headerTitleStyle: {
    //         color: '#fff',
    //         fontFamily: 'Inter_500Medium',
    //       },
    //   }
    // }

export const TabNavigator:React.FC = () => {

    const languageObject = useIn42Store((store)=> store.language)
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions= {defaultNavigationStyle}>
      <Tab.Screen
        name="Home"
        component={HomeNavigationSubStack}
        options={{
          headerShown: false,
          tabBarIcon: renderTabBarIcon('Home'),
        title: languageObject.title_home,
        }}
      />
      <Tab.Screen
        name="Events"
        component={CampusEventsScreen}
        options={{
          tabBarIcon: renderTabBarIcon('CalendarFold'),
          title: languageObject.title_events,
        }}
      />
      <Tab.Screen
        name="Evaluations"
        component={UserSlotsScreen}
        options={{
          headerRight: () => (<ShowModalButton></ShowModalButton>),
          tabBarIcon: renderTabBarIcon('UserCheck'),
          title: languageObject.title_evaluations,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: renderTabBarIcon('Cog'),
          title: languageObject.title_settings,
        }}
      />
      {(process.env.IN42_DEV == 'true' || process.env.EXPO_PUBLIC_LOGGING == 'true') &&
      <Tab.Screen
        name="Testing"
        component={TestingScreen3}
        options={{
          tabBarIcon: renderTabBarIcon('Cog'),
        }}
      />}
    </Tab.Navigator>
    );
  };

  type TabBarIconProps = {
    color: string;
    focused: boolean;
  };

  const renderTabBarIcon = (iconName: string) => ({ color, focused }: TabBarIconProps) => (
    <Icon name={iconName} color={color} focused={focused} />
  );