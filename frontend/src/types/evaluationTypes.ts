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

