import { useState } from "react"
import { View,StyleSheet,TouchableOpacity,Text } from "react-native"
import { useStore } from "../../Utilities/store";
import { useEffect } from "react";
import { ToggleEventSubscription } from "../../Utilities/event_utilities";

import { CalendarPlusIcon } from "lucide-react-native";

export default function SubscribeButton ({eventID, initialState=true,scale=1, textData={true: 'SUBSCRIBE', false: 'UNSUBSCRIBE'} , style=styles}) {
    const [toggle,SetToggle] = useState(initialState);

    const updateEventSubscriptionStatus = useStore((store) => store.updateEventSubscriptionStatus);
    
    let text: string = toggle ? textData.false : textData.true;
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
            console.log(error);
        }

    }


    function onPress(params:any) {
        SetToggle(!toggle);
        console.log('toggle = ',toggle);
    } 

    return (
        <TouchableOpacity onPress={ToggleEvent} style={[toggle ? style.containerOff : style.containerOn ,{width: btnWidth,justifyContent: 'center',alignItems: 'center'}]}>
            <CalendarPlusIcon stroke="white" size="24" />
            {/* Note for Jean: When shown Unsubscribe, change Icon to CalendarMinus2Icon */}
            <Text style={[toggle ? style.textOff : style.textOn, {fontSize: 14 * scale}]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerOn: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#333',
        borderRadius: 200,
        maxWidth: 142,
        paddingVertical: 10,
        borderColor: '#00000000',
        gap: 8,
    },
    containerOff: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#333',
        borderWidth: 2,
        borderRadius: 200,
        maxWidth: 148,
        paddingVertical: 10,
        gap: 8,
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