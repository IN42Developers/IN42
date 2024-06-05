export interface TimeZoneResult {
    timeZone: string;
};

export interface RemainingTimePeriod {
    isPast: boolean,
    days: number,
    hours:number,
    minutes: number,
    seconds: number,
}

export interface Slot {
    id: number,
    begin_at: string,
    end_at: string,
}

//note: new returned object will have a unique wrapped structure
//data = the array of slots that make up a chunk
//type = used to uniquely identify what is a chunk and an added element for viewing properly
//date = the date of the slot chunk without detailed info (2023-09-24)
export interface SlotChunk {
    data: Slot[],
    id: number,
    type: string,
    date: Date,
}
