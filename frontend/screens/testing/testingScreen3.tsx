import { View,StyleSheet,Text,SafeAreaView,ScrollView,FlatList,Image } from "react-native"
import React, { useState } from 'react'
import { GetDataFromEndPoint, PostDataToEndPoint, StallTimeBetweenApiCalls } from "../../Utilities/api_utilities"
import { GetCurrentDateWithOffset, getCampusEvents } from "../../Utilities/event_utilities"
import ListContainer from "../../components/generic/ListContainer"
import EventItem from "../../components/buttons/EventItem"
import EvaluationItem from "../../components/buttons/EvaluationItem"
import { GetUserData } from "../../Utilities/UserData"
import { useStore } from "../../Utilities/store"
// import { GetImageFromUrl } from "../../Utilities/api_utilities"
import SubscribeButton from "../../components/buttons/SubscribeButton"
import { LinearGradient } from "expo-linear-gradient"
import { Button } from "../../components/buttons/Button"
import LogData, { logType } from "../../Utilities/debugging"
import { getAccessToken } from "../../Utilities/TokenStorage"

export default function TestingScreen3() {

    const v2_me =async () => {
        try {
            const data = await GetDataFromEndPoint(`/v2/me`)
            LogData(logType.INFO,data);
        } catch (error) {
            
        }
    }

    const location_stats = async () => {
        const userData = GetUserData();
        LogData(logType.INFO,userData.id);
        let date = new Date();
        date.setMonth(date.getMonth()-3)
        const startdate = date.toISOString();
        const enddate = new Date().toISOString();
        LogData(logType.INFO,"---------------------------------");
        const params = `?page[size]=100` //begin_at=${startdate}&end_at=${enddate}
        // LogData(logType.INFO,getAccessToken());
        try {
            const data = await GetDataFromEndPoint(`/v2/users/${userData.id}/locations${params}`)
            data.map((entry)=>{
                let sDate = new Date(entry.begin_at)
                let eDate = new Date(entry.end_at)
                let duration_in_min = (eDate.getTime() - sDate.getTime()) /1000/60
                LogData(logType.INFO,entry.campus_id,entry.begin_at,entry.end_at,sDate.toLocaleDateString(),`${Math.floor(duration_in_min /60)}h`,`${Math.floor(duration_in_min % 60)}min`);

            })
            // LogData(logType.INFO,data);
                
                
            } catch (error) {
            }
    }

    const achievements = async () => {
        try {
            const userData = GetUserData();
            LogData(logType.INFO,userData.id);
            const params = `?page[size]=100`
            // const data = await GetDataFromEndPoint(`/v2/campus/51/achievements${params}`)
            const data = await GetDataFromEndPoint(`/v2/achievements${params}`)
            LogData(logType.INFO,data); 
        } catch (error) {
            
        }
    }
    const specific_achievements = async () => {
        try {
            const achievement_id = 7;
            const data = await GetDataFromEndPoint(`/v2/achievements/${achievement_id}`)
            LogData(logType.INFO,JSON.stringify(data)); 
        } catch (error) {
            
        }
    }
    //get a 403
    const titles = async () => {
        try {
            const userData = GetUserData();
            LogData(logType.INFO,userData.id);
            const params = `?page[size]=100`
            const data = await GetDataFromEndPoint(`/v2/users/${userData.id}/titles`)
            LogData(logType.INFO,JSON.stringify(data)); 
        } catch (error) {
            
        }
    }
    const projects = async () => {
        try {
            const userData = GetUserData();
            LogData(logType.INFO,userData.id);
            const params = `?page[size]=100`
            const data = await GetDataFromEndPoint(`/v2/teams`)
            LogData(logType.INFO,JSON.stringify(data)); 
        } catch (error) {
            
        }
    }
    //https://profile.intra.42.fr/exams/17891/exams_users/755542
    //https://profile.intra.42.fr/exams/17891/exams_users
    const exams = async () => {
        
            
            try {
                const userData = GetUserData();
                // LogData(logType.INFO,userData.id);
                const params = `?page[size]=100&filter[campus_id]=9`;
                // const data = await GetDataFromEndPoint(`/v2/exams/graph/on/created_at/by/day${params}`)
                const date = new Date();
            let datePlusOne = new Date(date.setDate(date.getDate() +1));
            // const data =  await getCampusEvents();
            // const data = await GetDataFromEndPoint(`/v2/events?begin_at=${new Date().toISOString()}&end_at=${datePlusOne.toISOString()}`) //&utf8=%E2%9C%93&q%5Bkind_in%5D%5B%5D=&q%5Bdifficulty_in%5D%5B%5D=&q%5Bevents_themes_theme_id_in%5D%5B%5D=
            // const data = await GetDataFromEndPoint(`/v2/projects/:project_id/exams`)
            // const data = await GetDataFromEndPoint(`/v2/projects/1321/exams`)
            // const data = await GetDataFromEndPoint(`/v2/exams/1451`)
            
            // const data = await GetDataFromEndPoint(`/v2/exams/${i}`,false)
            // await StallTimeBetweenApiCalls();
            // if(data){
                //     LogData(logType.INFO,i,data.campus.id,data.campus.name,data.begin_at)
                // }
                
            const examid = 17891;
            // const data = await GetDataFromEndPoint(`/v2/exams/${examid}`)
            // await StallTimeBetweenApiCalls();
            const data2 = await GetDataFromEndPoint(`/v2/exams/${examid}/exams_users`)
            await StallTimeBetweenApiCalls();
            LogData(logType.INFO,JSON.stringify(data2)); 

            let querystring = `user_id=${userData.id}`;
            let postReqEndpoint = `/v2/exams/${examid}/exams_users`;
            
                const data1 = await PostDataToEndPoint(postReqEndpoint,querystring);
                LogData(logType.INFO,JSON.stringify(data1)); 
            }
            catch(error){}
    }

    const random = async () => {
        try {
            const userData = GetUserData();
            LogData(logType.INFO,userData.id);
            const params = `?page[size]=100`
            const data = await GetDataFromEndPoint(`/v2/users/${userData.id}/projects_users`)
            LogData(logType.INFO,JSON.stringify(data)); 
        } catch (error) {
            
        }
    }
    

    return (
        <SafeAreaView style={{flex: 1,paddingTop: 30}}>
            <View style={styles.container}>
                <Button onPress={v2_me}><Text>v2_me</Text></Button>
                <Button onPress={location_stats}><Text>/v2/users/:id/locations</Text></Button>
                <Button onPress={achievements}><Text>achievements</Text></Button>
                <Button onPress={specific_achievements}><Text>specific_achievements</Text></Button>
                <Button onPress={titles}><Text>titles</Text></Button>
                <Button onPress={projects}><Text>projects</Text></Button>
                <Button onPress={exams}><Text>exams</Text></Button>
                <Button onPress={random}><Text>random</Text></Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
      },
      text: {
        fontSize: 18,
        color: 'white',
      },
    text2:{
        color: 'white',
        marginTop:24,
        padding: 30,
        backgroundColor: 'grey',
        fontSize: 24
    }
})