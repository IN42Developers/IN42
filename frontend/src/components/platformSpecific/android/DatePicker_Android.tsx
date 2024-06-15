import {StyleSheet, Text, View } from "react-native"
import React, { useEffect } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';
import { useState } from "react";

import { IsoDateToWeekDay,formatDateToCustomString } from "../../../utils/slot_utilities";
import { GetCurrentDateWithOffset } from "../../../utils/events/event_utilities";
import LogData, { logType } from "../../../utils/debugging/debugging";

interface InDatePickerProps {
  id: number,
  date: Date; // Define the type of the 'date' prop
  onDateChange: (id: number, date: Date) => void;
}


const InDatePicker_Android:React.FC<InDatePickerProps> = ({id,date,onDateChange} ) => {
    const [currDate, setDate] = useState<Date>(date);
    const [mode, setMode] = useState<'date' | 'time'>('date');
    const [show, setShow] = useState(false);
  
    useEffect(() => {
      // Update the document title using the browser API
      LogData(logType.INFO,"Rerendering DatePicker")
  });


    const onChange = (event: DateTimePickerEvent, date: Date) => {
      const currentDate = new Date(event.nativeEvent.timestamp/1000*1000) ;
      setShow(false);
      setDate(currentDate);
      onDateChange(id, currentDate);
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
          is24Hour={false}
          onChange={onChange}
          minimumDate={new Date()}
          maximumDate={GetCurrentDateWithOffset(0,0,13)}
        />
      )}
    </View>
  );
};


export default InDatePicker_Android;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeElement:{
        borderColor: 'red',
        margin:4,
        borderWidth: 12,
    },
    text:{
        color: 'white',
        backgroundColor: '#1F1F1F',
        alignSelf: 'center',
        fontSize: 18,
        paddingHorizontal:10,
        paddingVertical: 5,
    }
})
