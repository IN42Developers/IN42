import { createWithEqualityFn } from 'zustand/traditional'
import { GetDataFromEndPoint } from "./api_utilities"
import { CreateSlotChunkata, RemoveSlotChunk} from "./slot_utilities"
import { getCampusEvents,getUserSubscribedEvents } from './event_utilities';
import { GetUserData } from './UserData';
import { StallTimeBetweenApiCalls } from './api_utilities';
import { SetUserData } from './UserData';
import LogData, { logType } from '../Utilities/debugging';

const store = (set) =>({
    events: [], //all events from today to the future /up to 100 entries
    initEvents: async () =>{
      try {
        let personalData = GetUserData();
        const campusEventData = await getCampusEvents();
        await StallTimeBetweenApiCalls()
        const subscribedEventsData = await getUserSubscribedEvents(personalData.id);
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
    updateEventSubscriptionStatus: (eventID,newSubState) => set((store)=>({events: store.events.map( event => {
        if (event.id === eventID) {
            return { ...event, subscribed: newSubState };
        }
        return event;
    })})),
    GetNextEvent: (eventID,direction) => {
         const allEvents = useStore.getState().events;
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
      let string = '?filter[future]=true'
      const SlotData = await GetDataFromEndPoint(`/v2/me/scale_teams${string}`);
      set({evaluations: SlotData});
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
        let allSlots = [...useStore.getState().Slots,...newSlotChunks]
        //reassign IDs for(used for later deletion)
        for (let i = 0; i < allSlots.length; i++)
          allSlots[i].id = i;
      
        set({Slots: allSlots });
    },
    DeleteUserSlotChunk: async (chunkID) => {
      let Slots = useStore.getState().Slots;

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
          useStore.getState().initSlots();
      }
    },
    RefreshUserData: async () =>{
      try {
        
        let personalData = await GetDataFromEndPoint('/v2/me');
        if(personalData !== null){
          LogData(logType.INFO,'Setting UserData')
          SetUserData(personalData)
        }
        await StallTimeBetweenApiCalls()
        useStore.getState().initEvents();
        await StallTimeBetweenApiCalls()
        useStore.getState().initEvaluations();
        LogData(logType.INFO,'Setting UserData complete')
      } catch (error) {
        LogData(logType.ERROR,'Error in refreshUserData() = ', error)
      }
    }

});

export const useStore = createWithEqualityFn(store);