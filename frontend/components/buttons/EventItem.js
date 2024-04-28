import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import MiniEventItem from './MiniEventItem';
import ExpandedEventItem from './ExpandedEventItem';
import { useNavigation } from '@react-navigation/native';

const EventItem = ({data}) => {

  const [expanded, SetExpanded] = useState(false);
  const navigation = useNavigation();

  const ShowDetails = () =>{
    console.log('trying to navigate')
    //a bit silly and should be reworked but may workf or now
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
