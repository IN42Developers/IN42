import { useState } from "react"
import { View,StyleSheet,TouchableOpacity,Text, TextStyle, ViewStyle } from "react-native"
import { useIn42Store } from "../../services/state/store";
import { useEffect } from "react";
import { ToggleEventSubscription } from "../../utils/events/event_utilities";

import LogData, { logType } from "../../utils/debugging/debugging";
import { useTypedTranslation } from "../../hooks/useTypedTranslation";
import In42Icon from "../general/ui_basic/In42Icon";

interface ToggleStyles {
    containerOn: ViewStyle,
    containerOff: ViewStyle,
    textOn: TextStyle,
    textOff: TextStyle,
}

interface SubscribeButtonProps {
    eventID: number,
    initialState?:boolean,
    isfull?: boolean ,
    scale?:number,
    style?: ToggleStyles,
}

const SubscribeButton:React.FC<SubscribeButtonProps> = ({
    eventID,
    initialState=true,
    scale=1,
    isfull=false,
    style=styles }) => {

    if(isfull)
        return null;

    const [toggle,SetToggle] = useState(initialState);
    const {t} = useTypedTranslation();

    const textData={true: t('events_subscribe'), false: t('events_unSubscribe')};
    const updateEventSubscriptionStatus = useIn42Store((store) => store.updateEventSubscriptionStatus);
    
    let text: string = toggle ? textData.false.toUpperCase() : textData.true.toUpperCase();
    let maxTextLength: number = textData.true.length > textData.false.length ? textData.true.length : textData.false.length
    let btnWidth: number = maxTextLength * 10 * scale;

    useEffect(() =>{
        SetToggle(initialState);
    },[initialState]);


    const ToggleEvent = async () => {
        try {
            SetToggle(!toggle); //setting this to make the experience smoother
            let ret = await ToggleEventSubscription(eventID);
            updateEventSubscriptionStatus(eventID,ret);
            SetToggle(ret);
        } catch (error) {
            LogData(logType.ERROR,error);
        }

    }
    return (
        <TouchableOpacity onPress={ToggleEvent} style={[styles.containerGeneral,toggle ? style.containerOff : style.containerOn ,{width: btnWidth}]}>
            <In42Icon origin={'lucide'} name={toggle ? 'CalendarMinus2': 'CalendarPlus' } size={24} color={"white"}></In42Icon>
            <Text style={[toggle ? style.textOff : style.textOn, {fontSize: 14 * scale}]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerGeneral: {
        flex: 1,
        maxWidth: 148,
        flexDirection: 'row',
        borderRadius: 200,
        paddingVertical: 10,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerOn: {
        backgroundColor: '#333',
        borderColor: '#00000000',
    },
    containerOff: {
        borderColor: '#333',
        borderWidth: 2,
    },
    textOn: {
        color: 'lightgray',
        fontFamily: 'Inter_700Bold',
    },
    textOff: {
        color: 'lightgray',
        fontFamily: 'Inter_700Bold'
    },
})

export default SubscribeButton;