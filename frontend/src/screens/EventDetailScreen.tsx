import { View,StyleSheet,Text,SafeAreaView,TouchableOpacity } from "react-native"
import React from 'react'
import { NavigationProp, ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import AttendenceCounter from "../components/general/AttendenceCounter.js";
import { getCampusTimeZone } from "../utils/UserData";
import { useIn42Store } from "../services/state/store";
import { useNavigation } from "@react-navigation/native";
import SubscribeButton from "../components/events/SubscribeButton.js";
import { ScrollView } from "react-native-gesture-handler";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native";
import LogData, { logType } from "../utils/debugging/debugging";
import { useTypedTranslation } from "../hooks/useTypedTranslation";

const EventDetailScreen:React.FC = () => {

    const route:RouteProp<ParamListBase> = useRoute();
    const navigation:NavigationProp<ParamListBase> = useNavigation();
    const eventData = route.params;
    
    const currEvent = useIn42Store((store)=>store.events.find((item)=>item.id == eventData?.eventData?.id)); //needs cleanup
    const GetNextEvent = useIn42Store((store)=> store.GetNextEvent)
    const { t } = useTypedTranslation();
    
    if(currEvent == null)
        return;
    
    const title = currEvent.name;

    let tempDate = new Date (currEvent.begin_at);
    const date = tempDate.toLocaleDateString('en-US',getCampusTimeZone()) + ' '+ tempDate.toLocaleTimeString('en-US',getCampusTimeZone());

    const details = currEvent.description;
    let isEventFull = false;
    if(currEvent.max_people != null)
        isEventFull = currEvent.nbr_subscribers == currEvent.max_people ? true : false;

    const prevEvent = GetNextEvent(currEvent.id,-1);
    const nextEvent = GetNextEvent(currEvent.id,1);
    const NextEvent =  () => {
        LogData (logType.INFO,'Navigating to Next Event ')
        if(nextEvent != null){
            navigation.navigate("EventDetails", { eventData: nextEvent, })
        }
    }

    const PrevEvent =  () => {
        LogData (logType.INFO,'Navigating to Previous Event')
        if(prevEvent != null) {
            navigation.navigate("EventDetails",{ eventData: prevEvent, })
        }
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
                <Text style={styles.aboutHeader}>{t('events_about_event')}</Text> 
                <Text style={styles.DetailText}>{details}</Text>
            </ScrollView>

         <View style={styles.bottomView}>
            { prevEvent ?
                <TouchableOpacity style={styles.nextEventButton} onPress={PrevEvent} >
                    <ChevronLeftIcon stroke='#fff' size='32' />
                </TouchableOpacity>
                :
                //to keep the other bottom aligned we keep a dummy around
                <TouchableOpacity disabled={true}/>
            }
            { nextEvent &&
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

export default EventDetailScreen;