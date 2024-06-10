import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/home';
import EventDetailScreen from "../../screens/EventDetailScreen"
import EvaluationDetailScreen from '../../screens/EvaluationDetailScreen';
import CampusEventsScreen from '../../screens/CampusEventsScreen';
import UserSlotsScreen from '../../screens/UserSlotScreen';
import ShowModalButton from '../../components/general/ShowModalButton';
import { truncateStringAppendDots } from '../../utils/events/event_utilities';
import { defaultNavigationStyle } from '../../styles/generalStyles/defaultNavigationStyle';

const DetailStack = createStackNavigator();

export const HomeNavigationSubStack:React.FC = () => {

    return (
      <DetailStack.Navigator screenOptions={defaultNavigationStyle}>
          <DetailStack.Screen name="home" options={{
              headerShown: false,
                    }}
        component={HomeScreen}/>
          <DetailStack.Screen name="EventDetails" component={EventDetailScreen} 
           options={({ route }) => ({ 
            title: truncateStringAppendDots(route.params?.eventData?.name, 25),
          })}
          />
          <DetailStack.Screen name="EvaluationDetailScreen" component={EvaluationDetailScreen}/>
          <DetailStack.Screen name="CampusEvents" component={CampusEventsScreen}/>
          <DetailStack.Screen name="UserSlotScreen" component={UserSlotsScreen} options= {{
              title: 'Your Slots',
              headerRight: () => (<ShowModalButton></ShowModalButton>)
              }}/>
        </DetailStack.Navigator>
    );
  };
  