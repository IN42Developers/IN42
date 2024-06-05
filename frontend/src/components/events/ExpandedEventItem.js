import { StyleSheet, Text, TouchableOpacity, View,Image,ImageBackground } from 'react-native';
import React from 'react';
import RoundedDescriptor from '../general/RoundedDescriptor';
import { getMonthFromDate, getShortDayFromDate,getEventTypeColorGradient as getImageFromEventType } from '../../utils/events/event_utilities'
import { useNavigation } from '@react-navigation/native'
import { getCampusTimeZone } from '../../utils/UserData';
import { AntDesign } from '@expo/vector-icons'
import AttendenceCounter from '../general/AttendenceCounter';
import SubscribeButton from './SubscribeButton';
import {LinearGradient} from 'expo-linear-gradient'

const ExpandedEventItem = ({data, callback}) => {

  const navigation = useNavigation();
  if(data === undefined){
    data={
      location:'<LOCATION>',
      description: '<Default description>',
      date: '<Default date>',
      name: '<This is a Dummy Title>',
      kind: '<event Type>',
      subscribed: 'true',
      // begin_at: '0000-00-00T00:00:00.000Z'
    }
  }


  // LogData(logType.INFO,eventData)
  let location = data.location;
  location = location.split(' ')[0];
  // LogData(logType.INFO,eventData.location);

  let startDate = new Date(data.begin_at);
  
  const monthName = getMonthFromDate(startDate);
  const weekdayAbbreviation = getShortDayFromDate(startDate);
  const weekDayNumber = startDate.getDate();
  let timeZ = getCampusTimeZone();
  let formattedTime = 'INVALID'
  if(timeZ != null){
    formattedTime = startDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timeZ.timeZone,
    });
  }
  
  let title = data.name;

  ///note this seems hacky, doesnt work well with different screen size
  let maxLength = 24;
  // if (title.length > maxLength) {
  //   title = title.slice(0, maxLength - 3) + "..."; 
  // }
  eventType = data.kind
  eventType = eventType.replace(/_/g," "); //replace all _ with spaces

  let descriptionExcerpt = data.description
  let maxDescriptionLength = 1500;
    if (descriptionExcerpt.length > maxDescriptionLength) {
      descriptionExcerpt = descriptionExcerpt.slice(0, maxDescriptionLength - 3) + "..."; 
  }

  const ShowDetails = () =>{
    LogData(logType.INFO,'trying to navigate')
    //a bit silly and should be reworked but may workf or now
    navigation.navigate("EventDetails",{ 
      eventData: data,
      });
  }

  return (
    <TouchableOpacity style={styles.button} onPress={callback}>
      <LinearGradient
        colors={['#FFFFFF22','#0F0F0F']} // An array of colors for the gradient
        start={{ x: 0, y: 0 }} // Start point (0,0) is top-left, (1,1) is bottom-right
        end={{ x: 1, y: 1 }} // End point
        style={styles.container}>

        {/* <View style={styles.container}> */}

          <View style={styles.topRow}>
            <Text style={styles.TypeText}>{eventType}</Text>
            <View style={styles.topRowInfo}>
              <View style ={{marginRight: 10}}>
                <SubscribeButton eventID={data.id} initialState={data.subscribed} scale={.7}></SubscribeButton>
              </View>
              <AttendenceCounter   currentCount={data.nbr_subscribers} maxCount={data.max_people} scale={.8}/>
            </View>
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.descriptionText}>{descriptionExcerpt}</Text>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.bottomRowInfo}>
              <Text style={styles.LocationText}>{monthName} {weekDayNumber},{formattedTime} | {location}</Text>
              <Text style={styles.LocationText}>{}</Text>
            </View>
            <TouchableOpacity styles={styles.expandButton} onPress={ShowDetails}> 
                <Text style={styles.expandButtonText}>{"Expand -->"}</Text>
              {/* <View style={{flex: 1, backgroundColor: 'green', flexDirection: 'column',}}>
              </View> */}
            </TouchableOpacity>
          </View>

        {/* </View> */}
        </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 4,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    // backgroundColor: '#333',
    padding: 10,
    paddingBottom: 5,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'space-between',
    height: 150,
  },
  topRow: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  topRowInfo: {
    flexDirection: 'row',
    // borderColor: 'green',
    // borderWidth: 1,
  },
  bottomRow: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignSelf: 'flex-end',
    alignItems: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  bottomRowInfo: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    // borderColor: 'yellow',
    // borderWidth: 1,
  },
  TypeText: {
    color: 'lightgrey',
    fontWeight: 'bold',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  LocationText: {
    color: 'white',
    fontSize: 10,
  },
  titleText: {
    // flex: 1,
    // alignSelf: 'flex-start',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    textTransform: 'uppercase',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  descriptionText: {
    flex: 1,
    fontSize: 10,
    color: 'white',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  expandButton: {
    // flex: 1,
    flexDirection: 'column',
  },
  expandButtonText: {
    // flex:1,
    // backgroundColor:'green',
    color: 'white',
    fontSize: 16,
    // borderColor: 'green',
    alignItems: 'stretch',
    alignSelf: 'center',
    // borderWidth: 2,
  },
  gradient: {

  },
});

export default ExpandedEventItem;
