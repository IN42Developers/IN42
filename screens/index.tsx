import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import Logo42 from '../components/svg/logo42'
import Shape from '../components/svg/Shape'
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

    const [loaded, error] = useFonts({
    Regular: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    Medium: require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    SemiBold: require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    Bold: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    ExtraBold: require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
  });

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

  if (!loaded) {
    console.log(loaded);
    return null;
  }


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
      <View style={styles.body}>
        <View style={styles.container}>
          <Shape style={styles.shape} />
            <View style={styles.render}>
              <Logo42 style={styles.logo} />
              <View style={styles.separator}/>
              <View style={styles.loginCard}>
                <Text style={styles.loginTitle}>Sign In</Text>
                <Text style={styles.loginText}>In order to use the app and all it’s features, please first authorize with your 42 student account.</Text>
                <DefaultButton title={"Sign in with 42"} onPress={handlePress} />
                <View style={styles.cardSeparator}/>
              </View>
            </View>
          </View>
        </View>
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
  },
  logo: {
    zIndex: 1,
  },
  render: {
    zIndex: 2,
    alignItems: 'center',
    margin: 100,
    position: 'absolute',
  },
  separator: {
    marginVertical: 70,
    height: 1,
    width: '80%',
  },
  cardSeparator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  loginCard: {
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 30,
    alignItems: 'center',
  },
  loginTitle: {
    fontFamily: 'Bold',
    fontSize: 24,
    color: '#fff',
  },
  loginText: {
    fontFamily: 'Regular',
    fontSize: 16,
    color: '#cbcbcb',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: '100',
  },
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  },
});