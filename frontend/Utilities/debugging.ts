import { GetUserData } from "./UserData";

export interface CrashUserData {
  userdata: string,

}

export interface CrashData {
  date: string,
  fatality: boolean,
  errorMessage: string,
  errorDump?: string,
  UserData: CrashUserData
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



export const sendJSCrashData =(error: Error,isFatal: boolean) => {
    console.log("EXCEPTION FUNCTIOn",error,isFatal);

    LogData(logType.ERROR,GetUserData())

    const string = "WOWOWOWOWOWOWOWOWOWOWOWOWOWOWOWOWOWOWOWOWO"
    let crashData = {
      date: new Date().toDateString(),
      errorMessage: JSON.stringify(error.message),
      errorDump: JSON.stringify(error.stack),
      fatality: isFatal,
      random: string}
  
    
    const tokenRequest = {
      method: 'POST',
      body: JSON.stringify(crashData),
    };
  
    console.log("CrashData =",tokenRequest);
    fetch("https://crashdata-7y7fitjvjq-uc.a.run.app",tokenRequest);
  }

export const sendNativeCrashData = (exceptionMsg: string) => {
  
    const string = "INCREDIBLEKILLME1231312312"
    let crashData = {
      date: new Date().toDateString(),
      errorMessage: exceptionMsg,
      random: string}
  
    
    const tokenRequest = {
      method: 'POST',
      body: JSON.stringify(crashData),
    };
  
    console.log("CrashData =",tokenRequest);
    fetch("https://crashdata-7y7fitjvjq-uc.a.run.app",tokenRequest);
  }