import { UserData } from "../types/UserDataTypes";
import { ScaleTeam } from "../types/evaluationTypes";
import { CalculateRemainingTimePeriod, GetUserData, getCampusTimeZone } from "./UserData";
import LogData, { logType } from "./debugging/debugging";
import { getProjectNameFromID } from "./events/projectIDMapping";

//compareds  any given date to current date and returns a string in format {TIME XXd YYh ZZmin}
export const formatEvaluationTimeString = (date: string): string => {
    let startDate: Date = new Date(date);
    const timeUntilEvalStart = CalculateRemainingTimePeriod(startDate.getTime());
    let past = '';
    if(timeUntilEvalStart.isPast == true)
      past = 'ago'
    let days = '';
    if(timeUntilEvalStart.days != 0)
      days = `${timeUntilEvalStart.days}d`;
    let hours = '';
    if(timeUntilEvalStart.hours != 0)
      hours = `${timeUntilEvalStart.hours}h`;
    let minutes = '';
    if(timeUntilEvalStart.minutes != 0)
      minutes = `${timeUntilEvalStart.minutes}min`;

    return `${days} ${hours} ${minutes} ${past}`
}

export const formatEvaluationMessageString = (data: ScaleTeam): string => {

    let Userdata:UserData | null = GetUserData(); 
    const projectName = data.team.name != null ? getProjectNameFromID(data.team.project_id) : "[ProjectError]"

    if(data.corrector == 'invisible' ){
      return (`Somebody will evaluate you on ${projectName}`)
    }
    else if(typeof data.corrector !== 'string' && Userdata && data.corrector.id != Userdata.id){
        return(`${data.corrector.login} will evaluate you on ${projectName}`)
    }
    else{
      let teamName = data.team?.name?.split("'")[0];
      return(`You will evaluate ${teamName} on ${projectName}`)
    } 
}