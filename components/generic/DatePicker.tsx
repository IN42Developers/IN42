import {StyleSheet, Text, View } from "react-native"
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

interface Props {
  date: Date; // Define the type of the 'date' prop
  onDateChange: (newDate: Date) => void;
}


const DatePicker = ( props: Props ) => {
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
        <Text style={styles.text}>{currDate.toDateString()}</Text>
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
        />
      )}
    </View>
  );
};


export default DatePicker;

const styles = StyleSheet.create({
    container:{
        // flex: 1,
        flexDirection: 'row',
        borderColor: 'red',
        borderWidth: 2,
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
        borderColor: 'red',
        borderWidth: 2,
    }
})
