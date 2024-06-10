import { create } from 'zustand'
import { createWithEqualityFn } from 'zustand/traditional'
import { GetDataFromEndPoint } from "../../utils/api_utilities"
import { CreateSlotChunkata, RemoveSlotChunk} from "../../utils/slot_utilities"
import { getCampusEvents,getUserSubscribedEvents } from '../../utils/events/event_utilities';
import { GetUserData } from '../../utils/UserData';
import { StallTimeBetweenApiCalls } from '../../utils/api_utilities';
import { SetUserData } from '../../utils/UserData';
import LogData, { logType } from '../../utils/debugging/debugging';
import { CampusEvent } from '../../types/eventTypes';
import { UserData } from '../../types/UserDataTypes';
import { Slot, SlotChunk } from '../../types/customTypes';
import { ELanguages, changeLanguage } from '../../../assets/translation';
import { LanguageDict } from '../../types/languageTranslation';
import { en } from '../../../assets/translation/en';

interface In42Store {
  events: CampusEvent[];
  initEvents: () => Promise<void>;
  updateEventSubscriptionStatus: (eventID: number,newSubState: boolean) => void;
  GetNextEvent: (eventID: number,direction: number) => CampusEvent | null;

  evaluations: any;
  initEvaluations:  () => Promise<void>;

  Slots: SlotChunk[];
  initSlots: () => Promise<void>;
  insertSlots: (rawSlotData: Slot[]) => void;
  DeleteUserSlotChunk: (chunkID: number) => void;

  RefreshUserData: () => Promise<void>;

  language: LanguageDict;
  updateLanguage: (language: ELanguages) => void;
}
// const store<In42Store> = (set) => ({
// const store = create<In42Store>((set,get) => ({
const store = (set: (state: Partial<In42Store>) => void): In42Store => ({
  events: [],
  initEvents: async () =>{
    try {
      let personalData: UserData | null = GetUserData();
      if(!personalData)
        throw new Error("UserData is not Set. Cannot Init Events")
      const campusEventData: CampusEvent[] = await getCampusEvents();
      await StallTimeBetweenApiCalls()
      const subscribedEventsData: CampusEvent[] = await getUserSubscribedEvents(personalData.id);
      let j = 0;
      if(campusEventData !== null) {
        for (let i = 0; i < campusEventData.length; i++) {
          campusEventData[i].subscribed = false;
          if(subscribedEventsData != null && j < subscribedEventsData.length && campusEventData[i].id == subscribedEventsData[j].id){
            j++;
            campusEventData[i].subscribed = true;
          }
        }
      }
      set({events: campusEventData});
    } catch (error) {
      LogData(logType.ERROR, error)
    }
  },
  updateEventSubscriptionStatus: (eventID: number, newSubState: boolean) => {
      const allEvents = useIn42Store.getState().events
      set({events: allEvents.map((event) => {
        if (event.id === eventID) {
          return { ...event, subscribed: newSubState };
        }
        return event;
      }),
    })
  },
  GetNextEvent: (eventID,direction) => {
    const allEvents = useIn42Store.getState().events;
  for (let i = 0; i < allEvents.length; i++) {
    if(allEvents[i].id == eventID) {
    let newEventID = i + direction;
    if(newEventID >= 0 && newEventID <= allEvents.length -1) {
        return allEvents[newEventID];
    }
  }  
  }
  return null;
  },
  evaluations: [], //upcoming evaluations as evaluator or evalueee
  initEvaluations: async () =>{
    try {
      let string = '?filter[future]=true' 
      const SlotData = await GetDataFromEndPoint(`/v2/me/scale_teams${string}`);
      set({evaluations: SlotData});
    } catch (error) {
      LogData(logType.ERROR, error)
    }
  },
  Slots: [], //user slots to get booked by other people for evaluations as array of arrays(chunks of slots)
  initSlots: async() => {
    try {
        const querystring = `?filter[future]=true&page[size]=100&sort=begin_at`; //&range[begin_at]=${currDateString},${GetCurrentISODate(0,0,3)}
        let SlotData = await GetDataFromEndPoint(`/v2/me/slots${querystring}`);
        if(SlotData !== null){
            SlotData = CreateSlotChunkata(SlotData);
            set({Slots: SlotData });
        }
    } catch (error) {
        LogData(logType.ERROR, error)
    }
  },
  insertSlots: async(rawSlotData) => {
      let newSlotChunks = CreateSlotChunkata(rawSlotData);

      //merge both arrays
      let allSlots = [...useIn42Store.getState().Slots,...newSlotChunks]
      //reassign IDs for(used for later deletion)
      for (let i = 0; i < allSlots.length; i++)
        allSlots[i].id = i;
    
      set({Slots: allSlots });
  },
  DeleteUserSlotChunk: async (chunkID) => {
    let Slots = useIn42Store.getState().Slots;

    let chunkIndex = 0;
    for (; chunkIndex < Slots.length; chunkIndex++) {
      if(Slots[chunkIndex].id == chunkID) {
        break;
      }
    }

    let ret = await RemoveSlotChunk(Slots[chunkIndex]);
    if(ret === true) {
        LogData(logType.INFO,'Success! Removed all items within the chunk')
        const updatedSlotChunks = Slots.filter((item) => item.id !== chunkID);
        set({Slots: updatedSlotChunks});
    }
    else{
        LogData(logType.ERROR,'Something went wrong when deleting chunk data, check intra to be safe')
        useIn42Store.getState().initSlots();
    }
  },
  RefreshUserData: async () =>{
    try {
      
      let personalData: UserData = await GetDataFromEndPoint('/v2/me');
      if(personalData !== null){
        LogData(logType.INFO,'Setting UserData')
        SetUserData(personalData)
      }
      await StallTimeBetweenApiCalls()
      useIn42Store.getState().initEvents();
      await StallTimeBetweenApiCalls()
      useIn42Store.getState().initEvaluations();
      LogData(logType.INFO,'Setting UserData complete')
    } catch (error) {
      LogData(logType.ERROR,'Error in refreshUserData() = ', error)
    }
  },
  language: en,
  updateLanguage: (lang:ELanguages) => {
    set({language: changeLanguage(lang)});
  }

})

export const useIn42Store = createWithEqualityFn<In42Store>(store)