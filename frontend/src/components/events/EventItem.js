import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import MiniEventItem from './MiniEventItem';
import { useNavigation } from '@react-navigation/native';
import LogData, { logType } from '../../utils/debugging/debugging';

const EventItem = ({data}) => {

  const [expanded, SetExpanded] = useState(false);
  const navigation = useNavigation();

  const ShowDetails = () =>{
    LogData(logType.INFO,'trying to navigate')
    // a bit silly and should be reworked but may workf or now
    navigation.navigate("EventDetails",{ 
      eventData: data,
    });
  }

  return (
    <MiniEventItem data={data} callback={ShowDetails}/>
  )
}

const styles = StyleSheet.create({
  
});

export default EventItem;
