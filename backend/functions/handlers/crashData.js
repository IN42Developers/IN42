const { onRequest } = require('firebase-functions/v2/https');
const logger = require("firebase-functions/logger");
const { defineString } = require('firebase-functions/params');

const { PostDataToTrello, getExistingCardByName } = require('../utilities/trelloUtils');

const crashData = onRequest(async (request, response) => {

    if(request.method != 'POST'){
      logger.warn("WRONG Method Boi");
      response.status('405').send("WRONG Method Boi")
      return;
    }
  
    //do more error checks
    if (!request.is('application/json')) {
      logger.warn('Bad Request: Content-Type must be application/json');
      response.status(400).send('Bad Request: Content-Type must be application/json');
      return;
    }
  
    logger.warn("BEFORE accessing the body");
    const crashData = request.body;
    logger.warn(request.body);
  
    //setup 
    const trelloApiKey = "8d9df4659c5da1046e33b9939ae06a4d";
    const trelloToken = defineString('TRELLO_TOKEN');
    const trelloCrashListID = "6649e65f590414449730bdb6";
    // const trelloBoardID = "b7JXesa1";
  
    //format Description
    let crashDataDescription = `fatality = ${crashData.fatality}\n` +
    `platform = ${crashData.platform}\n\n`
    crashDataDescription += `${crashData.UserData}\n\n`
    crashDataDescription += crashData.errorDump;
  
    const cardTitle = '[CRASH] ' + crashData.errorMessage;
  
    let existingCardID = await getExistingCardByName(cardTitle);
    if(!existingCardID){
        
        const params = new URLSearchParams({
            idList: trelloCrashListID,
            key: trelloApiKey,
            token: trelloToken.value(),
      name: cardTitle,
      desc: crashDataDescription,
      start: crashData.date,
      pos: 'top',
      idLabels: '64fb32bf4410395e0d6ffaad',
      idMembers: '59d4608d007ee08faf60e2ef',
      
    }).toString();
    
        logger.warn(params)
    
        existingCardID = await PostDataToTrello("https://api.trello.com/1/cards",params);
    }

    //do something with existingCardID
    
    response.status(200).send(existingCardID);
  })

module.exports = {
  crashData,
};