import { useEffect } from 'react'
import {useAuthRequest} from 'expo-auth-session';
import { setAccessToken,setKeyValuePair, retrieveStoredValue } from './TokenStorage';
// import { getTokenFromCode } from './api_utilities';
import { IncrementRequestCounter } from './UserData';
import LogData, { logType } from './debugging/debugging';
import { AuthTokenData } from '../types/UserDataTypes';

export const  authorizeUser =  () => {

  const redirectURI: string = (process.env.IN42_DEV == "true" ? process.env.IN42_DEV_REDIRECT_URI!: process.env.EXPO_PUBLIC_REDIRECT_URI! );
  const clientID: string = (process.env.IN42_DEV == "true" ? process.env.IN42_DEV_CLIENT_ID! : process.env.EXPO_PUBLIC_CLIENT_ID!);
  LogData(logType.INFO,'API_URL =',redirectURI);
  LogData(logType.INFO,'CLIENT_ID =',clientID);
  // LogData(logType.INFO,'process.env.IN42_DEV == "true" = ',process.env.IN42_DEV == "true")
  // LogData(logType.INFO,"TEEEEEEEEEST = ",(process.env.IN42_DEV == "true" ? process.env.IN42_DEV_CLIENT_ID : process.env.EXPO_PUBLIC_CLIENT_ID))
    if(!redirectURI){
      LogData(logType.INFO,'REDIRECT URI =',redirectURI)
      LogData(logType.WARNING,'Redirect URI is undefined, it seems like your .env is not setup')
      return {undefined, promptAsync: () => LogData(logType.ERROR,`THIS FUNCTION DOESN'T EXIST. .env is not setup`)};
    }

    const [request, response, promptAsync] = useAuthRequest(
      {
        clientId: clientID,
        redirectUri: redirectURI, 
        responseType: 'code',
        scopes: ['public','projects','profile','elearning','forum'],
      },
      { authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize' }
    );
    return { response, promptAsync };
}

//function that depends on the IN42_DEV env variable to bypass auth server
const createRequestInit = (code: string): RequestInit => {
  if(process.env.IN42_DEV == 'true' ){
    return {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&client_id=${process.env.IN42_DEV_CLIENT_ID}&client_secret=${process.env.IN42_DEV_CLIENT_SECRET}&code=${code}&redirect_uri=${encodeURIComponent(process.env.IN42_DEV_REDIRECT_URI!)}`,
    };
  }
  return {};
}

//function that depends on the IN42_DEV env variable to bypass auth server
const createRequestURL = (code: string): string => {

  if(process.env.IN42_DEV == 'true' ){
    return "https://api.intra.42.fr/oauth/token";
  }
  return `https://auth-7y7fitjvjq-uc.a.run.app/?code=${code}`;
}

export const getTokenFromCode = async (code: string): Promise<AuthTokenData> => {
  
  try {
    IncrementRequestCounter();
    const response = await fetch(createRequestURL(code), createRequestInit(code));
    if (response.ok) {
        const tokenData: AuthTokenData = await response.json();
        setAccessToken(tokenData);
        await setKeyValuePair('AccessToken', tokenData);
        // LogData(logType.INFO,'TOKENDATA = ',tokenData);
        return tokenData;
    } else {
        throw new Error('Failed to obtain token');
    }
} catch (error: any) {
    LogData(logType.ERROR,error);
    throw new Error(error.message);
}
}