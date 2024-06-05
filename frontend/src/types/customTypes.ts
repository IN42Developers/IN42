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