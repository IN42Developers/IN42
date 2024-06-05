import { Platform } from "react-native";
import { GetUserData, getCampusUser, getUserCursus } from "../UserData";

export interface CrashUserData {
    id: number,
    login: string,
    usual_full_name: string,
    pool_month: string,
    pool_year: number,
    primary_cursus_id: number,
    primary_campus_id: number,
    // add more shit as needed over time
  }
  
  export interface CrashData {
    date: string,
    platform: string,
    type: "JsError" | "NativeError"
    fatality: boolean,
    errorMessage: string,
    errorDump?: string,
    UserData: CrashUserData | null
  }

export const sendCrashData =(error: Error,isFatal: boolean): void => {

    if(process.env.IN42_DEV == 'true')
      return;

    const userData: CrashUserData = getUserCrashData();
    const platform: string = Platform.OS == 'android' ? 'android' : 'ios';

    let crashData: CrashData = {
      date: new Date().toDateString(),
      errorMessage: JSON.stringify(error.message),
      errorDump: JSON.stringify(error.stack),
      platform: platform,
      type: "JsError",
      fatality: isFatal,
      UserData: userData
      }
      
    
    const tokenRequest: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(crashData),
    };
  
    const endpoint = "https://crashdata-7y7fitjvjq-uc.a.run.app";

    fetch(endpoint,tokenRequest);
  }


  const getUserCrashData = (): CrashUserData => {
    let userData = GetUserData();
    let cursusData = getUserCursus();
    let campusData = getCampusUser();
    if(!userData || !cursusData || !campusData){
      return {
        id: -1,
        login: "unknown",
        usual_full_name: "unknown",
        pool_month: "unknown",
        pool_year: -1,
        primary_cursus_id: -1,
        primary_campus_id: -1,
      }
    }
    return (
    {
      id: userData.id,
      login: userData.login,
      usual_full_name: userData.usual_full_name,
      pool_month: userData.pool_month,
      pool_year: userData.pool_year,
      primary_cursus_id: cursusData?.cursus_id,
      primary_campus_id: campusData?.campus_id,
    } )
  }