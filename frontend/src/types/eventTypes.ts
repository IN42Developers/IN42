export interface CampusEvent {
    
        begin_at: string,
        campus_ids: number[],
        created_at: string,
        cursus_ids: number[],
        description: string,
        end_at: string,
        id: number,
        kind: string,
        location: string,
        max_people: null | number,
        name: string,
        nbr_subscribers: number,
        prohibition_of_cancellation: null,
        // themes: string[],
        updated_at: string,
        waitlist: null, //probably more than null
}