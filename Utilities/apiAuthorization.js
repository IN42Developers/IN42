import { useEffect } from 'react'
import {useAuthRequest} from 'expo-auth-session';
import { setAccessToken,setKeyValuePair, retrieveStoredValue } from './TokenStorage';
// import { getTokenFromCode } from './api_utilities';
import { IncrementRequestCounter } from './UserData';

export const  authorizeUser =  () => {

  const redirectURI = (process.env.IN42_DEV == "true" ? process.env.IN42_DEV_REDIRECT_URI: process.env.EXPO_PUBLIC_REDIRECT_URI );
  const clientID =(process.env.IN42_DEV == "true" ? process.env.IN42_DEV_CLIENT_ID : process.env.EXPO_PUBLIC_CLIENT_ID);
  console.log('API_URL =',redirectURI);
  console.log('CLIENT_ID =',clientID);
  // console.log('process.env.IN42_DEV == "true" = ',process.env.IN42_DEV == "true")
  // console.log("TEEEEEEEEEST = ",(process.env.IN42_DEV == "true" ? process.env.IN42_DEV_CLIENT_ID : process.env.EXPO_PUBLIC_CLIENT_ID))
    if(!redirectURI){
      console.log('REDIRECT URI =',redirectURI)
      console.log('Redirect URI is undefined, it seems like your .env is not setup')
      return {undefined, promptAsync: () => console.log(`THIS FUNCTION DOESN'T EXIST. .env is not setup`)};
    }

    const [request, response, promptAsync] = useAuthRequest(
      {
        clientId: clientID,
        redirectUri: redirectURI, 
        responseType: 'code',
        scopes: ['public','projects','profile','elearning','forum'],
        codeChallengeMethod: 'S256',
      },
      { authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize' }
    );
    console.log('Request = ', request);
    return { response, promptAsync };
}

//function that depends on the IN42_DEV env variable to bypass auth server
const createRequestInit = (code) => {
  if(process.env.IN42_DEV == 'true' ){
    return {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&client_id=${process.env.IN42_DEV_CLIENT_ID}&client_secret=${process.env.IN42_DEV_CLIENT_SECRET}&code=${code}&redirect_uri=${encodeURIComponent(process.env.IN42_DEV_REDIRECT_URI)}`,
    };
  }
  return {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "X-SECRET": `${process.env.BASIC_HEADER_HASH}`, //note this gets replaced in the build process
    },
    body: JSON.stringify({ code: code }),
  };
}

//function that depends on the IN42_DEV env variable to bypass auth server
const createRequestURL = (code) => {
  if(process.env.IN42_DEV == 'true' ){
    return "https://api.intra.42.fr/oauth/token";
  }
  return `http://${process.env.EXPO_PUBLIC_AUTH_SERVER_IP}/token/access?code=${code}`;
}

export const getTokenFromCode = async (code) => {
  
  try {
    IncrementRequestCounter();
    
    console.log('Before status request');
    if(!process.env.IN42_DEV){
      const status = await fetch(`http://${process.env.EXPO_PUBLIC_AUTH_SERVER_IP}/status`)
      console.log("status = ", status.json())
    }
    console.log('Before fetch request');
    const response = await fetch(createRequestURL(code), createRequestInit(code));
    console.log('after fetch request');
    console.log(response)
    if (response.ok) {
        const tokenData = await response.json();
        setAccessToken(tokenData);
        await setKeyValuePair('AccessToken', tokenData);
        // console.log('TOKENDATA = ',tokenData);
        return tokenData;
    } else {
        throw new Error('Failed to obtain token');
    }
} catch (error) {
    console.log(error);
    throw new Error(error);
}
}