import { Modal, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from 'react-native';
import { useState,useEffect  } from "react";

import { PostDataToEndPoint,GetDataFromEndPoint } from "../../Utilities/api_utilities";
import { GetCurrentDateWithOffset, getCurrentActiveCampus } from "../../Utilities/event_utilities";
import { GetUserData } from "../../Utilities/UserData";
import { useStore } from "../../Utilities/store";
import { TruncateTimeToSlotIncrement } from "../../Utilities/slot_utilities";
import InDatePicker from "../generic/DatePicker";
import { Button } from "../buttons/Button";

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
      return "[Error] Slot is not at least 1h long"
    }
    if(currStartDate < TruncateTimeToSlotIncrement(30)){
      return "[Error] Slot is not at least 30min in the future"
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
            console.log(error)
        }
    }
 
    const PressCancel =  () => {
        console.log("Cancel Pressed")
        onDismissModal()
    }
 

    return (
      <View className="flex-1 justify-center items-center">
        <View className="flex bg-[#1B1B1B] rounded-lg w-5/6">
          <View className="border-b border-b-[#159BA5]">
            <Text className="text-[#159BA5] text-xl font-InterSemibold py-4 px-6">Create new slot</Text>
          </View>
          <View className="my-4 mx-6 gap-y-4">
            <Text className="text-gray-300 border-red-600 text-xs font-InterRegular">START</Text>
            <InDatePicker id= {START_ID} date={TruncateTimeToSlotIncrement(30)} onDateChange={onDateChange}></InDatePicker>
          </View>
          <View className="mx-6 gap-y-4">
            <Text className="text-gray-300 border-red-600 text-xs font-InterRegular">END</Text>
            <InDatePicker id={END_ID} date={TruncateTimeToSlotIncrement(30 + 60)} onDateChange={onDateChange}></InDatePicker>
          </View>
          <Text className="text-gray-400 self-center border-red-600 py-4" >{descriptionText}</Text>
            <View className="flex-row justify-between gap-x-2 bg-[#212121]">
              <Button onPress={PressCancel} variant="dialog">
                <Text className="text-gray-400 text-center text-lg font-InterSemibold" >CANCEL</Text>
              </Button>
                {isValidSlot &&
                  <Button onPress={CreateSlot} variant="dialog">
                    <Text className="text-gray-400 text-center text-lg font-InterSemibold">CONFIRM</Text>
                  </Button>
                }
            </View>
          </View>
        </View>

    );
  };