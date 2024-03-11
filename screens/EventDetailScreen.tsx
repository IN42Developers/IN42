import { View,StyleSheet,Text,SafeAreaView,TouchableOpacity } from "react-native"
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { UnsubscribeEvent,SubscribeEvent,ToggleEventSubscription,CheckEventSubscriptionStatus } from '../Utilities/event_utilities.js'
import AttendenceCounter from "../components/generic/AttendenceCounter";
import { getCampusTimeZone } from "../Utilities/UserData";
import { useStore } from "../Utilities/store";
import { useNavigation } from "@react-navigation/native";
import SubscribeButton from "../components/buttons/SubscribeButton.tsx";
import NavigateBackButton from "../components/buttons/NavigateBackButton.js";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons'

export default function EventDetailScreen() {

    const route = useRoute();
    const { eventData } = route.params;
    const navigation = useNavigation();
    
    const currEvent = useStore((store)=>store.events.find((item)=>item.id == eventData.id)); //needs cleanup
    const GetNextEvent = useStore((store)=> store.GetNextEvent)

    // const title = props.eventData.name;
    if(currEvent === null)
        return;
    const title = currEvent.name;
    const type = currEvent.kind;

    let tempDate = new Date( currEvent.begin_at);
    const date =tempDate.toLocaleDateString('en-US',getCampusTimeZone()) +' '+ tempDate.toLocaleTimeString('en-US',getCampusTimeZone());

    const details = currEvent.description;

    const NextEvent =  () => {
        // console.log(currEvent)
        console.log('Next Event jaaaa')
        let nextEvent = GetNextEvent(currEvent.id,1);

        if(nextEvent != null){
            navigation.navigate("EventDetails",{ eventData: nextEvent, })
        }
    }

    const PrevEvent =  () => {
        console.log('Previous Event jaaaa')
        let nextEvent = GetNextEvent(currEvent.id,-1);

        if(nextEvent != null){
            navigation.navigate("EventDetails",{ eventData: nextEvent, })
        }
    }

    const press = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView  style={styles.container}>
            <View style={styles.topView}>
                <View style={styles.NavigationVertBox}>
                    <View>
                        <NavigateBackButton size={40}></NavigateBackButton>
                    </View>
                    <Text style={styles.typeText}>{type}</Text>
                </View>
                <Text style={styles.text}>{date}</Text>
                <Text style={styles.TitleText}>{title}</Text>
                <View style={styles.InfoVertBox}>
                    <SubscribeButton eventID={currEvent.id} scale={.9} initialState={currEvent.subscribed}></SubscribeButton>
                    <AttendenceCounter currentCount={eventData.nbr_subscribers} maxCount={eventData.max_people} scale={1}></AttendenceCounter>
                </View>
            </View>

            <View style={styles.detailsView}>
                <Text style={{color: 'white',fontSize: 24,paddingBottom: 5, fontWeight: 'bold'}}>About this event</Text>
                <ScrollView >
                    <Text style={styles.DetailText}>{details}</Text>
                </ScrollView>
            </View>

            <View style={styles.bottomView}>
                <TouchableOpacity style={styles.nextEventButton} onPress={PrevEvent} >
                    {/* <Text>Prev Event</Text> */}
                    <AntDesign name={'left'} color={'#E0E0E0'} size={30}></AntDesign>
                </TouchableOpacity>
                {/* <View style={{flex:1 ,backgroundColor: 'grey'}}></View> */}
                <TouchableOpacity style={styles.nextEventButton} onPress={NextEvent} >
                    {/* <Text>Next Event</Text> */}
                    <AntDesign name={'right'} color={'#E0E0E0'} size={30}></AntDesign>
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
        // paddingBottom: 10,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#333333'
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