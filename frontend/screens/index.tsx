import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { ButtonTs } from '../components/buttons/Button-ts';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { authorizeUser, getTokenFromCode } from '../Utilities/apiAuthorization.js';
import { getAccessToken, setAccessToken, setKeyValuePair } from '../Utilities/TokenStorage';
import { AssertUserCanRequestData } from '../Utilities/UserData';
import { AuthContext } from '../Context';
import EntryHeader from '../components/ui/EntryHeader';
import LogData, { logType } from '../Utilities/debugging';

const { width } = Dimensions.get('window');

export default function IndexScreen() {
  const { Login } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const { response, promptAsync: AuthUser } = authorizeUser();

  useEffect(() => {
    const tokenExchange = async () => {
      try {
        if (response?.type === 'success') {
          const { code } = response.params;
          const accessToken = await getTokenFromCode(code);
          setKeyValuePair('AccessToken', accessToken);
          setAccessToken(accessToken);
        }
      } catch (error) {
        LogData(logType.ERROR, error);
      }
    };

    (async () => {
      await tokenExchange();
      const token = getAccessToken();
      if (token != null) {
        Login();
      }
    })();
  }, [response]);

  const handlePress = async () => {
    try {
      if (!AssertUserCanRequestData()) return;
      await AuthUser();
    } catch (error) {
      LogData(logType.ERROR, error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
          <EntryHeader />
      </View>
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          <Text style={styles.titleText}>Welcome back</Text>
          <Text style={styles.descriptionText}>
            Login as one from over 21,000 students in the 42 Network - ever-evolving intra companion, free, mobile and accessible. Built together with the community.
          </Text>
          <View style={styles.buttonContainer}>
            <ButtonTs onPress={handlePress}>
              <Text style={styles.buttonText}>Authorize</Text>
            </ButtonTs>
            <Text style={styles.detailText}>
              You will be redirected to 42 Intra where you may authorize our app. If successful, you will be redirected back.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.9,
    gap: 12
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'Inter_500Medium',
  },
  descriptionText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 18,
    padding: 8,
    fontFamily: 'Inter_400Regular',
  },
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: width * 0.9,
    gap: 12
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
  },
  detailText: {
    textAlign: 'center',
    padding: 4,
    fontSize: 12,
    color: 'gray',
  },
});
