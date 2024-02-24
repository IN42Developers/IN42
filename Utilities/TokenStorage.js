import * as SecureStore from 'expo-secure-store'
// import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '@env'
// import { refreshToken } from './apiAuthorization';

let accessToken = null;

export function setAccessToken(token){
    accessToken = token;
}

export function getAccessToken(){
    return accessToken;
}

export async function setKeyValuePair(key, value) {
    await SecureStore.setItemAsync(key,JSON.stringify(value));
}

export async function retrieveStoredValue(key) {
    let result = await SecureStore.getItemAsync(key);
    // console.log('in retrieve value',result);
    if(result === null)
        console.log('found valid key but its null');

    return result;
}

//returns true or false whether a token is still valid, will refresh timed out token automatically
export async function isTokenStillValid() {
    try {
        let token = await retrieveStoredValue('AccessToken')
        token = JSON.parse(token);
        if(token === null)
            return false;
        const remainingTime = calculateRemainingTokenTime(token.created_at); //7200 is the total time a token is valid
        // console.log(`Remaining token time = `,remainingTime);
        if(remainingTime > 0) {
            setAccessToken(token);
            return true;
        }
        else if(remainingTime <= 0) {
            await refreshToken();
            if(accessToken !== null) {
                console.log('Found timed out token, refreshed it to create a new valid one.')
                return true;
            }
            else
                console.log('Found timed out token, but couldnt refresh for some reason')
        }
        return false;
    } catch (error) {
        console.log(error)
        throw(error);
    }
}

//calculates the remaining AccessToken time
export function calculateRemainingTokenTime(creationDate) {
    const currentTimestamp =Math.floor( Date.now()/1000); //get current date in seconds
    const res = 7200 - ( currentTimestamp - creationDate); //7200 is the total time a token is valid
    return res;
}

export const refreshToken = async () => {

    try {
      let tokendata = await retrieveStoredValue('AccessToken')
      tokendata = JSON.parse(tokendata);
    //   console.log('tokenData in refresh token= ',tokendata);
      if(tokendata === null)
          throw new Error("Couldn't retrieve tokendata from storage in refreshToken()");
  
    const tokenRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&client_id=${process.env.EXPO_PUBLIC_CLIENT_ID}&client_secret=${process.env.EXPO_PUBLIC_CLIENT_SECRET}&refresh_token=${tokendata.refresh_token}&redirect_uri=${encodeURIComponent(process.env.EXPO_PUBLIC_REDIRECT_URI)}`,
      };
  
        const response = await fetch("https://api.intra.42.fr/oauth/token", tokenRequest);
        if (response.ok) {
            const tokenData = await response.json();
            setAccessToken(tokenData);
            setKeyValuePair('AccessToken', tokenData);
            console.log('updated TOKENDATA = ',tokenData);
            return true;
        } else {
            throw new Error('Failed to refresh token');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return false;
  }