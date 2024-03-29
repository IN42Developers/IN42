import {StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import InDatePicker from "../generic/DatePicker";

import { PostDataToEndPoint,GetDataFromEndPoint } from "../../Utilities/api_utilities";
import { GetCurrentDateWithOffset, getCurrentActiveCampus } from "../../Utilities/event_utilities";

import { GetUserData } from "../../Utilities/UserData";
import { useStore } from "../../Utilities/store";

//note there is an endpoint to retrieve the campus specific time https://api.intra.42.fr/apidoc/2.0/campus/stats.html
//However its gated by a specific requirement. Hence the default slot duration will be set for 1h by default
//30min in advance of current time (rounded up to next 15min timeframe)
export default function EvaluationSlotPicker() {

    const insertSlots = useStore((store) => store.insertSlots);
    
    
    const [currStartDate, setStartDate] = useState<Date>(()=>{
        const bestPossibleDate = new Date();
        const minuteOffset = 30;
        let minutes = (Math.floor(bestPossibleDate.getMinutes()/15)+1) * 15 + minuteOffset;
        bestPossibleDate.setMinutes(minutes,0,0);
        return bestPossibleDate;
    });
    const [currEndDate, setEndDate] = useState<Date>(()=>{
        const startDateWithOffet = new Date(currStartDate);
        startDateWithOffet.setHours(startDateWithOffet.getHours() + 1);
        return startDateWithOffet
    });
  

    const CreateSlot = async () => {
        try {
            const userData = GetUserData();
            // console.log(userData)
            let querystring = `slot[user_id]=${userData.id}&slot[begin_at]=${currStartDate.toISOString()}&slot[end_at]=${currEndDate.toISOString()}`;
            const response = await PostDataToEndPoint("/v2/slots",querystring);
            console.log("response = ",response);
            insertSlots(response)
        } catch (error) {
            // console.log(error)
        }
    }



    return (
      <View style={styles.container}>
        <Text style={styles.text}>Start:</Text>

        <InDatePicker date={currStartDate} onDateChange={setStartDate}></InDatePicker>
        <Text style={styles.text}>End:</Text>
        <InDatePicker date={currEndDate} onDateChange={setEndDate}></InDatePicker>
        <Text style={styles.durationText} >Confirm</Text>
        <View style={styles.buttonsBottomRow}>
        <TouchableOpacity>
            <Text style={styles.buttonText} >Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={CreateSlot}>
            <Text style={styles.buttonText} >Confirm</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  };


const styles = StyleSheet.create({
    container:{
        // flex: 1,
        borderColor: 'red',
        borderWidth: 2,
        alignSelf: 'center',
    },
    buttonsBottomRow:{
        flexDirection: "row",
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
        // alignSelf: 'center',
        borderColor: 'red',
        borderWidth: 2,
    },
    buttonText:{
        // flex: 1,
        color: 'white',
        backgroundColor: '#1F1F1F',
        // alignSelf: 'center',
        fontSize: 22,
        // borderColor: 'red',
        borderWidth: 2,
        padding: 2,
    },
    durationText:{
        color: 'grey',
        // backgroundColor: '#1F1F1F',
        alignSelf: 'center',
        // fontSize: 20,
        // borderColor: 'red',
        borderWidth: 2,
        padding: 2,
    },
})
