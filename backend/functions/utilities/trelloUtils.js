const { defineString } = require('firebase-functions/params');
const logger = require("firebase-functions/logger");

const trelloApiKey =defineString('TRELLO_API_KEY');
const trelloToken = defineString('TRELLO_TOKEN');
const boardID = "b7JXesa1";

const PostDataToTrello = async (endpoint, data) => {

  const auth = {    
    key: trelloApiKey.value(),
    token: trelloToken.value()
  }

//   const params = new URLSearchParams({...data,...auth
// }).toString();

    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data,...auth})
      };
      logger.info("-------------------hereee--------------------")
      logger.info(requestOptions)
      
      try {
        const response = await fetch(`https://api.trello.com/1${endpoint}`, requestOptions);
        
        if (!response.ok) {
            // Handle HTTP errors
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Attempt to parse the JSON response
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle fetch or JSON parse errors
        console.error('Error fetching data:', error);
        throw error;
    }
}

const GetDataFromTrello = async (endpoint) => {
  
    const data = await fetch(`https://api.trello.com/1${endpoint}?key=${trelloApiKey.value()}&token=${trelloToken.value()}`)
    return await data.json();
}

//returns first card with matchign name or null
const getExistingCardByName = async (name) => {

    let existingCards = await GetDataFromTrello(`/boards/${boardID}/cards`) 
    let matchingCard = existingCards.find((element)=>element.name == name);
    logger.warn("matchingCard bla = ",existingCards.find((element)=>element.name == name));
    logger.warn("matchingCard = ",matchingCard);
    return matchingCard;
}

//returns an ID of a matching list by name or any list ID
const getTrelloListByNameWithFallback = async (listName) => {

  let allLists = await GetDataFromTrello(`/boards/${boardID}/lists`) 
  let matchingList = allLists.find((element)=>element.name == listName);
  logger.warn("matchingList = ",matchingList);
  if(matchingList)
    return matchingList.id;
  if(allLists)
    return allLists[0].id;
  return null;
}


module.exports = {
    PostDataToTrello,
    getExistingCardByName,
    GetDataFromTrello,
    getTrelloListByNameWithFallback,
  };
