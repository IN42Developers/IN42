import { useEffect } from 'react'
import {useAuthRequest} from 'expo-auth-session';
import { BASIC_HEADER_HASH } from '@env'
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
      return {undefined, promptAsync: () => console.log(`THIS FUNCTION DOESN'T EXIST. .env is not setup`)};
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


//authorize over Auth server
export const getTokenFromCode = async (code) => {

  const tokenRequest = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-SECRET': `${BASIC_HEADER_HASH}`,
      },
    };
    try{
      const resp = await fetch(`http://${process.env.EXPO_PUBLIC_AUTH_SERVER_IP}/status`)
      const data = await resp.json()
      if(data.status != `ok`)
        throw new Error('Server may be offline');
      console.log(`SERVER STATUS = `,data.status);
    }
    catch{
      throw new Error('Couldnt do it');
    }
    try {
      IncrementRequestCounter();
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_AUTH_SERVER_IP}/token/access?code=${code}`, tokenRequest);
      console.log('THIS IS A RESPONSE BOII = ',response)
      if (response.ok) {
          const tokenData = await response.json();
          setAccessToken(tokenData);
          await setKeyValuePair('AccessToken', tokenData);
          let token = await retrieveStoredValue('AccessToken')
          console.log('AFTER STORED = ',token);
          return tokenData;
      } else {
          throw new Error('Failed to obtain token');
      }
  } catch (error) {
      console.log(error);
      throw new Error(error);
  }
}

