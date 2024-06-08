import * as SecureStore from 'expo-secure-store'
import LogData, { logType } from './debugging/debugging';
import { AuthTokenData } from '../types/UserDataTypes';

let accessToken: AuthTokenData | null;

export function setAccessToken(token: AuthTokenData | null){
    accessToken = token;
}

export function getAccessToken(): AuthTokenData| null{
    return accessToken;
}

export async function setKeyValuePair(key: string, value: any) {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
}

export async function retrieveStoredValue(key: string): Promise<any> {
    let result: any = await SecureStore.getItemAsync(key);
    // LogData(logType.INFO,'in retrieve value',result);
    if(result === null)
        LogData(logType.WARNING,'found valid key but its null');

    return result;
}

//returns true or false whether a token is still valid, will refresh timed out token automatically
export async function isTokenStillValid(): Promise<boolean> {
    try {
        let token = await retrieveStoredValue('AccessToken')
        token = JSON.parse(token);
        if(token === null)
            return false;
        const remainingTime = calculateRemainingTokenTime(token.created_at); //7200 is the total time a token is valid
        if(remainingTime > 0) {
            setAccessToken(token);
            return true;
        }
        else if(remainingTime <= 0) {
            await refreshToken();
            if(accessToken !== null) {
                LogData(logType.INFO,'Found timed out token, refreshed it to create a new valid one.')
                return true;
            }
            else
            LogData(logType.ERROR,'Found timed out token, but couldnt refresh for some reason')
        }
        return false;
    } catch (error) {
        LogData(logType.ERROR,error)
        throw(error);
    }
}

//calculates the remaining AccessToken time
export function calculateRemainingTokenTime(creationDate: number): number {
    const currentTimestamp =Math.floor( Date.now()/1000); //get current date in seconds
    const res = 7200 - ( currentTimestamp - creationDate); //7200 is the total time a token is valid
    return res;
}

//function that depends on the IN42_DEV env variable to bypass auth server
const createRequestInit = (tokendata: AuthTokenData): RequestInit => {
    if(process.env.IN42_DEV == 'true' ) {
      return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&client_id=${process.env.IN42_DEV_CLIENT_ID}&client_secret=${process.env.IN42_DEV_CLIENT_SECRET}&refresh_token=${tokendata.refresh_token}&redirect_uri=${encodeURIComponent(process.env.IN42_DEV_REDIRECT_URI!)}`,
      };
    }
    return {};
  }
  
  //function that depends on the IN42_DEV env variable to bypass auth server
  const createRequestURL = (tokendata: AuthTokenData): string => {
    LogData(logType.INFO,'CREATE REQUEST URL',tokendata)
    if(process.env.IN42_DEV == 'true' ){
      return "https://api.intra.42.fr/oauth/token";
    }
    return `https://refresh-7y7fitjvjq-uc.a.run.app?refresh_token=${tokendata.refresh_token}`;
  }

  export const refreshToken = async (): Promise<boolean> => {

    try {
      let storedVal = await retrieveStoredValue('AccessToken')
      LogData(logType.INFO,'tokenData before jsonparse= ',storedVal);
      let tokendata:AuthTokenData = JSON.parse(storedVal);

      LogData(logType.INFO,'tokenData in refresh token= ',tokendata);
      if(tokendata === null)
          throw new Error("Couldn't retrieve tokendata from storage in refreshToken()");
  
      const response = await fetch(createRequestURL(tokendata), createRequestInit(tokendata));
        if (response.ok) {
            const tokenData = await response.json();
            setAccessToken(tokenData);
            setKeyValuePair('AccessToken', tokenData);
            LogData(logType.INFO,'updated TOKENDATA = ',tokenData);
            return true;
        } else {
            throw new Error('Failed to refresh token');
        }
    } catch (error) {
        LogData(logType.ERROR,error);
        throw error;
    }
  }