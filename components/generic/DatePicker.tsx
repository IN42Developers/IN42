import {StyleSheet, Text, View } from "react-native"
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

import { IsoDateToWeekDay,formatDateToCustomString } from "../../Utilities/slot_utilities";
import { GetCurrentDateWithOffset } from "../../Utilities/event_utilities";

interface Props {
  date: Date; // Define the type of the 'date' prop
  onDateChange: (newDate: Date) => void;
}


const InDatePicker = ( props: Props ) => {
    const [currDate, setDate] = useState<Date>(props.date);
    const [mode, setMode] = useState<'date' | 'time'>('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event: any, selectedDate: Date) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      props.onDateChange(selectedDate);
    };
  
    const showMode = (currentMode: 'date' | 'time') => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
    
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatepicker}>
        <Text style={styles.text}>{formatDateToCustomString(currDate)}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showTimepicker}>
        <Text style={styles.text}>{currDate.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={currDate}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date()}
          maximumDate={GetCurrentDateWithOffset(0,0,7)}
        />
      )}
    </View>
  );
};


export default InDatePicker;

const styles = StyleSheet.create({
    container:{
        // flex: 1,
        flexDirection: 'row',
        // borderColor: 'red',
        borderWidth: 2,
        justifyContent: 'space-between',
    },
    timeElement:{
        flex: 1,
        borderColor: 'red',
        borderWidth: 2,
    },
    text:{
        // flex: 1,
        color: 'white',
        backgroundColor: '#1F1F1F',
        alignSelf: 'center',
        // borderColor: 'red',
        fontSize: 18,
        borderWidth: 2,
    }
})
