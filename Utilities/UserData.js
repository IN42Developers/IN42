import { retrieveStoredValue,setKeyValuePair } from "./TokenStorage";

//Object that stores data from /v2/me endpoint
let UserData = null;
let requestCounter = -1;
const requestCounterMax = 1000;
//the time when how long the counter needs to count
//, will determine resetting of requestCounter
let prevRequestPeriod = -1; 

export const SetUserData = (data) =>{
    UserData = data;
}

export const GetUserData = () =>{
    return UserData;
}

//note this is currently hard coded to 21!
export const getUserCursus = () => {
    if (UserData == null) {
        return (null);
    }
    for (let i = 0; i < UserData.cursus_users.length; i++) {
        if (UserData.cursus_users[i].cursus_id == 21)
            return UserData.cursus_users[i];
    }
    console.log(UserData);
    //return the first one if the data is not null and main cursus cant be found
    return (UserData.cursus_users[0]);
}

//returns an object with a timeZone field set to the Campus TimeZone o0f the user
export const getCampusTimeZone = () => {

    if(UserData == null)
        return null;

    //check for the current active campus_users, and return the timezone found in "campus"
    for (let i = 0; i < UserData.campus_users.length; i++) {
        if(UserData.campus_users[i].is_primary == true)
            return {timeZone: UserData.campus[i].time_zone};      
    }

    return null;
}

export const IncrementRequestCounter = async (value=1) => {
    requestCounter+=value;
    await setKeyValuePair('RequestCounter',requestCounter);
}

export const SetRequestCounterPeriod = (period) =>{
    prevRequestPeriod = period;
}

export const GetRequestCounterPeriod = () =>{
    return prevRequestPeriod;
}


export const GetRequestCounter = () =>{

    let currPeriod = getcurrCounterPeriod();
    if(currPeriod > prevRequestPeriod){
        console.log('New Period has arrived, request counter will be updated now.')
        // console.log('Previous Peroid = ',new Date(prevRequestPeriod))
        // console.log('New Peroid = ',new Date(currPeriod))
        prevRequestPeriod = currPeriod;
        setKeyValuePair('PrevCounterPeriod',currPeriod);
        requestCounter = 0;
    }

    return requestCounter;
}

export const GetRequestCounterMax = () =>{
    return requestCounterMax;
}

export const AssertUserCanRequestData = () =>{
    const val = GetRequestCounter();
    // console.log('val = ',val)
    // console.log('max val = ',requestCounterMax )
    if(val >= requestCounterMax){
        console.log('User Cannot request any more data for this period')
        // throw new Error('Exceeded Request Limit');
        let timeData = CalculateRemainingTimePeriod(prevRequestPeriod); 
        alert(`Request Limit exceeded!\nNew Peroid in ${timeData.minutes}min ${timeData.seconds}sec`);  
        return false;
    }
    return true;
}


//retrieves a counter period which is the current time in hours + 1 as size_t
function getcurrCounterPeriod () {
    let currDate = new Date();
    currDate.setHours(currDate.getHours() + 1);
    // currDate.setMinutes(currDate.getMinutes() +2);
    currDate.setMinutes(0);
    currDate.setSeconds(0);
    currDate.setMilliseconds(0);
    
    // console.log(currDate);
    return currDate.getTime();
}

export const LoadCounterPeriod = async ()=>  {
    try {
        let prevCounterPeroid = await retrieveStoredValue('PrevCounterPeriod')
        console.log('Prev value before parseInt =',prevCounterPeroid);
        if(prevCounterPeroid != null)
            prevCounterPeroid = parseInt(prevCounterPeroid);
        let currPeriod = getcurrCounterPeriod();
        console.log('prev time = ',prevCounterPeroid);
        console.log('curr time = ',currPeriod);
        if(prevCounterPeroid == null || prevCounterPeroid == '' || currPeriod > prevCounterPeroid){
            console.log('Resetting Counter period and count value')
            SetRequestCounterPeriod(currPeriod);
            await setKeyValuePair('PrevCounterPeriod',currPeriod);
            await setKeyValuePair('RequestCounter',0);
            requestCounter = 0;

        }else{
            console.log('Stored Value is valid, loading value to memory');
            SetRequestCounterPeriod(prevCounterPeroid);
            const counterVal = await retrieveStoredValue('RequestCounter');
            requestCounter = parseInt(counterVal);
            console.log('Request Counter = ',requestCounter);
        }
        
    } catch (error) {
        console.log(error);
    }
}

export function CalculateAbs(value){
    if(value < 0)
        return -value;
    return value
}


//returns an object with data about how much time is left in the current time period
export const CalculateRemainingTimePeriod = (targetPeriod) => {
    let currTime = new Date();

    let timeDifference = CalculateAbs(targetPeriod - currTime.getTime());
    let isPast = false;
    if(targetPeriod - currTime.getTime() < 0 )
        isPast = true; 

    let days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return({
        isPast: isPast,
        days: days,
        hours:hours,
        minutes: minutes,
        seconds: seconds,
    })
}