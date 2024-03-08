import { useEffect } from 'react'
import {useAuthRequest} from 'expo-auth-session';
// import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '@env'
import { setAccessToken,setKeyValuePair, retrieveStoredValue } from './TokenStorage';
// import { getTokenFromCode } from './api_utilities';
import { IncrementRequestCounter } from './UserData';

export const  authorizeUser =  () => {

  const apiUrl = process.env.EXPO_PUBLIC_REDIRECT_URI;
  const id = process.env.EXPO_PUBLIC_CLIENT_ID;
  console.log('EXPO_PUBLIC_API_URL =',apiUrl);
  console.log('EXPO_PUBLIC_CLIENT_ID =',id);
    if(!apiUrl){
      console.log('REDIRECT URI =',apiUrl)
      console.log('Redirect URI is undefined, it seems like your .env is not setup')
      return {undefined, promptAsync: () => console.log("THIS FUNCTION DOESN'T EXIST. .env is not setup")};
    }

    const [request, response, promptAsync] = useAuthRequest(
      {
        clientId: process.env.EXPO_PUBLIC_CLIENT_ID,
        redirectUri: apiUrl, 
        responseType: 'code',
        scopes: ['public','projects','profile','elearning','forum'],
        codeChallengeMethod: 'S256',
      },
      { authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize' }
    );
    console.log('Request = ', request);
    return { response, promptAsync };
}


//getTokenFromCode and refresh token could be made into 1 function
export const getTokenFromCode = async (code) => {

  const tokenRequest = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&client_id=${process.env.EXPO_PUBLIC_CLIENT_ID}&client_secret=${process.env.EXPO_PUBLIC_CLIENT_SECRET}&code=${code}&redirect_uri=${encodeURIComponent(process.env.EXPO_PUBLIC_REDIRECT_URI)}`,
    };
    console.log('Token request = ', tokenRequest)
  try {
      IncrementRequestCounter();
      const response = await fetch("https://api.intra.42.fr/oauth/token", tokenRequest);
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


export const getTokenFromCode2 = async (code) => {

  const anotherSecret = "amVhbklzc2Vyc3RlZHQ6MTIz";

  const tokenRequest = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-SECRET': `${anotherSecret}`,
      },
      body: JSON.stringify({ code: code }),
    };
    console.log("CODE = ",code)
    console.log('Token request = ', tokenRequest)
    try{

      console.log("----------------------------------")
      //note this obviously doens't work because my phone is not in the same network
      const resp = await fetch("http://10.13.3.6:3000/status")
      const data = await resp.json()
      console.log("SERVER STATUS = ",data.status);
    }
    catch{
      throw new Error('Couldnt do it');
    }
    try {
      IncrementRequestCounter();
      const response = await fetch(`http://10.13.3.6:3000/token/access?code=${code}`, tokenRequest);
      console.log('THIS IS A RESPONSE BOII = ',response)
      if (response.ok) {
          const tokenData = await response.json();
          console.log('TOKEN DATA AAAAA = ',tokenData)
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