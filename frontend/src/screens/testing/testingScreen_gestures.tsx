import { View,StyleSheet,Text,SafeAreaView,ScrollView,FlatList,useWindowDimensions } from "react-native"
import React, { useState } from 'react'

import { GestureHandlerRootView } from "react-native-gesture-handler"
import { PanGestureHandler } from "react-native-gesture-handler"
import Animated,{useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS} from "react-native-reanimated"
import { GetDataFromEndPoint } from "../../utils/api_utilities"
import { useIn42Store } from "../../services/state/store"

export default function TestingScreenGestures() {
    const {height} = useWindowDimensions()
    const y = useSharedValue(0);

    const InitEvents = useIn42Store((store) => store.initEvents);
    const initEvaluations = useIn42Store((store) => store.initEvaluations);

    const randomfunction = () =>{
        console.log('EXECUTED FUNCTION');
    }

    const unlockGestureHandler = useAnimatedGestureHandler({
        onStart: () => {
            console.log('On Start');
        },
        onActive: (event) => {
            y.value = event.translationY;
            if(y.value >height/10)
                y.value = height/10;
            console.log('height = ',height)
            console.log('event.translationY = ',event.translationY)
            // if( event.translationY >)
            console.log('On Active');

        },
        onEnd: (event) => {
            // console.log(event); 
            console.log('event velocity',event.velocityY);
            // let data = GetDataFromEndPoint('/v2/me');
            // console.log(data); 
            runOnJS(InitEvents)();
            // initEvaluations()
            y.value = 0;

        },
    })

    const animatedContainerStyle = useAnimatedStyle(() =>( {
        transform: [ {translateY: withTiming(y.value,{
            duration: 100,
            easing: Easing.linear,
        })} ],
    }))

    return (
        <GestureHandlerRootView style={styles.container}>
            <Animated.View style={[styles.container,animatedContainerStyle]}>
            <Text style={styles.text2}>TEXT </Text>
            <Text style={styles.text2}>TEXT </Text>
            <Text style={styles.text2}>TEXT </Text>
            <Text style={styles.text2}>TEXT </Text>
            <Text style={styles.text2}>TEXT </Text>
                <PanGestureHandler onGestureEvent={unlockGestureHandler}>
                    <Animated.View style={styles.area} />
                </PanGestureHandler>
            </Animated.View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center"
    },
    text:{
        color: 'white',
        fontSize:30,
        justifyContent: "center",
        alignItems: "center"

    }, 
    text2:{
        color: 'white',
        marginTop:24,
        padding: 30,
        backgroundColor: 'grey',
        fontSize: 24
    },
    area:{
        backgroundColor: 'red',
        position: 'absolute',
        width: '100%',
        height: 100,
        // bottom: 0,
        // left: 0,
    }
})