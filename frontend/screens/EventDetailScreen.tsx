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
import LogData, { logType } from "../Utilities/debugging";

export default function EventDetailScreen() {

    
    const route = useRoute();
    const eventData = route.params;
    const navigation = useNavigation();
    
    const currEvent = useStore((store)=>store.events.find((item)=>item.id == eventData.eventData.id)); //needs cleanup
    const GetNextEvent = useStore((store)=> store.GetNextEvent)
    
    LogData(logType.WARNING,currEvent)
    LogData(logType.WARNING,eventData)
    if(currEvent === null)
        return;
    const title = currEvent.name;
    const type = currEvent.kind;

    if(title === null)
        return;

    let tempDate = new Date (currEvent.begin_at);
    const date = tempDate.toLocaleDateString('en-US',getCampusTimeZone()) +' '+ tempDate.toLocaleTimeString('en-US',getCampusTimeZone());

    const details = currEvent.description;
    let isEventFull = false;
    if(currEvent.max_people != null)
        isEventFull = currEvent.nbr_subscribers == currEvent.max_people ? true : false;

    const prevEvent = GetNextEvent(currEvent.id,-1);
    const nextEvent = GetNextEvent(currEvent.id,1);
    const NextEvent =  () => {
        LogData (logType.INFO,'Navigating to Next Event ')
        // let nextEvent = GetNextEvent(currEvent.id,1);
        
        if(nextEvent != null){
            navigation.navigate("EventDetails", { eventData: nextEvent, })
        }
    }

    const PrevEvent =  () => {
        LogData (logType.INFO,'Navigating to Previous Event')
        // let nextEvent = GetNextEvent(currEvent.id,-1);

        if(prevEvent != null) {
            navigation.navigate("EventDetails",{ eventData: prevEvent, })
        }
    }

    const press = () => {
        navigation.goBack();
    }

    return (
      <SafeAreaView style={{flex: 1}}>
         <View style={styles.wrapper}>
            <View id="Wrapper">
               <Text style={{color: 'gray', fontSize: 12, fontFamily: 'Inter_700Bold', marginBottom: 4 }}>{date}</Text>
               <Text style={{color: 'white', fontSize: 18, fontFamily: 'Inter_600SemiBold' }}>{title}</Text>
            </View>
            <View style={styles.eventDisplay}>
            <AttendenceCounter currentCount={currEvent.nbr_subscribers} maxCount={currEvent.max_people} scale={1}></AttendenceCounter>
               <SubscribeButton eventID={currEvent.id} scale={.9} initialState={currEvent.subscribed} isfull={isEventFull}></SubscribeButton>
            </View> 
         </View>

            <ScrollView style={styles.detailsView}>
            <Text style={styles.aboutHeader}>About this event</Text> 
            {/* className="text-white text-2xl font-InterSemibold mb-2" */}
               <Text style={styles.DetailText}>{details}</Text>
               {/* className="text-gray-400 text-base font-InterRegular" */}
            </ScrollView>

         <View style={styles.bottomView}>
            {
                prevEvent ?
                <TouchableOpacity style={styles.nextEventButton} onPress={PrevEvent} >
                    <ChevronLeftIcon stroke='#fff' size='32' />
                </TouchableOpacity>
                :
                //to keep the other bottom aligned we keep a dummy around
                <TouchableOpacity disabled={true}/>
            }
            {
                nextEvent &&
                <TouchableOpacity style={styles.nextEventButton} onPress={NextEvent} >
                    <ChevronRightIcon stroke='#fff' size='32' />
                </TouchableOpacity> 
            }
         </View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'flex-start',
        flexBasis: 'auto',
        flex: 0,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#202020'
    },
    eventDisplay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 18,
        paddingBottom: 12,
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
    aboutHeader:{
        flex: 1,
        color: 'white',
        fontSize: 22,
        paddingVertical: 3,
        // alignContent: 'center',
        // justifyContent: 'center'
    },
    DetailText:{
        flex: 1,
        color: '#989FAA',
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
        flex: 1,
        marginTop: 12,
        paddingBottom: 8,
        paddingHorizontal: 8, 
        alignContent: 'center',
        // backgroundColor: '#1F1F1F',
        // alignItems: 'stretch',
        alignSelf: 'stretch',
    },
    nextEventButton: {
        // backgroundColor: 'lightgrey',
        padding: 5,
        width: 50,
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
        // borderColor: 'red',
        // borderWidth: 2,
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