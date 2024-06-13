import { StyleSheet, Text, TouchableOpacity, View,Image,ImageBackground, ViewStyle } from 'react-native';
import React from 'react';
import { getCampusTimeZone } from '../../utils/UserData';
import { useIn42Store } from '../../services/state/store';
import LogData, { logType } from '../../utils/debugging/debugging';
import { SlotChunk } from '../../types/customTypes';

interface SlotItemProps {
  data: SlotChunk,
  style: ViewStyle,
}

const SlotItem:React.FC<SlotItemProps> = ({data,style}) => {
  const DeleteUserSlotChunk = useIn42Store((store)=>store.DeleteUserSlotChunk);

  console.log(data);

  if(!data ){
    return null;
  }

  let startDate = new Date(data.data[0].begin_at);
  let endDate: Date;
  if(data.data.length == 1){
    endDate = new Date(data.data[0].end_at);
  }
  else
    endDate = new Date(data.data[data.data.length -1].end_at);

  const CampusTimeZone = getCampusTimeZone();
  const timeFormat:{} = {hour: '2-digit',minute: '2-digit',timeZone: CampusTimeZone.timeZone}

  let DayString =  `${startDate.toLocaleDateString('en-US',CampusTimeZone)}`;
  let TimeSlot = `${startDate.toLocaleTimeString('en-US',timeFormat)} - ${endDate.toLocaleTimeString('en-US',timeFormat)}`;

//testing
  DayString = `${startDate.toLocaleTimeString('en-US',timeFormat)}`
  TimeSlot = `${endDate.toLocaleTimeString('en-US',timeFormat)}`


  const DeleteUserSlot = async () =>{
    try {
      DeleteUserSlotChunk(data.id)
      
    } catch (error) {
      LogData(logType.ERROR,error);
    }
  }

  return (
    <TouchableOpacity style={[style,styles.button]} onPress={DeleteUserSlot}> 
      <View style={styles.container}>
      <Text style={styles.titleText}>{DayString}</Text>
      <Text style={styles.titleText}>{TimeSlot}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    // margin: 4,
    // padding: 4,
    overflow: 'hidden',
    borderRadius: 3,
    borderColor: '#159BA5',
    borderWidth: 1.5,
    height: 50,
    // width: 110,
  },
  container: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: '#1C535D',
    alignItems: 'center',
    justifyContent: "center",
  },
  titleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
});

export default SlotItem;
