import { View,StyleSheet,Text,SafeAreaView,TouchableOpacity } from "react-native"
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { UnsubscribeEvent,SubscribeEvent,ToggleEventSubscription,CheckEventSubscriptionStatus } from '../Utilities/event_utilities.js'
import AttendenceCounter from "../components/generic/AttendenceCounter.js";
import { getCampusTimeZone } from "../Utilities/UserData.js";
import { useStore } from "../Utilities/store.js";
import { useNavigation } from "@react-navigation/native";
import SubscribeButton from "../components/buttons/SubscribeButton.js";
import NavigateBackButton from "../components/buttons/NavigateBackButton.js";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons'
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native";

export function getCurrentEvent() {
    const currEvent = useStore((store)=>store.events.find((item)=>item.id == eventData.eventData.id));
    return currEvent;
  }  

export default function EventDetailScreen() {

  const route = useRoute();
  const eventData = route.params;
  const navigation = useNavigation();
    
  const currEvent = useStore((store)=>store.events.find((item)=>item.id == eventData.eventData.id)); //needs cleanup
  const GetNextEvent = useStore((store)=> store.GetNextEvent)

    // console.log("currEvent",eventData.id)

    // const title = props.eventData.name;
    if(currEvent === null)
        return;
    const title = currEvent.name;
    const type = currEvent.kind;

    if(title === null)
        return;

    let tempDate = new Date (currEvent.begin_at);
    const date = tempDate.toLocaleDateString('en-US',getCampusTimeZone()) +' '+ tempDate.toLocaleTimeString('en-US',getCampusTimeZone());

    const details = currEvent.description;

    const NextEvent =  () => {
        // console.log(currEvent)
        console.log('Next Event jaaaa')
        let nextEvent = GetNextEvent(currEvent.id,1);

        if(nextEvent != null){
            navigation.navigate("EventDetails", { eventData: nextEvent, })
        }
    }

    const PrevEvent =  () => {
        console.log('Navigating to Previous Event')
        let nextEvent = GetNextEvent(currEvent.id,-1);

        if(nextEvent != null) {
            navigation.navigate("EventDetails",{ eventData: nextEvent, })
        }
    }

    const press = () => {
        navigation.goBack();
    }

    return (
      <SafeAreaView className="flex-1">
         <View className="flex-[2] pt-2 px-4 content-center justify-center bg-[#202020]">
            <View id="Wrapper">
               <Text className="text-gray-400 font-InterBold text-sm mb-2">{date}</Text>
               <Text className="text-white font-InterBold text-xl mr-20">{title}</Text>
            </View>
            <View className="flex flex-row items-start my-3 justify-between">
            <AttendenceCounter currentCount={eventData.nbr_subscribers} maxCount={eventData.max_people} scale={1}></AttendenceCounter>
               <SubscribeButton eventID={currEvent.id} scale={.9} initialState={currEvent.subscribed}></SubscribeButton>
            </View>
         </View>

         <View className="flex-[6] mt-8 px-4">
            <Text className="text-white text-2xl font-InterSemibold mb-2">About this event</Text>
            <ScrollView>
               <Text className="text-gray-400 text-base font-InterRegular">{details}</Text>
            </ScrollView>
         </View>

         <View style={styles.bottomView}>
            <TouchableOpacity style={styles.nextEventButton} onPress={PrevEvent} >
               {/* <Text>Prev Event</Text> */}
               <ChevronLeftIcon stroke='#fff' size='32' />
            </TouchableOpacity>
            {/* <View style={{flex:1 ,backgroundColor: 'grey'}}></View> */}
            <TouchableOpacity style={styles.nextEventButton} onPress={NextEvent} >
            {/* <Text>Next Event</Text> */}
               <ChevronRightIcon stroke='#fff' size='32' />
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // paddingTop: 30,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'grey',
        alignContent: 'center',
        justifyContent: 'center',
    },
    subText:{
        color: 'white',
        fontSize: 16,
        alignContent: 'center',
        justifyContent: 'center',
    },
    TitleText:{
        // flex: 3,
        color: 'white',
        fontSize: 20,
    },
    text:{
        // flex: 1,
        color: 'white',
        fontSize: 12,
    },
    typeText:{
        flex: 1,
        color: 'white',
        fontSize: 30,
    },
    DetailText:{
        flex: 1,
        color: '#9F9F9F',
        fontSize: 16,
        // alignContent: 'center',
        // justifyContent: 'center'
    },
    topView: {
        flex: 2, 
        paddingTop: 10,
        paddingHorizontal: 20,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#333'
    },
    detailsView: {
        flex: 6,
        paddingHorizontal: 20,
        alignContent: 'center',
        // backgroundColor: '#1F1F1F',
        // alignItems: 'stretch',
    },
    nextEventButton: {
        // backgroundColor: 'lightgrey',
        padding: 5,
        width: 50,
        alignContent: 'center',
        justifyContent: 'center',
    },
    bottomText: {
        color: 'white',
        fontSize: 16,
        // backgroundColor: '#333333',
    },
    pageView: {
        alignContent: 'center',
        justifyContent: 'center',
        
    },
    bottomView:{
        // flex: 1,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    NavigationVertBox: {
        // flex:1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        // padding: 20,
    },
    InfoVertBox: {
        // flex:1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 10,
    }
})