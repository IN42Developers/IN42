const { onRequest } = require('firebase-functions/v2/https');
const logger = require("firebase-functions/logger");
const { defineString } = require('firebase-functions/params');

const { PostDataToTrello, getExistingCardByName, GetDataFromTrello,getTrelloListByNameWithFallback } = require('../utilities/trelloUtils');

// ------------ INFO ON WHAT IS SENT -------------------
// export interface CrashUserData {
//   id: number,
//   login: string,
//   usual_full_name: string,
//   pool_month: string,
//   pool_year: string,
//   primary_cursus_id: number,
//   primary_campus_id: number,
//   // add more shit as needed over time
// }

// export interface CrashData {
//   date: string,
//   platform: string,
//   type: "JsError" | "NativeError"
//   fatality: boolean,
//   errorMessage: string,
//   errorDump?: string,
//   UserData: CrashUserData
// }

const crashData = onRequest(async (request, response) => {

    logger.info("Start of CrashData function")

    if(request.method != 'POST'){
      logger.warn("WRONG Method Boi");
      response.status(405).send("WRONG Method Boi")
      return;
    }
  
    //do more error checks
    if (!request.is('application/json')) {
      logger.warn('Bad Request: Content-Type must be application/json');
      response.status(400).send('Bad Request: Content-Type must be application/json');
      return;
    }
  
    const crashData = request.body;
    logger.warn("request.body = ",crashData)
    //setup 
    const trelloCrashListID =  await getTrelloListByNameWithFallback("Crashes")
  
    //format Description
    let crashDataSimple = `fatality = ${crashData.fatality}\n` +
    `platform = ${crashData.platform}\n\n`
    crashDataSimple += `${JSON.stringify(crashData.UserData)}\n\n`
    let crashDataDescription = crashDataSimple + crashData.errorDump;
  
    const cardTitle = '[CRASH] ' + crashData.errorMessage;
  
    let existingCardID = await getExistingCardByName(cardTitle);
    let checklistID;
    if(!existingCardID) {
      const params = {
        idList: trelloCrashListID,
        name: cardTitle,
        desc: crashDataDescription,
        start: crashData.date,
        pos: 'top',
        idLabels: '64fb32bf4410395e0d6ffaad',
        idMembers: '59d4608d007ee08faf60e2ef',
      }
        existingCardID = await PostDataToTrello("/cards",params);
        const checklist = await PostDataToTrello("/checklists",{idCard: existingCardID.id, name: "Users"});
        checklistID = checklist.id;
      }
      else{ 
        checklistID = existingCardID.idChecklists[0];
      }
      await PostDataToTrello(`/checklists/${checklistID}/checkItems`,{name: `${crashDataSimple}`})
    
    response.status(200).send(existingCardID);
  })

module.exports = {
  crashData,
};