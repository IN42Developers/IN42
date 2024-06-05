export enum logType {
    INFO = 1,
    WARNING = 2,
    ERROR =3,
}


export default function LogData(logtype: logType,...args: any[]):void {
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


