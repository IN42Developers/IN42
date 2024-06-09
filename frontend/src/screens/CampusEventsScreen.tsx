import { View,StyleSheet,Text,SafeAreaView } from "react-native"
import React, { useState, useEffect } from 'react'
import ListContainer from "../components/general/ListContainer"
import EventItem from "../components/events/EventItem"
import { useIn42Store } from '../services/state/store'

const CampusEventsScreen:React.FC = () => {

    const allEvents = useIn42Store((store) => store.events);

    return (
        <SafeAreaView style={{flex: 1}}>
            <ListContainer headerStyle="collapsed" ComponentData={allEvents}  ChildComponent={EventItem} />
        </SafeAreaView>
    )
}

export default CampusEventsScreen;