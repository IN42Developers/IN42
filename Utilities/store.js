import { createWithEqualityFn } from 'zustand/traditional'
import { GetDataFromEndPoint } from "./api_utilities"
import { CreateSlotChunkata, RemoveSlotChunk} from "./slot_utilities"
import { getCampusEvents,getUserSubscribedEvents } from './event_utilities';
import { GetUserData } from './UserData';
import { StallTimeBetweenApiCalls } from './api_utilities';
import { SetUserData } from './UserData';

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
        console.log(error);
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
              // console.log('is subscribed = ',allEvents[newEventID].subscribed);
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
          console.log(error);
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
    CreateEvalSlot: async () => {
      try {
        
      } catch (error) {
        console.log(error);
      }
    },
    DeleteUserSlotChunk: async (chunkID) => {
      let Slots = useStore.getState().Slots;
      
      console.log("Slots = ", Slots);

      let chunkIndex = 0;
      for (; chunkIndex < Slots.length; chunkIndex++) {
        if(Slots[chunkIndex].id == chunkID) {
          break;
        }
      }

      let ret = await RemoveSlotChunk(Slots[chunkIndex]);

      // console.log('sucess= ',ret)
      if(ret === true) {
          console.log('Success! Removed all items within the chunk')
          const updatedSlotChunks = Slots.filter((item) => item.id !== chunkID);
          set({Slots: updatedSlotChunks});
      }
      else{
          console.log('Something went wrong when deleting chunk data, check intra to be safe')
          useStore.getState().initSlots();
      }
    },
    RefreshUserData: async () =>{
      try {
        
        let personalData = await GetDataFromEndPoint('/v2/me');
        if(personalData !== null){
          console.log('Setting UserData');
          SetUserData(personalData)
        }
        await StallTimeBetweenApiCalls()
        useStore.getState().initEvents();
        await StallTimeBetweenApiCalls()
        useStore.getState().initEvaluations();
        console.log('Setting UserData complete');
      } catch (error) {
        console.log('Error in refreshUserData() = ', error);
      }
    }

});

export const useStore = createWithEqualityFn(store);