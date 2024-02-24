import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import MiniEventItem from './MiniEventItem';
import ExpandedEventItem from './ExpandedEventItem';

const EventItem = ({data}) => {

  const [expanded, SetExpanded] = useState(false);

  const ShowDetails = () =>{
    SetExpanded(!expanded);
  }

  return (
    expanded ? <ExpandedEventItem data={data} callback={ShowDetails}/> : <MiniEventItem  data={data} callback={ShowDetails}/>
  )
}

const styles = StyleSheet.create({
  
});

export default EventItem;
