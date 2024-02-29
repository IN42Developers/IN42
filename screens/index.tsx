import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DefaultButton from '../components/buttons/AuthButton'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

import {authorizeUser} from '../Utilities/apiAuthorization.js'
import {getAccessToken, setAccessToken, retrieveStoredValue, isTokenStillValid } from '../Utilities/TokenStorage';
import { getTokenFromCode } from '../Utilities/apiAuthorization.js'
import { setKeyValuePair } from '../Utilities/TokenStorage'
import { AssertUserCanRequestData } from '../Utilities/UserData'

import { AuthContext } from '../Context'

export default function IndexScreen() {
    const {Login} = React.useContext(AuthContext);
    const navigation = useNavigation();

    const { response,promptAsync: AuthUser } = authorizeUser();

  useEffect( () => {
    const tokenExchange = async() =>{
      try {
        
        if (response?.type === 'success') {
          const { code } = response.params;
          console.log('CODE = ', code);
          
          const accessToken = await getTokenFromCode(code);
          console.log('saved TOKEN = ', accessToken);
          setKeyValuePair('AccessToken', accessToken);
          setAccessToken(accessToken);
        }
      } catch (error) {
         console.log(error);
      }
    }
    
    try {
      (async () => {
          await tokenExchange();
          const token = getAccessToken();
          console.log('token = ', token);
          if(token != null) {
            console.log('Authorization Successful. Logging in');
            Login();
          }
        }
        )();
    } catch (error) {
      console.log(error);
      alert(error)
    }
    //self invoking async function wtf?!
  },[response])

  const handlePress = async () => {
    try{
      if(AssertUserCanRequestData() == false){
        return;
      }
      await AuthUser();
    }

    catch(error){
      console.log(error);
    }
  }

  return (
    <SafeAreaView>
      <Text>Melde dich an</Text>
      <DefaultButton onPress={handlePress} title={"Yeet"}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shape: {
    zIndex: 0,
    width: '100%',
    height: '100%',
  },
  logo: {
    zIndex: 1,
  },
  render: {
    zIndex: 2,
    alignItems: 'center',
    position: 'absolute',
  },
  separator: {
    height: 16,
  },
  trim: {
    height: 64,
  },
  cardSeparator: {
    marginVertical: 10,
    height: 84,
  },
  loginCard: {
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 100,
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 22,
    color: '#cbcbcb',
    textAlign: 'center',
  },
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  },
});