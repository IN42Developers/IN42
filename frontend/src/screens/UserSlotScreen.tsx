import { StyleSheet, SafeAreaView, FlatList, Button, Text, Modal, View } from "react-native"
import React, { useState, useEffect, FunctionComponent } from 'react'
import SlotItem from "../components/userSlots/SlotItem"
import SlotContainer from "../components/general/slotContainer/SlotContainer"

import { useIn42Store } from '../services/state/store';
import { IsoDateToWeekDay,SortSlotByDateAscending, SortSlotChunkByDateAscending } from "../utils/slot_utilities"
import { SlotChunk } from "../types/customTypes";

const UserSlotsScreen: React.FC = () => {

    const initSlots = useIn42Store((store) => store.initSlots);
    const slotChunks: SlotChunk[] = useIn42Store((store) => store.Slots);

    let slotDays:string[] = [];// custom user facing strings

    for (let i = 0; i < slotChunks.length; i++) {
        const day:string = IsoDateToWeekDay(slotChunks[i].date)
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
        <SafeAreaView style={{flex: 1, marginTop: 12}}>
                <FlatList 
                    data={slotDays}
                    renderItem={({item}) =>(
                        <SlotContainer 
                        title={item}
                        ComponentData={slotChunks.filter((element) =>IsoDateToWeekDay(element.date) == item).sort(SortSlotChunkByDateAscending)}  
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

export default UserSlotsScreen