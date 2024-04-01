import { StyleSheet, SafeAreaView, FlatList, Button, Text, Modal } from "react-native"
import React, { useState, useEffect } from 'react'
import SlotItem from "../components/buttons/SlotItem"
import SlotContainer from "../components/generic/SlotContainer"

import { useStore } from '../Utilities/store';
import { IsoDateToWeekDay,retrieveDatesFromChunks } from "../Utilities/slot_utilities"
import EvaluationSlotPicker from "../components/complex/EvaluationSlotPicker"
import { SortByDateAscending } from "../Utilities/slot_utilities"
import { EvaluationSlotProvider, useEvaluationSlotContext } from "../components/context/EvaluationSlotContext";

export default function SlotsScreen() {

    const initSlots = useStore((store) => store.initSlots);
    const slotChunks = useStore((store) => store.Slots);
    const { mainModalVisible, setMainModalVisible} = useEvaluationSlotContext();
    // const [visible, setVisible] = React.useState(false);

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
        console.log("wtf")
    },[])

    const bla = () => {
        console.log("pressed fucking button")
        // setVisible(true);
        setMainModalVisible(true)
    }
    

    return (

        <SafeAreaView style={{flex: 1}}>
            <Modal transparent={true} visible={mainModalVisible}>
                <EvaluationSlotPicker ></EvaluationSlotPicker>
            </Modal>
            <Button title="wowow" onPress={bla}>
            </Button>
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