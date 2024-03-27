import { StyleSheet, SafeAreaView, FlatList, Button, Text } from "react-native"
import React, { useState, useEffect } from 'react'
import ListContainer from "../components/generic/ListContainer"
import SlotItem from "../components/buttons/SlotItem"
import SlotContainer from "../components/generic/SlotContainer"
import SlotPlaceholderItem from "../components/buttons/SlotPlaceholderItem"

import { useStore } from '../Utilities/store';
import { IsoDateToWeekDay,retrieveDatesFromChunks } from "../Utilities/slot_utilities"
import { TouchableOpacity } from "react-native-gesture-handler"
import EvaluationSlotPicker from "../components/complex/EvaluationSlotPicker"

export default function UserSlotsScreen() {

    const initSlots = useStore((store) => store.initSlots);
    const CreateSlots = useStore((store) => store.CreateEvalSlot);
    const slotChunks = useStore((store) => store.Slots);
    let slotDays = retrieveDatesFromChunks(slotChunks);

    let todayString = (new Date()).toISOString().split('T')[0];
    let tomorrow = new Date;
    tomorrow.setDate(tomorrow.getDate()+ 1)
    let tmrString = tomorrow.toISOString().split('T')[0];
    if(!slotDays.includes(todayString)) {
        slotDays.unshift(todayString);
    }
    if(!slotDays.includes(tmrString)) {
        slotDays.splice(1,0,tmrString);
    }


    useEffect( () => {
        initSlots();
    },[])


    return (
        <SafeAreaView style={{flex: 1}}>
                <TouchableOpacity onPress={CreateSlots}>
                    <Text style={styles.text}>Create slot</Text>
                    </TouchableOpacity>
                    <EvaluationSlotPicker></EvaluationSlotPicker>
            <FlatList 
                data={slotDays}
                renderItem={({item}) =>(
                    <SlotContainer 
                    title={IsoDateToWeekDay(item)}
                    ComponentData={slotChunks.filter((element) =>element.date == item)}  
                    ChildComponent={SlotItem}/> //SlotItem
                )}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        // flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        color: 'white',
        fontWeight: 'bold'
    },
    text2:{
        color: 'white',
        marginTop:24,
        padding: 30,
        backgroundColor: 'grey',
        fontSize: 24,
        fontWeight: 'bold'
    }
})