import { StyleSheet, Text, TouchableOpacity, View,Image,ImageBackground } from 'react-native';
import React from 'react';
import RoundedDescriptor from '../generic/RoundedDescriptor';
import { getMonthFromDate, getShortDayFromDate,getEventTypeColorGradient as getImageFromEventType } from '../../Utilities/event_utilities.tsx'
import { useNavigation } from '@react-navigation/native'
import { getCampusTimeZone } from '../../Utilities/UserData';
import { AntDesign } from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient'

const MiniEventItem = ({data,callback}) => {

  const navigation = useNavigation();
  if(data === undefined)
    console.log('Title: ',data.name);
  if(data === undefined){
    data={
      location:'<LOCATION>',
      description: '<Default description>',
      date: '<Default date>',
      name: '<This is a Dummy Title>',
      kind: '<event Type>',
      subscribed: true,
      // begin_at: '0000-00-00T00:00:00.000Z'
    }
  }


  console.log(data)
  let location = data.location;
  let locationDefined = (location == "" || location == null || location == undefined) ? false : true;
  location = location.split(' ')[0];
  // console.log(eventData.location);

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
  if (title.length > maxLength) {
    title = title.slice(0, maxLength - 3) + "..."; 
  }
  eventType = data.kind
  eventType = eventType.replace(/_/g," "); //replace all _ with spaces
  let EventImgPath = getImageFromEventType(data.kind);


  const ShowDetails = () =>{
    console.log('trying to navigate')
    //a bit silly and should be reworked but may workf or now
    navigation.navigate("EventDetails",{ 
      eventData: data,
      });
  }

  return (
    <TouchableOpacity style={styles.button} onPress={callback}>
      <View style={styles.container}>
        <LinearGradient
        colors={EventImgPath} // An array of colors for the gradient
        start={{ x: 0, y: 0 }} // Start point (0,0) is top-left, (1,1) is bottom-right
        end={{ x: 1, y: 1 }} // End point
        style={styles.ImgDate}>
        {/* <ImageBackground
          source={EventImgPath}
          style={styles.ImgDate}
          >
        </ImageBackground> */}
          <Text style={styles.dayText}>{weekdayAbbreviation}</Text>
          <Text style={[styles.dayText,{fontSize: 22, fontWeight: 'bold',paddingBottom: 4 }] }>{weekDayNumber}</Text>
          <Text style={styles.dayText}>{monthName}</Text>
        </LinearGradient>
        <View style={styles.rightSection}>
          <Text style={styles.TypeText}>{eventType}</Text>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.DescriptorContainer}>
            <View style={styles.leftDescriptor}>
              <RoundedDescriptor  title={formattedTime} scale ={.4} IconName='calendar'/>
              {locationDefined && <RoundedDescriptor  title={location} scale ={.4} IconName='enviromento'/>}
            </View>
            {data.subscribed == true ?
            <AntDesign style={styles.subscribedIcon} name='check'></AntDesign>
            : null }
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 4,
    overflow: 'hidden',
    // borderRadius: 1,
    // borderColor: 'white',
    // borderWidth: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  DescriptorContainer: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: "space-between",
    borderColor: 'green',
    // borderWidth: 1,
    
  },
  leftDescriptor:{
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: "space-between",
    borderColor: 'green',
    // borderWidth: 1,
  },
  ImgDate: {
    width: 75,
    // height: 85,
    borderRadius: 4,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    overflow: 'hidden',
    tintColor: 'green',
  },
  dayText: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 12,
    margin: -3,
    textTransform: 'uppercase',
  },
  TypeText: {
    flex: 1,
    color: 'lightgrey',
    fontWeight: 'bold',
    fontSize: 10,
    // margin: -3,
    textTransform: 'uppercase',
  },
  subscribedIcon: {
    // flex: 1,
    flexDirection: 'row',
    color: 'lightgrey',
    // color: 'lime',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'flex-end',
    // alignContent: 'flex-end',
    // margin: -3,
    textTransform: 'uppercase',
  },
  titleText: {
    flex: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  rightSection: {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 4,
    overflow: 'hidden',
  },
});

export default MiniEventItem;
