import { StyleSheet, SafeAreaView, FlatList, Button, Text } from "react-native"
import React, { useState, useEffect } from 'react'
import SlotItem from "../components/buttons/SlotItem"
import SlotContainer from "../components/generic/SlotContainer"

import { useStore } from '../Utilities/store';
import { IsoDateToWeekDay,retrieveDatesFromChunks } from "../Utilities/slot_utilities"
import EvaluationSlotPicker from "../components/complex/EvaluationSlotPicker"
import { SortByDateAscending } from "../Utilities/slot_utilities"
import { EvaluationSlotProvider, useEvaluationSlotContext } from "../components/context/EvaluationSlotContext";
import SlotsScreen from "./SlotScreen";

export default function UserSlotsScreen() {



    return (
        <EvaluationSlotProvider>
            <SlotsScreen></SlotsScreen>
        </EvaluationSlotProvider>
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