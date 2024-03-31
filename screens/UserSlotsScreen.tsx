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
import { SortByDateAscending } from "../Utilities/slot_utilities"

export default function UserSlotsScreen() {

    const initSlots = useStore((store) => store.initSlots);
    const CreateSlots = useStore((store) => store.CreateEvalSlot);
    const slotChunks = useStore((store) => store.Slots);
    let slotDays:string[] = [];// custom user facing strings

    for (let i = 0; i < slotChunks.length; i++) {
        const day = IsoDateToWeekDay(slotChunks[i].date)
        if(!slotDays.includes(day))
            slotDays.push(day)
    }

    if(!slotDays.includes("Today")) {
        slotDays.unshift("Today");
    }
    if(!slotDays.includes("Tomorrow")) {
        slotDays.splice(1,0,"Tomorrow");
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
                    title={item}
                    ComponentData={slotChunks.filter((element) =>IsoDateToWeekDay(element.date) == item).sort(SortByDateAscending)}  
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