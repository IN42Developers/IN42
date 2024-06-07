import React from 'react';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { View, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import ListContainer from '../components/general/ListContainer';
import EventItem from '../components/events/EventItem';
import EvaluationItem from '../components/evaluation/EvaluationItem';
import UserInfoCard from '../components/home/UserInfoCard';
import { useNavigation } from '@react-navigation/native'
import { useIn42Store } from '../services/state/store';
import { shallow } from 'zustand/shallow'

import { GestureHandlerRootView } from "react-native-gesture-handler"
import { PanGestureHandler } from "react-native-gesture-handler"
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS } from "react-native-reanimated"
import EmptyContainerItem from '../components/general/EmptyContainerItem';

import { refreshToken } from '../utils/TokenStorage';
import LogData, { logType } from '../utils/debugging/debugging';
import { GetUserData } from '../utils/UserData';

export default function HomeScreen() {
  const {height} = useWindowDimensions();

  const navigation = useNavigation();
  
  const subbedEvents = useIn42Store((store) =>store.events.filter((event)=>event.subscribed == true), shallow)
  const upcomingEvaluations = useIn42Store((store) => store.evaluations);
  const RefreshUserData = useIn42Store((store) => store.RefreshUserData);

  const y = useSharedValue(0);

  const unlockGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
    },
    onActive: (event) => {
        y.value = event.translationY;
        if(y.value >height/10)
            y.value = height/10;

    },
    onEnd: (event) => {
        runOnJS(RefreshUserData)(); //bit sketchy, not sure needs to run on js main thread, not ui
        y.value = 0;

    },
})

const animatedContainerStyle = useAnimatedStyle(() =>( {
  transform: [ {translateY: withTiming(y.value,{
      duration: 100,
      easing: Easing.linear,
  })} ],
}))

  useEffect(()=>{
    RefreshUserData();
  },[])


  function NavigateToCampusEventScreen() {
    LogData(logType.INFO,'trying to navigate to CampusEventScreen')
    navigation.navigate("CampusEvents");
  }

  function NavigateUserSlotScreen() {
    LogData(logType.INFO,'trying to navigate to NavigateUserSlotScreen')
    navigation.navigate("UserSlotScreen");
  }

  const handlePress = async () => {
    try {
      await refreshToken();
      
    } catch (error) {
      
    }
  }

  // const evalData = [{id:1,dummy: true},{id:2,dummy: true},{id:3,dummy: true},{id:4,dummy: true}] //upcomingEvaluations
  const emptyEvaluationText = 'It’s calm here. No upcoming evaluations so far.'
  const emptyEventText = 'You are not subscribed to any events at the moment. You can use the + to add one.'

  return (
    <GestureHandlerRootView style={{ display: 'flex', flex: 1 }}>
      <Animated.View style={[{flex: 1}, animatedContainerStyle]}>
        <UserInfoCard />
        <ListContainer title={'Evaluations'} ComponentData={upcomingEvaluations} detailIcon='layout' containerStyle={styles.evaluationContainer} emptyListComponent={<EmptyContainerItem text={emptyEvaluationText} icon='book'/>} ChildComponent={EvaluationItem} onDetailPressed={NavigateUserSlotScreen}/>
        <ListContainer title={'Events'} ComponentData={subbedEvents} emptyListComponent={<EmptyContainerItem text={emptyEventText} icon='calendar' />} ChildComponent={EventItem} onDetailPressed={NavigateToCampusEventScreen}/>  
        <PanGestureHandler onGestureEvent={unlockGestureHandler}>
          <Animated.View style={styles.area} />
        </PanGestureHandler>
      </Animated.View> 
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  evaluationContainer:{
    maxHeight: '30%',
    flex: 0,
    paddingHorizontal: 16,
    paddingTop: 18,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  userInfoCardContainer: {
    // borderColor: 'yellow',
    // borderWidth: 1,
    height: '30%',
  },
  listsContainer: {
    flex:5,
  },
  separator: {
    margin: 10,
  },
  area:{
    // backgroundColor: 'red', //add for debugging purposes
    position: 'absolute',
    width: '100%',
    height: '20%',
    // bottom: 0,
    // left: 0,
}
});