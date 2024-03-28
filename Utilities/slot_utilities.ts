import { DeleteDataFromEndpoint,StallTimeBetweenApiCalls } from "./api_utilities"


interface Slot {
    id: number,
    begin_at: string,
    end_at: string,
}

//note: new returned object will have a unique wrapped structure
//data = the array of slots that make up a chunk
//type = used to uniquely identify what is a chunk and an added element for viewing properly
//date = the date of the slot chunk without detailed info (2023-09-24)
interface SlotChunk {
    data: Slot[],
    id: number,
    type: string,
    date: string,
}

//takes an array of slot datas and converts them into an array of chunked slot items
export const CreateSlotChunkata = ( data: Slot[] ) :SlotChunk[] => {
    console.log(data)
    if(data == null ){
        console.log('data is null or undefined')
        return []
    }
    else if(data.length == 1){
        console.log('data lenght is 1, found single 15min slot')
        return [{data:data,id: 0,type: 'slotChunk',date: data[0].begin_at}];
    }
    // console.log('in createSlotChunk data')
    let chunkData: SlotChunk[]  = [];
    let tmpArray:  Slot[] = [];
    let startChunk: number = 0;
    let totalChunks:number = 0;
    for (let i: number = 0; i < data.length -1; i++) {
        if(data[i].end_at !== data[i+1].begin_at || i == data.length - 2){
            tmpArray = []
            if(i == data.length - 2)
                i++; //to get the last element copied as well
            for (let j = startChunk; j <= i; j++) {
                tmpArray.push( data[j]);
                
            }
            chunkData.push({data:tmpArray,id:totalChunks,type: 'slotChunk',date: (data[i].begin_at).split('T')[0]});
            startChunk = i+1;
            totalChunks++;
        }
        
    }
    return chunkData;

}

export const RemoveSlotChunk = async (SlotChunk: SlotChunk) : Promise<boolean> => {
    //delete each individual slot within the chunk data
    for (let i = 0; i < SlotChunk.data.length; i++) {
        try {
            await DeleteDataFromEndpoint(`/v2/slots/${SlotChunk.data[i].id}`);
            await StallTimeBetweenApiCalls();
        } catch (error) {
            console.log(error)
            return false;
        }
    }
    return true;
}

export function formatDateToCustomString(inputDate: Date) : string {
    const daysOfWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek: string = daysOfWeek[inputDate.getDay()];
    const dayOfMonth: number = inputDate.getDate();
  
    function getDayWithSuffix(day: number): string {
      if (day >= 11 && day <= 13) {
        return day + "th";
      } else {
        switch (day % 10) {
          case 1:
            return day + "st";
          case 2:
            return day + "nd";
          case 3:
            return day + "rd";
          default:
            return day + "th";
        }
      }
    }

    const formattedDate = `${dayOfWeek} ${getDayWithSuffix(dayOfMonth)}`;

    return formattedDate;
}


export const IsoDateToWeekDay = (isoDate: string) :string => {
    const date: Date = new Date(isoDate);
    const currDate: Date = new Date();
    const tmrDate: Date = new Date();
    tmrDate.setDate(tmrDate.getDate() + 1);

    if(date.getDate() == currDate.getDate() &&
     date.getMonth() == currDate.getMonth() &&
     date.getFullYear() == currDate.getFullYear())
        return 'Today';
    else if(date.getDate() == tmrDate.getDate() &&
     date.getMonth() == tmrDate.getMonth() &&
     date.getFullYear() == tmrDate.getFullYear()){
        return 'Tomorrow';
     }

    return formatDateToCustomString(date);
}


export const retrieveDatesFromChunks = (slotChunks: SlotChunk[]): string[] => {
    let dates: string[] = [];

    if(slotChunks != null){
        for (let i: number = 0; i < slotChunks.length; i++) {
            if(!dates.includes(slotChunks[i].date)){
                dates.push(slotChunks[i].date);
            }
        }
    }
        
    return dates;
} 