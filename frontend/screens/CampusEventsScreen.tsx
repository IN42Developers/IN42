import { View,StyleSheet,Text,SafeAreaView } from "react-native"
import React, { useState, useEffect } from 'react'
import ListContainer from "../components/generic/ListContainer"
import EventItem from "../components/buttons/EventItem"
import { useStore } from '../Utilities/store'

export default function CampusEventsScreen() {

    const allEvents = useStore((store) => store.events);

    return (
        <SafeAreaView style={{flex: 1}}>
            <ListContainer title={'Campus events'} ComponentData={allEvents}  ChildComponent={EventItem}/>
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