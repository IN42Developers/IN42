const { defineString } = require('firebase-functions/params');
const logger = require("firebase-functions/logger");

const trelloApiKey =defineString('TRELLO_API_KEY');
const trelloToken = defineString('TRELLO_TOKEN');

const PostDataToTrello = async (endpoint, data) => {

  const auth = {    
    key: trelloApiKey.value(),
    token: trelloToken.value()
  }

  const params = new URLSearchParams({...data,...auth
}).toString();

    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      logger.info("-------------------hereee--------------------")
      logger.info(requestOptions)
      
      const resp = await fetch(`https://api.trello.com/1${endpoint}?${params}`,requestOptions)
      return await resp.json();
}

const GetDataFromTrello = async (endpoint) => {
  
    const data = await fetch(`https://api.trello.com/1${endpoint}?key=${trelloApiKey.value()}&token=${trelloToken.value()}`)
    return await data.json();
}


const getExistingCardByName = async (name) => {

    //get potentially matching/existing trello card
    //Currently not working!!!
    let existingCards = await GetDataFromTrello("/boards/b7JXesa1/cards") 
    let matchingCard = existingCards.find((element)=>element.name == name);
    logger.warn("matchingCard bla = ",existingCards.find((element)=>element.name == name));
    logger.warn("matchingCard = ",matchingCard);
    return matchingCard;
}

module.exports = {
    PostDataToTrello,
    getExistingCardByName,
    GetDataFromTrello,
  };
