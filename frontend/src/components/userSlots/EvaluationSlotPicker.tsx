import { Modal, Platform, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react";

import { PostDataToEndPoint,GetDataFromEndPoint } from "../../utils/api_utilities";
import { GetUserData } from "../../utils/UserData";
import { useIn42Store } from "../../services/state/store";
import { TruncateTimeToSlotIncrement } from "../../utils/slot_utilities";
import { Button } from "../general/ui_basic/Button";
import BlurOverlay from "../general/BlurOverlay";
import LogData, { logType } from "../../utils/debugging/debugging";
import InDatePicker_Android from "../platformSpecific/android/DatePicker_Android";
import InDatePicker_IOS from "../platformSpecific/ios/DatePicker_IOS";
import { useTypedTranslation } from "../../hooks/useTypedTranslation";

const START_ID = 0;
const END_ID = 1;

//should be variable depending on campus
const minSlotLength = 60;
const minSlotInFutureTime = 60;
//custom limitation
const maxSlotDurationInHours = 24;

interface EvaluationSlotPickerProps {
  modalVisible: boolean,
  onDismissModal: any,
}

//note there is an endpoint to retrieve the campus specific time https://api.intra.42.fr/apidoc/2.0/campus/stats.html
//However its gated by a specific requirement. Hence the default slot duration will be set for 1h by default
//30min in advance of current time (rounded up to next 15min timeframe)
const EvaluationSlotPicker:React.FC<EvaluationSlotPickerProps> = ({modalVisible,onDismissModal}) => {

  const insertSlots = useIn42Store((store) => store.insertSlots);
  const [currStartDate, setStartDate] = useState<Date>(TruncateTimeToSlotIncrement(30));
  const [currEndDate, setEndDate] = useState<Date>(TruncateTimeToSlotIncrement(30 + 60));
  const [descriptionText, setdescriptionText] = useState<string>("Placeholder")
  const [isValidSlot, setIsValidSlot] = useState<boolean>(true);
  const [isBlurred, setIsBlurred] = useState(false);
  const { t } = useTypedTranslation();




  useEffect(() => {
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
      return t('slots_error') + " " + t('slots_errormessage_too_short',{minutes: minSlotLength}) 
    }
    if(currStartDate < TruncateTimeToSlotIncrement(30)){
      return t('slots_error') + " " + t('slots_errormessage_too_early',{minutes: minSlotInFutureTime}) 
    }
    if(currEndDate > TruncateTimeToSlotIncrement(60*24 -15,currStartDate)){
      return t('slots_error') + " " + t('slots_errormessage_too_long',{hours: maxSlotDurationInHours}) 
    }
      //multi-day slots are allowed, Will be correctly handled and displayed by UI
      return null;
    }
    const FormatValidDescription = () => {

        const diffTime = (currEndDate.getTime() - currStartDate.getTime())
        const hours = Math.floor(diffTime / 1000 / 60 / 60);
        const minutes = diffTime / 1000 / 60 % 60;
        let formattedString = t('slots_total_slot_time') + ' '
        if(hours){
          formattedString +=`${hours} `
          formattedString += (hours > 1 ? t("slots_hours"): t("slots_hour"))
        }
        if(minutes){
            formattedString +=` ${minutes}`
            formattedString += (minutes > 1 ? t("slots_minutes"): t("slots_minute"))
        }
        return formattedString;
    }

    const CreateSlot = async () => {
        try {
            const userData = GetUserData();
            if(!userData)
              return;
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
      <View style={styles.container}>
        <BlurOverlay visible={true} />
        <View style={styles.positioning}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{t('slots_modal_header')}</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.bodyHeader}>{t('slots_modal_start').toUpperCase()}</Text>
            { Platform.OS == 'android' ?
              <InDatePicker_Android id={START_ID} date={TruncateTimeToSlotIncrement(30)} onDateChange={onDateChange}></InDatePicker_Android>
              :
              <InDatePicker_IOS id={START_ID} date={TruncateTimeToSlotIncrement(30)} onDateChange={onDateChange}></InDatePicker_IOS>
            }
            </View>
          <View style={{ marginHorizontal: 24, rowGap: 16 }}>
            <Text style={styles.bodyHeader}>{t('slots_modal_end').toUpperCase()}</Text>
            { Platform.OS == 'android' ?
              <InDatePicker_Android id={END_ID} date={TruncateTimeToSlotIncrement(30 + 60)} onDateChange={onDateChange}></InDatePicker_Android>
            :
              <InDatePicker_IOS id={END_ID} date={TruncateTimeToSlotIncrement(30 + 60)} onDateChange={onDateChange}></InDatePicker_IOS>
            }
            </View>
          <Text style={styles.descriptionText}>{descriptionText}</Text>
            <View style={styles.footerContainer}>
              <Button onPress={PressCancel} variant="dialog">
                <Text style={styles.button}>{t('generic_cancel_btn').toUpperCase()}</Text>
              </Button>
                { isValidSlot &&
                  <Button onPress={CreateSlot} variant="dialog">
                    <Text style={styles.button}>{t('generic_confirm_btn').toUpperCase()}</Text>
                  </Button>
                }
            </View>
          </View>
        </View>

    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  positioning: {
    display: 'flex',
    backgroundColor: '#1B1B1B',
    borderRadius: 4,
    width: '87%'
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderColor: '#159BA5'
  },
  headerText: {
    color: '#159BA5',
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24
  },
  bodyContainer: {
    marginVertical: 16,
    marginHorizontal: 24,
    rowGap: 16
  },
  bodyHeader: {
    color: 'lightgray',
    fontSize: 11,
    fontFamily: 'Inter_400Regular'
  },
  descriptionText: {
    color: 'lightgray',
    alignSelf: 'center',
    borderColor: 'red',
    paddingVertical: 16
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 8,
    backgroundColor: '#212121'
  },
  button: {
     color: 'gray',
     textAlign: 'center',
     fontSize: 16,
     fontFamily: 'Inter_600SemiBold', 
  }
})


export default EvaluationSlotPicker;