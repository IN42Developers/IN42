import { Platform } from "react-native";

export interface CrashUserData {
  id: number,
  login: string,
  usual_full_name: string,
  pool_month: string,
  pool_year: string,
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

export enum logType {
    INFO = 1,
    WARNING = 2,
    ERROR =3,
}


export default function LogData(logtype: logType,...args):void {
    let logMessage;
    switch (logtype) {
        case logType.INFO:
            if(process.env.EXPO_PUBLIC_LOGGING != "true")
                return;
            logMessage = "[INFO]"
            break;
        case logType.WARNING:
            logMessage = "[WARNING]"
            break;
        case logType.ERROR:
            logMessage = "[ERROR]"
            break;
    }
    console.log(logMessage,...args)
}



export const sendJSCrashData =(error: Error,isFatal: boolean,userData) => {

    if(process.env.IN_42 == 'true')
      return;

    const platform:string = Platform.OS == 'android' ? 'android' : 'ios';

    let crashData: CrashData = {
      date: new Date().toDateString(),
      errorMessage: JSON.stringify(error.message),
      errorDump: JSON.stringify(error.stack),
      platform: platform,
      type: "JsError",
      fatality: isFatal,
      UserData: userData
      }
  
    
    const tokenRequest = {
      method: 'POST',
      body: JSON.stringify(crashData),
    };
  
    console.log("CrashData =",tokenRequest);
    fetch("https://crashdata-7y7fitjvjq-uc.a.run.app",tokenRequest);
  }

export const sendNativeCrashData = (exceptionMsg: string, userData) => {
  
  if(process.env.IN_42 == 'true')
    return;


  const platform:string = Platform.OS == 'android' ? 'android' : 'ios';

  let crashData: CrashData = {
    date: new Date().toDateString(),
    errorMessage: JSON.stringify(exceptionMsg),
    platform: platform,
    type: "NativeError",
    fatality: true,
    UserData: userData,
    }
    
    const tokenRequest = {
      method: 'POST',
      body: JSON.stringify(crashData),
    };
  
    console.log("CrashData =",tokenRequest);
    fetch("https://crashdata-7y7fitjvjq-uc.a.run.app",tokenRequest);
  }