import { Modal, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react";

import { PostDataToEndPoint,GetDataFromEndPoint } from "../../Utilities/api_utilities";
import { GetCurrentDateWithOffset, getCurrentActiveCampus } from "../../Utilities/event_utilities";
import { GetUserData } from "../../Utilities/UserData";
import { useStore } from "../../Utilities/store";
import { TruncateTimeToSlotIncrement } from "../../Utilities/slot_utilities";
import InDatePicker from "../generic/DatePicker";
import { Button } from "../buttons/Button";
import BlurOverlay from "../generic/BlurOverlay";
import LogData, { logType } from "../../Utilities/debugging";

const START_ID = 0;
const END_ID = 1;

//note there is an endpoint to retrieve the campus specific time https://api.intra.42.fr/apidoc/2.0/campus/stats.html
//However its gated by a specific requirement. Hence the default slot duration will be set for 1h by default
//30min in advance of current time (rounded up to next 15min timeframe)
export default function EvaluationSlotPicker({modalVisible,onDismissModal}) {

  const insertSlots = useStore((store) => store.insertSlots);
  const [currStartDate, setStartDate] = useState<Date>(TruncateTimeToSlotIncrement(30));
  const [currEndDate, setEndDate] = useState<Date>(TruncateTimeToSlotIncrement(30 + 60));
  const [descriptionText, setdescriptionText] = useState<string>("Placeholder")
  const [isValidSlot, setIsValidSlot] = useState<boolean>(true);
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    FormatDescriptionText();

  }, [descriptionText, currStartDate, currEndDate]);

  //user experience is pretty shit
  const onDateChange = (id: number, date: Date) => {
    if(id == START_ID)
      setStartDate(date)
    else
      setEndDate(date)
    FormatDescriptionText();
  }

  const FormatDescriptionText = () => {
    let errorString = validateTimeSlot();
    if(!errorString) {
      setdescriptionText(FormatValidDescription());
      setIsValidSlot(true)
    }
    else {
      setdescriptionText(errorString)
      setIsValidSlot(false)
    }
    };

  const validateTimeSlot = () => {
    if(currEndDate < TruncateTimeToSlotIncrement(45,currStartDate)) {
      return "[Error] Your slot has to be 1 hour long."
    }
    if(currStartDate < TruncateTimeToSlotIncrement(30)){
      return "[Error] Slot is not at least 30 minutes in the future"
    }
    if(currEndDate > TruncateTimeToSlotIncrement(60*24 -15,currStartDate)){
      return "[Error] Slot cannot be longer than 24 hours (it can, but come on...)"
    }
      //multi-day slots are allowed, Will be correctly handled and displayed by UI
      return null;
    }

    const FormatValidDescription = () => {

        const diffTime = (currEndDate.getTime() - currStartDate.getTime())
        const hours = Math.floor(diffTime / 1000 / 60 / 60);
        const minutes = diffTime / 1000 / 60 % 60;
        let formattedString = `Total slot time: `
        if(hours)
            formattedString +=`${hours} hour`
        if(minutes){
            if(hours)
                formattedString +=`and `
            formattedString +=`${minutes}min `
        }
        formattedString +=``
        return formattedString;
    }

    const CreateSlot = async () => {
        try {
            const userData = GetUserData();
            let querystring = `slot[user_id]=${userData.id}&slot[begin_at]=${currStartDate.toISOString()}&slot[end_at]=${currEndDate.toISOString()}`;
            const response = await PostDataToEndPoint("/v2/slots",querystring);
            insertSlots(response)
            onDismissModal()
        } catch (error) {
          LogData(logType.ERROR,error)
        }
    }
 
    const PressCancel =  () => {
        LogData(logType.INFO,"Cancel Pressed")
        onDismissModal()
    }
 

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BlurOverlay visible={true} />
        <View style={{ display: 'flex', backgroundColor: '#1B1B1B', borderRadius: 4, width: '87%' }}>
          <View style={{ borderBottomWidth: 1, borderColor: '#159BA5' }}>
            <Text style={{ color: '#159BA5', fontSize: 20, fontFamily: 'Inter_600SemiBold', paddingTop: 16, paddingBottom: 16, paddingLeft: 24, paddingRight: 24 }}>Create new slot</Text>
          </View>
          <View style={{ marginVertical: 16, marginHorizontal: 24, rowGap: 16 }}>
            <Text style={{ color: 'lightgray', borderColor: 'red', fontSize: 11, fontFamily: 'Inter_400Regular' }}>START</Text>
            <InDatePicker id={START_ID} date={TruncateTimeToSlotIncrement(30)} onDateChange={onDateChange}></InDatePicker>
          </View>
          <View style={{ marginHorizontal: 24, rowGap: 16 }}>
            <Text style={{ color: 'lightgray', borderColor: 'red', fontSize: 11, fontFamily: 'Inter_400Regular' }}>END</Text>
            <InDatePicker id={END_ID} date={TruncateTimeToSlotIncrement(30 + 60)} onDateChange={onDateChange}></InDatePicker>
          </View>
          <Text style={{ color: 'lightgray', alignSelf: 'center', borderColor: 'red', paddingVertical: 16 }}>{descriptionText}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', columnGap: 8, backgroundColor: '#212121' }}>
              <Button onPress={PressCancel} variant="dialog">
                <Text style={{ color: 'gray', textAlign: 'center', fontSize: 16, fontFamily: 'Inter_600SemiBold' }}>CANCEL</Text>
              </Button>
              
                {isValidSlot &&
                  <Button onPress={CreateSlot} variant="dialog">
                    <Text style={{ color: 'gray', textAlign: 'center', fontSize: 16, fontFamily: 'Inter_600SemiBold' }}>CONFIRM</Text>
                  </Button>
                }
                
            </View>
          </View>
        </View>

    );
  };