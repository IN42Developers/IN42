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

const { crashData } = require('./handlers/crashData');
exports.crashData = crashData;


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




  // idMembers
  // 59d4608d007ee08faf60e2ef = Jean
  // 6465f0d24cae128fa50d9e73 = Chris

  // [
  //   {
  //     "id": "64fb32bf4410395e0d6ffaaa",
  //     "idBoard": "64fb32bf745c5508d8fa35ae",
  //     "name": "Programming",
  //     "color": "blue",
  //     "uses": 32
  //   },
  //   {
  //     "id": "64fb32bf4410395e0d6ffaa5",
  //     "idBoard": "64fb32bf745c5508d8fa35ae",
  //     "name": "V.0.3.1",
  //     "color": "lime_dark",
  //     "uses": 27
  //   },
  //   {
  //     "id": "663e3cd835ead4e89a1f5ebb",
  //     "idBoard": "64fb32bf745c5508d8fa35ae",
  //     "name": "v0.4.0",
  //     "color": "pink_dark",
  //     "uses": 14
  //   },
  //   {
  //     "id": "64fb32bf4410395e0d6ffa9c",
  //     "idBoard": "64fb32bf745c5508d8fa35ae",
  //     "name": "Design",
  //     "color": "green",
  //     "uses": 11
  //   },
  //   {
  //     "id": "64fb32bf4410395e0d6ffaad",
  //     "idBoard": "64fb32bf745c5508d8fa35ae",
  //     "name": "Bug",
  //     "color": "red",
  //     "uses": 11
  //   },
  //   {
  //     "id": "64fb32bf4410395e0d6ffaa7",
  //     "idBoard": "64fb32bf745c5508d8fa35ae",
  //     "name": "Decison/Investigation",
  //     "color": "purple",
  //     "uses": 8
  //   },
  //   {
  //     "id": "6624feb6f42e92eb7002d2b4",
  //     "idBoard": "64fb32bf745c5508d8fa35ae",
  //     "name": "Organizing",
  //     "color": "pink",
  //     "uses": 5
  //   },
  //   {
  //     "id": "64fb32bf4410395e0d6ffaa4",
  //     "idBoard": "64fb32bf745c5508d8fa35ae",
  //     "name": "Figma UI/UX",
  //     "color": "yellow",
  //     "uses": 2
  //   },
  //   {
  //     "id": "662501b375691a7368a9bfe3",
  //     "idBoard": "64fb32bf745c5508d8fa35ae",
  //     "name": "Replaced",
  //     "color": "black_dark",
  //     "uses": 1
  //   }
  // ]

