import { CalculateRemainingTimePeriod, GetUserData, getCampusTimeZone } from "./UserData";
import LogData, { logType } from "./debugging/debugging";
import { getProjectNameFromID } from "./events/projectIDMapping";

//this is both for corrector and correctee
export interface CorrectionParticipant {
    id: number,
    login: string,
    url: string,
}


//a flag that can be put after a project evaluation e.g Ok
export interface Flag {
    created_at: string,
    icon: string,
    id: number,
    name: string,
    positive: boolean,
    updated_at: string
}

//the team that belongs to a Project/Scale Team
export interface Team {
    closed: boolean,
    closed_at: string,
    created_at: string,
    final_mark: null | number,
    id: number,
    locked: boolean,
    locked_at: string,
    name: string,
    project_gitlab_path: string,
    project_id: number,
    project_session_id: number,
    repo_url: null | string,
    repo_uuid: string,
    status: string,
    terminating_at: null | string,
    updated_at: string,
    url: string,
    //users: users[] <-- not sure if thats needed at all
}

// it seems like its the actual "document" you get when an evaluation is going on, with the buttons and scale etc?
export interface Scale {
    id: number,
    name: string,
    correctuon_number: number,
    evaluation_id: number,
    duration: number,
    comment: string,
    created_at: string,
    flags: Flag[], //full of random objects quiet useless
    disclaimer_md: string,
    guidelines_md: string,
    introduction_md: string,
    free: boolean,
    is_primary: boolean,
    manual_subscription: boolean,
}

//feedback given as part of an evaluation to the evaluator
export interface Feedback {
    id: number,
    rating: number,
    comment: string,
    created_at: string,
    feedbackable_id: number,
    feedbackable_type: string,
}

export interface ScaleTeam {
    id: number,
    begin_at: string,
    comment: string | null,
    correcteds: CorrectionParticipant[]
    corrector: string | CorrectionParticipant
    created_at: string,
    feedback: null,
    feedbacks: Feedback[], //only available after the evaluation is over
    filled_at: null,
    final_mark: null | number,
    flag: Flag,
    scale_id: number,
    team: Team,
    scale: Scale,
    // truant: kinda useless
    // questions_with_answers: [] also useless, never seems to be filled ever
    updated_at: string

}



//compareds  any given date to current date and returns a string in format {TIME XXd YYh ZZmin}
export const formatEvaluationTimeString = (date: string):string => {
    let startDate = new Date(date);
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

export const formatEvaluationMessageString = (data: ScaleTeam):string => {

    let Userdata = GetUserData(); 
    LogData(logType.INFO,Userdata.id)
    const projectName = data.team.name != null ? getProjectNameFromID(data.team.project_id) : "[ProjectError]"

    if(data.corrector == 'invisible' ){
      return (`Somebody will evaluate you on ${projectName}`)
    }
    else if(typeof data.corrector !== 'string' && data.corrector.id != Userdata.id){
        return(`${data.corrector.login} will evaluate you on ${projectName}`)
    }
    else{
      let teamName = data.team?.name?.split("'")[0];
      return(`You will evaluate ${teamName} on ${projectName}`)
    } 
}