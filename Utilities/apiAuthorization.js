import { useEffect } from 'react'
import {useAuthRequest} from 'expo-auth-session';
// import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '@env'
import { setAccessToken,setKeyValuePair, retrieveStoredValue } from './TokenStorage';
// import { getTokenFromCode } from './api_utilities';
import { IncrementRequestCounter } from './UserData';

export const  authorizeUser =  () => {

  const apiUrl = process.env.EXPO_PUBLIC_REDIRECT_URI;
  const secret = process.env.EXPO_PUBLIC_CLIENT_SECRET;
  const id = process.env.EXPO_PUBLIC_CLIENT_ID;
  console.log('EXPO_PUBLIC_API_URL =',apiUrl);
  console.log('EXPO_PUBLIC_CLIENT_SECRET =',secret);
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