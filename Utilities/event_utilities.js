import {GetDataFromEndPoint, PostDataToEndPoint, DeleteDataFromEndpoint } from './api_utilities';
import { GetUserData } from './UserData';

export const getMonthFromDate = (date) =>
{
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

     return months[date.getMonth()];
}

export const getShortDayFromDate = (date) =>
{
    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

     return weekdays[date.getDay()];
}

//this is currently based on Berlin campus, other campuses may have different setups
export const getEventTypeColorGradient = (eType) =>
{
    if( eType == "challenge" || eType == "workshop" || eType == "hackathon")
        return ['#273F1E','#00DF31'];   
    else if(eType == "exam")
        return ['#FF1304','#FF7870'];
    else if(eType == "association"|| eType == "meet_up")
        return ['#2704FF','#0085FF'];   
    return ['#0066FF','#70FFEE'];
}

// toggles between subscribing and unsubscribing, returns the new state
export const ToggleEventSubscription = async (EventID) =>
{
    let subscribedState = false;
    try {
        const eventUserID = await CheckEventSubscriptionStatus(EventID);
        if(eventUserID === null){
            subscribedState = false;
            await SubscribeEvent(EventID);
            subscribedState = true;
        }
        else{
            subscribedState = true;
            await UnsubscribeEvent(eventUserID);
            subscribedState = false;
        }
        
    } catch (error) {
        console.log(error);
        throw error;
    }
    return subscribedState;
}


export const SubscribeEvent = async (EventID) => {
    return new Promise( async (resolve, reject) =>{
        const userData =GetUserData();
        let querystring = `events_user[event_id]=${EventID}&events_user[user_id]=${userData.id}`;
        let postReqEndpoint = '/v2/events_users';
        try {
            await PostDataToEndPoint(postReqEndpoint,querystring);
            
            resolve('Subscription Successful');
        } catch (error) {
            reject(error);
        }
    })
}

export const UnsubscribeEvent = async (eventUserID) => {
    return new Promise(async (resolve, reject)=>{
        try {
            let DeleteEndpoint = `/v2/events_users/${eventUserID}`;
            await DeleteDataFromEndpoint(DeleteEndpoint);
            resolve('Unsubscribed successfully.')
        } catch (error) {
            reject(error);
        }
    })
}

//retuns null if user is not subscribed, otherwise the event_user_id if the user is subscribed
export const CheckEventSubscriptionStatus = async (EventID) => {
    // console.log('checking event status');
    try {
        const userData = GetUserData();
        const eventQueryString = `?filter[event_id]=${EventID}`;
        const eventData = await GetDataFromEndPoint(`/v2/users/${userData.id}/events_users${eventQueryString}`);
        if (eventData.length === 0) {
            console.log('Event Data with ID: ',EventID,' has not been found')
            return null;
        }
        console.log('User is subscribed to that event');
        return eventData[0].id;
    } catch (error) {
        throw error;
    }
}

//returns the current date in ISO 8601 format at 00:00,optionally allows for modifying the year,month or day
export const GetCurrentISODate = (yearsToAdd = 0,monthsToAdd = 0,daysToAdd = 0)=> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setFullYear(currentDate.getFullYear() + yearsToAdd);
    currentDate.setMonth(currentDate.getMonth() + monthsToAdd);
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    const iso8601Date = currentDate.toISOString();
    return iso8601Date;
}

export const getUserSubscribedEvents = async (userID) =>{
        let querystring = `?page[size]=100&range[begin_at]=${GetCurrentISODate()},${GetCurrentISODate(1)}&sort=begin_at`

        try {
            const completeEventData = await GetDataFromEndPoint(`/v2/users/${userID}/events${querystring}`); 
            return completeEventData;
        } catch (error) {
            console.log(error);
            throw error;
        }
}

export const getCampusEvents = async () =>{
    //query string needs to be expanded to check if the cursus is correct to, so that 
    //piscine users wont have the same display as regular users
    let querystring = `?page[size]=100&range[begin_at]=${GetCurrentISODate()},${GetCurrentISODate(1)}&sort=begin_at`

    try {
        //figure out how to extract the current active campus as well as current active curriculum
        const userData = GetUserData();
        if(userData === null)
            throw new Error("Couldn't retrieve UserData in getCampusEvents");
        let campus = getCurrentActiveCampus(userData); //51 =Berlin
        console.log(campus);
        let cursusID = 21;
        const completeEventData = await GetDataFromEndPoint(`/v2/campus/${campus.campus_id}/cursus/${cursusID}/events${querystring}`); //?page[number]=2 just adding this at the end works as query
        return completeEventData;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getCurrentActiveCampus = (UserData) =>{
  
    if(UserData == null)
        return null;

    //check for the current active campus_users, and return the timezone found in "campus"
    for (let i = 0; i < UserData.campus_users.length; i++) {
        if(UserData.campus_users[i].is_primary == true)
            return UserData.campus_users[i];
    }

    return null;
    
}
