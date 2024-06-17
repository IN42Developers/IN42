import { View,StyleSheet,Text,SafeAreaView,ScrollView,FlatList } from "react-native"
import React, { useState } from 'react'
import DefaultButton from "../../components/general/ui_basic/Button"
import { DeleteDataFromEndpoint, GetDataFromEndPoint, PostDataToEndPoint } from "../../utils/api_utilities"
import { GetUserData } from "../../utils/UserData"
import { getCampusTimeZone } from "../../utils/UserData"
// import {getJsonFileAsCorrector} from "../../Utilities/test"
import useCountdown from "../../hooks/useCountdown"
import {useEffect} from "react"

export default function TestingScreen2() {

    const [events, setEvents] = useState([])
    const [secondsLeft, setSeconds] = useCountdown();
    
    useEffect(()=>{
        setSeconds(1115);

    },[])

    const getMe =async () => {
        const me = await GetDataFromEndPoint(`/v2/me/`);//${string}
        console.log(me);
    }
    const PostEvalSlot =async () => {
        try {
            
            const userData = GetUserData();
            const slotBeginAt = '2023-09-08T8:30:00.000Z'
            const slotEndAt = '2023-09-08T20:30:00.000Z'
            let querystring = `slot[user_id]=${userData.id}&slot[begin_at]=${slotBeginAt}&slot[end_at]=${slotEndAt}`;
            const me = await PostDataToEndPoint(`/v2/slots`,querystring);//${string}
            console.log(me);
        } catch (error) {
            console.log(error)
        }
    }
    const DeleteSpecificEvalSlot =async () => {
        
        try {
            const slotID = 81791483;
            const me = await DeleteDataFromEndpoint(`/v2/slots/${slotID}`);//${string}
            console.log(me);
        } catch (error) {
            console.log(error)
        }
    }
    const DeleteAllEvalSlots =async () => {
        
        const slotData = await GetDataFromEndPoint(`/v2/me/slots?filter[future]=true`);
        await new Promise(resolve => setTimeout(resolve, 600));
        // console.log(slotData);
        for (let i = 0; i < slotData.length; i++) {
        try {                
                await DeleteDataFromEndpoint(`/v2/slots/${slotData[i].id}`);//${string}
                await new Promise(resolve => setTimeout(resolve, 600));
            } catch (error) {
                console.log(error)
            }
        }
        console.log('deletion complete')
    }
    const DeleteAllEvalSlotsOptimized = async () => {
        try {
          const slotData = await GetDataFromEndPoint(`/v2/me/slots?filter[future]=true`);
          const deletePromises = [];
      
          for (const slot of slotData) {
            deletePromises.push(
              DeleteDataFromEndpoint(`/v2/slots/${slot.id}`)
                .then(() => new Promise(resolve => setTimeout(resolve, 600))) // Add a delay if necessary
                .catch(error => {
                  console.log(`Error deleting slot with ID ${slot.id}:`, error);
                })
            );
          }
      
          await Promise.all(deletePromises);
          console.log('Deletion complete');
        } catch (error) {
          console.log('Error fetching slot data:', error);
        }
      }

    //exam 02 1320
    const exams =async () => {
            try {
                const wtf = await GetDataFromEndPoint(`/v2/projects/1320/exams`);//${string}
                await new Promise(resolve => setTimeout(resolve, 600));
                console.log(wtf);
                
            } catch (error) {
                console.log(error)
            }
    }
    
    const DateTesting =async () => {
        let currDate = new Date();
        console.log(currDate);
        console.log(currDate.toLocaleString())
        console.log(currDate.toLocaleString('en-US',{timeZone: 'Europe/Berlin'}))
        console.log(currDate.toLocaleString('en-US',getCampusTimeZone()))
        console.log(currDate.toLocaleTimeString('en-US',getCampusTimeZone()))
        console.log(currDate.toLocaleDateString('en-US',getCampusTimeZone()))
        console.log(getCampusTimeZone());
    }

    const Campus =async () => {
        const campus = await GetDataFromEndPoint(`/v2/campus/51`);//${string}
        console.log(campus);
    }
    const loadjson = () => {
        // const json = getJsonFileAsCorrector();
        console.log(json)
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <Text style={styles.text2}>Countdown {secondsLeft >0 ? secondsLeft:''}</Text>
            {/* <DefaultButton title={"getMe"} onPress={getMe}/>
            <DefaultButton title={"Post Eval Slot"} onPress={PostEvalSlot}/>
            <DefaultButton title={"Delete Specific Eval Slot"} onPress={DeleteSpecificEvalSlot}/>
            <DefaultButton title={"Delete All Eval Slot"} onPress={DeleteAllEvalSlots}/>
            <DefaultButton title={"Delete All Eval Slot OPTIMIZED"} onPress={DeleteAllEvalSlotsOptimized}/>
            <DefaultButton title={"Exam"} onPress={exams}/>
            <DefaultButton title={"DateTesting"} onPress={DateTesting}/>
            <DefaultButton title={"Campus"} onPress={Campus}/>
            <DefaultButton title={"loadjsondata"} onPress={loadjson}/> */}
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
    }
})