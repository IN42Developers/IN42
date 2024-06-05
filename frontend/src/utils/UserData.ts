import { Campus, CampusUser, CursusUser, UserData} from "../types/apiTypes";
import { RemainingTimePeriod, TimeZoneResult } from "../types/customTypes";
import { retrieveStoredValue,setKeyValuePair } from "./TokenStorage";
import LogData, { logType } from "./debugging/debugging";

//Object that stores data from /v2/me endpoint
let userData:UserData | null = null;
let requestCounter:number = -1;
const requestCounterMax:number = process.env.IN42_DEV ? 1200 : 100;
//the time when how long the counter needs to count
//, will determine resetting of requestCounter
let prevRequestPeriod:number = -1; 

export const SetUserData = (data:UserData) =>{
    userData = data;
}

export const GetUserData = ():UserData | null => {
    return userData;
}

//note this is currently hard coded to 21!
export const getUserCursus = ():CursusUser | null => {
    if (userData == null) {
        return (null);
    }
    for (let i = 0; i < userData.cursus_users.length; i++) {
        if (userData.cursus_users[i].cursus_id == 21)
            return userData.cursus_users[i];
    }
    //return the first one if the data is not null and main cursus cant be found
    return (userData.cursus_users[0]);
}

//returns an object with a timeZone field set to the Campus TimeZone o0f the user
export const getCampusTimeZone = ():TimeZoneResult => {

    if(userData == null){
        LogData(logType.ERROR,"Couldn't find Userdata to determine timezone, gracefully setting timezone to Asia/Tokyo")
        return {timeZone: "Asia/Tokyo"}
    }

    //check for the current active campus_users, and return the timezone found in "campus"
    for (let i = 0; i < userData.campus_users.length; i++) {
        if(userData.campus_users[i].is_primary == true){
            return {timeZone: userData.campus[i].time_zone};      
        }
    }

    LogData(logType.ERROR,"Couldn't find determine timezone, gracefully setting timezone to Asia/Tokyo")
    return {timeZone: "Asia/Tokyo"};
}

//returns the current active campus_users from the userData
export const getCampusUser = ():CampusUser | null => {

    if(userData == null)
        return null;

    //check for the current active campus_users, and return the timezone found in "campus"
    for (let i = 0; i < userData.campus_users.length; i++) {
        if(userData.campus_users[i].is_primary == true)
            return  userData.campus_users[i];
    }

    return null;
}


export const IncrementRequestCounter = async (value: number = 1 ): Promise<void> => {
    requestCounter += value;
    await setKeyValuePair('RequestCounter',requestCounter);
}

export const SetRequestCounterPeriod = (period: number): void =>{
    prevRequestPeriod = period;
}

export const GetRequestCounterPeriod = (): number =>{
    return prevRequestPeriod;
}


export const GetRequestCounter = (): number =>{

    let currPeriod: number = getcurrCounterPeriod();
    if(currPeriod > prevRequestPeriod){
        
        LogData(logType.INFO,'New Period has arrived, request counter will be updated now.')
        prevRequestPeriod = currPeriod;
        setKeyValuePair('PrevCounterPeriod',currPeriod);
        requestCounter = 0;
        setKeyValuePair('RequestCounter',requestCounter);
    }

    return requestCounter;
}

//------------------DEV ONLY----------
export const SetRequestCounter = ( val:number ): void => {
    requestCounter = val;
    setKeyValuePair('RequestCounter',requestCounter);
}
//------------------------------------


export const GetRequestCounterMax = (): number => {
    return requestCounterMax;
}

export const AssertUserCanRequestData = (): boolean => {
    const val: number = GetRequestCounter();
    const percentage: number = Math.round(val/requestCounterMax * 100); //get value between 0-100 as integers
    // LogData(logType.INFO,`current Requests ${val}/${requestCounterMax}`)
    if(percentage === 10 || percentage === 25 || percentage === 50 || percentage === 90)
        LogData(logType.WARNING,`Exhausted ${percentage}% of requests for time period`)
    if(val >= requestCounterMax){
        LogData(logType.WARNING,'User Cannot request any more data for this period')
        LogData(logType.INFO,`current Requests ${val}/${requestCounterMax}`)
        // throw new Error('Exceeded Request Limit');
        let timeData: RemainingTimePeriod = CalculateRemainingTimePeriod(prevRequestPeriod); 
        alert(`Request Limit exceeded!\nNew Peroid in ${timeData.minutes}min ${timeData.seconds}sec`);  
        return false;
    }
    return true;
}


//retrieves a counter period which is the current time in hours + 1 as size_t
function getcurrCounterPeriod (): number {
    let currDate: Date = new Date();
    currDate.setHours(currDate.getHours() + 1);
    // currDate.setMinutes(currDate.getMinutes() +2);
    currDate.setMinutes(0);
    currDate.setSeconds(0);
    currDate.setMilliseconds(0);
    
    return currDate.getTime();
}

export const LoadCounterPeriod = async ()=>  {
    try {
        let prevCounterPeroid: any = await retrieveStoredValue('PrevCounterPeriod')
        LogData(logType.INFO,'Prev value before parseInt =',prevCounterPeroid);
        if(prevCounterPeroid != null)
            prevCounterPeroid = parseInt(prevCounterPeroid);
        let currPeriod: number = getcurrCounterPeriod();
        LogData(logType.INFO,'prev time = ',prevCounterPeroid);
        LogData(logType.INFO,'curr time = ',currPeriod);
        if(prevCounterPeroid == null || prevCounterPeroid == '' || currPeriod > prevCounterPeroid){
            LogData(logType.INFO,'Resetting Counter period and count value')
            SetRequestCounterPeriod(currPeriod);
            await setKeyValuePair('PrevCounterPeriod',currPeriod);
            await setKeyValuePair('RequestCounter',0);
            requestCounter = 0;

        }else{
            LogData(logType.INFO,'Stored Value is valid, loading value to memory');
            SetRequestCounterPeriod(prevCounterPeroid);
            const counterVal: any = await retrieveStoredValue('RequestCounter');
            requestCounter = parseInt(counterVal);
        }
        
    } catch (error) {
        LogData(logType.ERROR,error);
    }
}

export function CalculateAbs(value: number): number {
    if(value < 0)
        return -value;
    return value
}


//returns an object with data about how much time is left in the current time period
export const CalculateRemainingTimePeriod = ( targetPeriod: number ): RemainingTimePeriod => {
    let currTime:Date = new Date();

    let timeDifference: number = CalculateAbs(targetPeriod - currTime.getTime());
    let isPast: boolean = false;
    if(targetPeriod - currTime.getTime() < 0 )
        isPast = true; 

    let days: number = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    let hours: number = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes: number = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds: number = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return({
        isPast: isPast,
        days: days,
        hours:hours,
        minutes: minutes,
        seconds: seconds,
    })
}