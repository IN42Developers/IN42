import {StyleSheet, Text, View } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import DatePicker from "../generic/DatePicker";

import { PostDataToEndPoint } from "../../Utilities/api_utilities";
import { GetUserData } from "../../Utilities/UserData";

// interface Slot {
//     slot: number,
//     slot[begin_at] =
// }

export default function EvaluationSlotPicker() {
    const [currStartDate, setStartDate] = useState<Date>(new Date());
    const [currEndDate, setEndDate] = useState<Date>(new Date());
  

    const CreateSlot = async () => {
        try {
            
            const userData = GetUserData();
            // console.log(userData)
            let querystring = `slot[user_id]=${userData.id}&slot[begin_at]=${currStartDate.toISOString()}&slot[end_at]=${currEndDate.toISOString()}`;
            const response = await PostDataToEndPoint("/v2/slots",querystring);
            console.log("response = ",response);
        } catch (error) {
            // console.log(error)
        }
    }

    return (
      <View style={styles.container}>
        <DatePicker date={new Date()} onDateChange={setStartDate}></DatePicker>
        <DatePicker date={new Date()} onDateChange={setEndDate}></DatePicker>
        <Text style={styles.text}>{currStartDate.toDateString() + " " + currStartDate.toLocaleTimeString()}</Text>
        <Text style={styles.text}>{currEndDate.toDateString() +" " +currEndDate.toLocaleTimeString()}</Text>
        <TouchableOpacity>
            <Text style={styles.text} onPress={CreateSlot}>make request</Text>
        </TouchableOpacity>
      </View>
    );
  };


const styles = StyleSheet.create({
    container:{
        flex: 1,
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
