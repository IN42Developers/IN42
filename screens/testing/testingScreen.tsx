import { View,StyleSheet,Text,SafeAreaView,ScrollView,FlatList,Image } from "react-native"
import React, { useState } from 'react'
import DefaultButton from "../../components/buttons/Button"
import { GetDataFromEndPoint } from "../../Utilities/api_utilities"
import { GetCurrentDateWithOffset } from "../../Utilities/event_utilities"
import ListContainer from "../../components/generic/ListContainer"
import EventItem from "../../components/buttons/EventItem"
import EvaluationItem from "../../components/buttons/EvaluationItem"
import { GetUserData } from "../../Utilities/UserData"
import { useStore } from "../../Utilities/store"
// import { GetImageFromUrl } from "../../Utilities/api_utilities"
import SubscribeButton from "../../components/buttons/SubscribeButton"
import { LinearGradient } from "expo-linear-gradient"

export default function TestingScreen() {

    const [events, setEvents] = useState([])
    
    const corrector = async() =>{
        try {
            console.log('trying to get slotdata');
            let string = '?ilter[future]=true'
            const SlotData = await GetDataFromEndPoint(`/v2/me/scale_teams/as_corrector${string}`);//${string}
            console.log(SlotData);
        } catch (error) {
            console.log(error);
        }
    }
    const corrected = async() =>{
        try {
            console.log('trying to get slotdata');
            let string = '?ilter[future]=true'
            const SlotData = await GetDataFromEndPoint(`/v2/me/scale_teams/as_corrected${string}`);//${string}
            console.log(SlotData);
        } catch (error) {
            console.log(error);            
        }
    }
    const meScaleTeam = async() =>{
        try {
            console.log('trying to get slotdata');
            let string = '?filter[future]=true'
            const SlotData = await GetDataFromEndPoint(`/v2/me/scale_teams${string}`);//${string}
            console.log(SlotData);
        } catch (error) {
            console.log(error);
        }
    } 
    

    const getSlotData4 = async() =>{
        try {
            console.log('trying to get slotdata');
            let string = '?filter[future]=true' //&page[size]=2
            const userData =GetUserData();
            console.log(userData.id)
            const SlotData = await GetDataFromEndPoint(`/v2/users/${userData.id}/scale_teams${string}`);//${string}
            console.log(SlotData);
            
        } catch (error) {
            console.log(error);
        }
    }
//
const getUserID = async() =>{
 
        let string1 = `?page[number]=${1}`
        
            await new Promise(resolve => setTimeout(resolve, 600));
            // const campusUser = await GetDataFromEndPoint(`/v2/campus/51/users${string1}`);//
            const campusUser = await GetDataFromEndPoint(`/v2/me`);//
            console.log("page = " , 1);
            console.log(campusUser);
        
  
}

    const getSlotData5 = async() =>{
        const userData =GetUserData();
        console.log(userData.id)
        for (let j = 0; j < 40; j++) {
            
            ///v2/users/:user_id/campus_users
            let string1 = `?page[number]=${j}`
            try {
                await new Promise(resolve => setTimeout(resolve, 600));
                const campusUser = await GetDataFromEndPoint(`/v2/campus/51/users${string1}`);//
                console.log("page = " , j);
                // console.log(campusUser);
                for (let i = 0; i < campusUser.length; i++) {
                    
                    try {
                        console.log(campusUser[i].displayname,' ',campusUser[i].id);
                        let string = '?filter[future]=true'
                        await new Promise(resolve => setTimeout(resolve, 600));
                        const SlotData = await GetDataFromEndPoint(`/v2/users/${campusUser[i].id}/scale_teams${string}`);//${string}
                        console.log(SlotData);
                          
                    } catch (error) {
                        
                    }
                }
            } catch (error) {
                
            }
            }
    }
    const getUserIDbyName = async() => {
        let name ="jisserst" //114046
        // let string2 = `?filter[login]=${name}`
        let string2 = ``
        
        const campusUser = await GetDataFromEndPoint(`/v2/campus/51/users${string2}`);
        console.log(campusUser);
        console.log(campusUser[0].id);
    }
    const filterbyProjectID = async() => {
        ///v2/cursus/21/projects
        
            const Projects = await GetDataFromEndPoint(`/v2/cursus/21/projects?page[size]=100`);//&filter[name]=minishell
            console.log('done');
            // console.log(Projects[0]);
            for (let i = 0; i < Projects.length; i++) { 
                console.log('projects[',Projects[i].id,'] = ',Projects[i].name);
            }

        // minishell = 1331
        //gnl = 1327
        //pipex = 2004
        //solong = 2009
        //ft_printf = 1316
        //libft = 1314
        //cub3d  1326
        //miniRT    1315
        // Philosophers   1334
        //push_swap     1471
        //CPP Module 04    1342
        //cpp 03 1341

        //exam 02 1320

        // const array=[1331,1327,2004,2009,1316,1326,1315,1334,1471,1342,1314,1341]
        // // const array=[1341]
        // for (let i = 0; i < array.length; i++) {
            
        //     console.log(array[i]);
        //     let string2 = `?filter[future]=true`
        //     try {
        //         const ScaleTeams = await GetDataFromEndPoint(`/v2/projects/${array[i]}/scale_teams${string2}`);
        //         await new Promise(resolve => setTimeout(resolve, 600));
        //         console.log(ScaleTeams);
        //         // console.log(ScaleTeams[0].id);
                
        //     } catch (error) {
                
        //     }
        // }
        
    }

    const ScaleTeamTest = async() => {
        
        console.log('----getting data for user evaluation ---------------------')
        let string = '?filter[future]=true'
        const SlotData = await GetDataFromEndPoint(`/v2/me/scale_teams${string}`);//${string}
        console.log('done fetching slotdata');
        for (let i = 0; i < SlotData.length; i++) {
            try {
                
                console.log('------------------------------Testing fetchign with scale_id-------------')
                let test = await GetDataFromEndPoint(`/v2/scale_teams/${SlotData[i].scale_id}`);
                await new Promise(resolve => setTimeout(resolve, 600)); //wait .6 seconds
                console.log(test);
                console.log('------------------------------Testing fetchign with simple id field-------------')
                test = await GetDataFromEndPoint(`/v2/scale_teams/${SlotData[i].id}`);
                await new Promise(resolve => setTimeout(resolve, 600)); //wait .6 seconds
                console.log(test);


            } catch (error) {
                console.log(error);
            }
        }
    }

console.log("here: ",GetUserData().image.versions.small)
const eventData = [{key:'1'},{key:'2'},{key:'3'},{key:'3'},{key:'3'},{key:'3'},{key:'3'},{key:'3'}]
// const eventData = [];
const evalData = [{key:'1'},{key:'1'},{key:'1'},{key:'1'}]

    return (
        <SafeAreaView style={{flex: 1,paddingTop: 30}}>
            <View style={styles.container}>
      <LinearGradient
        colors={['#FF5733FF', '#36FF3333']} // An array of colors for the gradient
        start={{ x: 0, y: 0 }} // Start point (0,0) is top-left, (1,1) is bottom-right
        end={{ x: 1, y: 1 }} // End point
        style={styles.gradient}>
        <Text style={styles.text}>Hello, Gradient!</Text>
      </LinearGradient>
    </View>

            {/* <Image style={{resizeMode: 'contain',width: 100, height: 100}} 
            source={{uri: 'https://cdn.intra.42.fr/users/9a875daf17471dd011d39b65ed2d81a2/small_jisserst.jpg'}}/> */}
            {/* <SubscribeButton scale={1}></SubscribeButton>
            <SubscribeButton  scale={1.2}></SubscribeButton>
            <SubscribeButton  scale={1.4}></SubscribeButton>
            <SubscribeButton  scale={1.6}></SubscribeButton>
            <SubscribeButton  scale={1.8}></SubscribeButton>
            <SubscribeButton  scale={2}></SubscribeButton>
            <SubscribeButton  scale={2.2}></SubscribeButton>
            <SubscribeButton  scale={2.4}></SubscribeButton>
            <SubscribeButton  scale={2.6}></SubscribeButton>
            <SubscribeButton  scale={2.8}></SubscribeButton> */}
            {/* <DefaultButton title={"as_corrector"} onPress={corrector}/>
            <DefaultButton title={"as_corrected"} onPress={corrected}/>
            <DefaultButton title={"/v2/me/scale_teams"} onPress={meScaleTeam}/>
            <DefaultButton title={"users/:id/scale_teams"} onPress={getSlotData4}/>
            <DefaultButton title={"BruteForce"} onPress={getSlotData5}/>
            <DefaultButton title={"GetUserIDbyName"} onPress={getUserIDbyName}/>
            <DefaultButton title={"filterbyProjectID"} onPress={filterbyProjectID}/>
            <DefaultButton title={"getUserID"} onPress={getUserID}/>
            <DefaultButton title={"Get more info on eval"} onPress={ScaleTeamTest}/> */}
            {/*  
            <FlatList
                data={events}
                renderItem={({item})=>(
                    <EventItem data ={item}
                    />
                )}
            /> */}

        {/* <ListContainer title={'Evaluations'} ComponentData={evalData} ChildComponent={EvaluationItem}/>
        <ListContainer title={'Events'} ComponentData={eventData}  ChildComponent={EventItem} /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      gradient: {
        width: 200,
        height: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
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