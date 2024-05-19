const { defineString } = require('firebase-functions/params');
const logger = require("firebase-functions/logger");

const trelloApiKey =defineString('TRELLO_API_KEY');
const trelloToken = defineString('TRELLO_TOKEN');

const PostDataToTrello = async (url, params) => {

    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      logger.info("-------------------hereee--------------------")
      logger.info(requestOptions)
      
      const data = await fetch(`${url}?${params}`,requestOptions)
      return await data.json();

}
const getExistingCardByName = async (name) => {

    //get potentially matching/existing trello card
    //Currently not working!!!
    const res = await fetch(`https://api.trello.com/1/boards/b7JXesa1/cards?key=${trelloApiKey.value()}&token=${trelloToken.value()}`)
    let existingCards = await res.json();
    let matchingCard = existingCards.find((element)=>element.name == name);
    logger.warn("matchingCard bla = ",existingCards.find((element)=>element.name == name));
    logger.warn("matchingCard = ",matchingCard);
    return matchingCard;
}

module.exports = {
    PostDataToTrello,
    getExistingCardByName,
  };
