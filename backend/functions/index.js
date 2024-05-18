/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });
const { defineString } = require('firebase-functions/params');


exports.auth = onRequest( async (request, response) => {
    cors(request, response, async () => {
    const code = request.query.code;
    if ( code ) {
      const clientId =`u-s4t2ud-0aaac4e367834ea3432dea29ce9e054e7adad56896f71983cd61e0ea025e429c`;
      const clientSecret = defineString('CLIENT_SECRET');
      const redirectUri = "in42://index";
      const requestBody = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret.value(),
        code: code,
        redirect_uri: redirectUri,
      }).toString();
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody,
      };
      try {
        logger.info(requestOptions, { structuredData: true });
        const data = await fetch("https://api.intra.42.fr/oauth/token", requestOptions);
        if (!data.ok) {
          const errorData = await data.json();
          logger.error("Error during token request:", errorData, { structuredData: true });
          response.status(data.status).send(errorData);
          return;
        }
        const tokenData = await data.json();
        logger.info("Token data:", tokenData, { structuredData: true });
        response.send(tokenData);
      } catch (error) {
        logger.error("Error during token request:", error);
        response.status(500).send("Internal server error");
      }
    } else {
      response.status(400).send("Invalid code: no code provided in query parameter.");
    }
  });
});

//data comes in as ?refresh_token=theRefreshToken

exports.refresh = onRequest( async (request, response) => {
    cors(request, response, async () => {
    const refresh_token = request.query.refresh_token;
    if ( refresh_token ) {
      const clientId = `u-s4t2ud-0aaac4e367834ea3432dea29ce9e054e7adad56896f71983cd61e0ea025e429c`;
      const clientSecret = defineString('CLIENT_SECRET');
      const redirectUri = "in42://index";
      const requestBody = new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret.value(),
        refresh_token: refresh_token,
        redirect_uri: redirectUri,
      }).toString();
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody,
      };
      try {
        logger.info(requestOptions, { structuredData: true });
        const data = await fetch("https://api.intra.42.fr/oauth/token", requestOptions);
        if (!data.ok) {
          const errorData = await data.json();
          logger.error("Error during token request:", errorData, { structuredData: true });
          response.status(data.status).send(errorData);
          return;
        }
        const tokenData = await data.json();
        logger.info("Refresh Token data:", tokenData, { structuredData: true });
        response.send(tokenData);
      } catch (error) {
        logger.error("Error during token request:", error);
        response.status(500).send("Internal server error");
      }
    } else {
      response.status(400).send("Invalid code: no refresh_token provided in query parameter.");
    }
  });
});


exports.crashData = onRequest(async (request, response) => {
  // console.log(request)

  // logger.warn("JUST BEFORE PRINTING BODY")
  // logger.warn(request.body)

  //setup 
  const trelloApiKey = "8d9df4659c5da1046e33b9939ae06a4d";
  const trelloToken = defineString('TRELLO_TOKEN');
  const trelloCrashListID = "66465de418cb110b4af870ea";
  // const trelloBoardID = "b7JXesa1";

  const params = new URLSearchParams({
    idList: trelloCrashListID,
    key: trelloApiKey,
    token: trelloToken.value(),
    name: "myBalls",
  }).toString();

  logger.warn(params)

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  logger.info("-------------------hereee--------------------")
  logger.info(requestOptions)
  
  const data = await fetch(`https://api.trello.com/1/cards?${params}`,requestOptions)
  
  logger.error(data)
  logger.error(data.status)
  logger.error(data.body)

  response.status(data.status).send(data.body);
})