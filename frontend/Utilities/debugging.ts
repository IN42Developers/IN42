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