import {StyleSheet, Text, View } from "react-native"
import React, { useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';
import { useState } from "react";

import { IsoDateToWeekDay,formatDateToCustomString } from "../../../Utilities/slot_utilities";
import { GetCurrentDateWithOffset } from "../../../Utilities/event_utilities";
import LogData, { logType } from "../../../Utilities/debugging";

interface Props {
  id: number,
  date: Date; // Define the type of the 'date' prop
  onDateChange: (id: number, date: Date) => void;
}


const InDatePicker_IOS = ( props: Props ) => {
    const [currDate, setDate] = useState<Date>(props.date);
    // const [mode, setMode] = useState<'date' | 'time'>('date');
    // const [show, setShow] = useState(false);
  
    useEffect(() => {
      // Update the document title using the browser API
      LogData(logType.INFO,"Rerendering DatePicker")
  });


    const onChange = (event: any, selectedDate: Date) => {
      const currentDate = new Date(selectedDate.getTime()/1000*1000) ;
      // setShow(false);
      setDate(currentDate);
      props.onDateChange(props.id, currentDate);
    };
  
    // const showMode = (currentMode: 'date' | 'time') => {
    //   setShow(true);
    //   setMode(currentMode);
    // };
    
  return (
    <View style={styles.container}>
      <DateTimePicker
          testID="datePicker"
          value={currDate}
          mode={'date'}
          is24Hour={false}
          onChange={onChange}
          minimumDate={new Date()}
          maximumDate={GetCurrentDateWithOffset(0,0,13)}
          accentColor="teal"
          themeVariant="dark"
        />
      <DateTimePicker
          testID="timePicker"
          value={currDate}
          mode={'time'}
          is24Hour={false}
          onChange={onChange}
          minimumDate={new Date()}
          maximumDate={GetCurrentDateWithOffset(0,0,13)}
          accentColor="teal"
          themeVariant="dark"
        />
    </View>
  );
};


export default InDatePicker_IOS;

const styles = StyleSheet.create({
    container:{
        // flex: 1,
        flexDirection: 'row',
        // borderColor: 'red',
        // borderWidth: 2,
        // margin:4,
        justifyContent: 'space-between',
    },
    timeElement:{
        // flex: 1,
        borderColor: 'red',
        margin:4,
        borderWidth: 12,
    },
    text:{
        // flex: 1,
        color: 'white',
        backgroundColor: '#1F1F1F',
        alignSelf: 'center',
        // borderColor: 'red',
        fontSize: 18,
        // margin:10,
        // borderWidth: 2,
        paddingHorizontal:10,
        paddingVertical: 5,
        // marginHorizontal:  10,
    }
})
