import { Modal, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState,useEffect  } from "react";
import InDatePicker from "../generic/DatePicker";

import { PostDataToEndPoint,GetDataFromEndPoint } from "../../Utilities/api_utilities";
import { GetCurrentDateWithOffset, getCurrentActiveCampus } from "../../Utilities/event_utilities";

import { GetUserData } from "../../Utilities/UserData";
import { useStore } from "../../Utilities/store";

import { TruncateTimeToSlotIncrement } from "../../Utilities/slot_utilities";
import {Dimensions} from 'react-native';

const START_ID = 0;
const END_ID = 1;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//note there is an endpoint to retrieve the campus specific time https://api.intra.42.fr/apidoc/2.0/campus/stats.html
//However its gated by a specific requirement. Hence the default slot duration will be set for 1h by default
//30min in advance of current time (rounded up to next 15min timeframe)
export default function EvaluationSlotPicker() {

    const insertSlots = useStore((store) => store.insertSlots);
    
    const [currStartDate, setStartDate] = useState<Date>(TruncateTimeToSlotIncrement(30));
    const [currEndDate, setEndDate] = useState<Date>(TruncateTimeToSlotIncrement(30 + 60));

    const [descriptionText, setdescriptionText] = useState<string>("Placeholder")
    const [isValidSlot, setIsValidSlot] = useState<boolean>(true);


    useEffect(() => {
        // Update the document title using the browser API
        FormatDescriptionText();
        console.log("wtf 2")

    },[descriptionText]);
    


    //user experience is pretty shit
    const onDateChange = (id: number, date: Date) => {

        if(id == START_ID){
            setStartDate(date)
        }
        else{
            setEndDate(date)
        }

        FormatDescriptionText();
    }

    const FormatDescriptionText = () => {

        // console.log("[Success] Slot is valid")
        let errorString = validateTimeSlot();
        if(!errorString){
            setdescriptionText(FormatValidDescription());
            setIsValidSlot(true)
        }
        else{
            setdescriptionText(errorString)
            setIsValidSlot(false)
        }
    }

    const validateTimeSlot = () => {

        if(currEndDate < TruncateTimeToSlotIncrement(45,currStartDate)){
            return "[Error] Slot is not at least 1h long"
        }
        if(currStartDate < TruncateTimeToSlotIncrement(30)){
            return "[Error] Slot is not at least 30min in the future"
        }
        if(currEndDate > TruncateTimeToSlotIncrement(60*24 -15,currStartDate)){
            return "[Error] Slot cannot be longer than 24 hours (it can, but come on...)"
        }
        //probably worth to make a case for preventing multi day slots...maybe
        return null;
    }

    const FormatValidDescription = () => {

        const diffTime = (currEndDate.getTime() - currStartDate.getTime())
        const hours = Math.floor(diffTime /1000 /60 /60);
        const minutes = diffTime /1000 /60  %60;
        let formattedString = `You are about to create a slot thats `
        if(hours)
            formattedString +=`${hours}h `
        if(minutes){
            if(hours)
                formattedString +=`and `
            formattedString +=`${minutes}min `
        }
        formattedString +=`long.`
        return formattedString;
    }

    const CreateSlot = async () => {
        try {
            const userData = GetUserData();
            let querystring = `slot[user_id]=${userData.id}&slot[begin_at]=${currStartDate.toISOString()}&slot[end_at]=${currEndDate.toISOString()}`;
            const response = await PostDataToEndPoint("/v2/slots",querystring);
            insertSlots(response)
        } catch (error) {
            console.log(error)
        }
    }
 
 

    return (
            <View style={styles.container}>
                    <Text style={styles.text}>Start:</Text>

                    <InDatePicker id= {START_ID} date={TruncateTimeToSlotIncrement(30)} onDateChange={onDateChange}></InDatePicker>
                    <Text style={styles.text}>End:</Text>
                    <InDatePicker id= {END_ID} date={TruncateTimeToSlotIncrement(30 + 60)} onDateChange={onDateChange}></InDatePicker>
                    <Text style={styles.durationText} >{descriptionText}</Text>
                    <View style={styles.buttonsBottomRowActive}>
                    <TouchableOpacity onPress={()=>console.log("Cancel Pressed")}>
                        <Text style={styles.buttonText} >Cancel</Text>
                    </TouchableOpacity>
                    {isValidSlot &&
                    <TouchableOpacity onPress={CreateSlot}>
                        <Text style={styles.buttonText} >Confirm</Text>
                    </TouchableOpacity>
                    }
                    </View>
            </View>
    );
  };


const styles = StyleSheet.create({
    container:{
        // flex: 1,
        backgroundColor: '#1A1A1A',
        borderColor: 'grey',
        borderWidth: 2,
        padding: 5,
        alignSelf: 'center',
        width:windowWidth/1.5,
    },
    buttonsBottomRowActive:{
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
        // backgroundColor: '#1F1F1F',
        // alignSelf: 'center',
        borderColor: 'red',
        // borderWidth: 2,
    },
    buttonText:{
        // flex: 1,
        color: 'white',
        backgroundColor: '#1F1F1F',
        // alignSelf: 'center',
        fontSize: 22,
        // borderColor: 'red',
        // borderWidth: 2,
        padding: 2,
    },
    durationText:{
        color: 'grey',
        // backgroundColor: '#1F1F1F',
        alignSelf: 'center',
        // fontSize: 20,
        borderColor: 'red',
        // borderWidth: 2,
        padding: 2,
        textAlign: 'right',
        marginTop: 10,
    },
})
