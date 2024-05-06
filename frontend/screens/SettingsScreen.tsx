import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from "react-native"
import { AuthContext } from '../Context'
import { setAccessToken, setKeyValuePair } from '../Utilities/TokenStorage';
import RequestCounter from '../components/complex/RequestCounter';
import { GetRequestCounter, GetRequestCounterMax, GetUserData } from '../Utilities/UserData';
import CurrenPeriodCounter from '../components/complex/CurrenPeriodCounter';
import SettingsSection from '../components/generic/SettingsSection';
import SettingsToggle from '../components/generic/SettingsToggle';
import * as Progress from 'react-native-progress';

import { LogOutIcon, RefreshCwIcon } from 'lucide-react-native';
import { Button } from '../components/buttons/Button';
import LogData, { logType } from '../Utilities/debugging';

const SettingsScreen = () => {

    const UserData = GetUserData();
    let displayname = 'Long display name';
    let login = 'intra login';
    let profileimage;
    const req = GetRequestCounter();
    const reqMax = GetRequestCounterMax();
    let requestProgress = 0.5;

    if (UserData != null) {
        displayname = UserData.displayname;
        login = UserData.login;
        profileimage = {uri: UserData.image.versions.small};
        requestProgress = req - reqMax;
    } else {
        displayname = 'User';
        login = 'username';
        profileimage = require('../assets/images/profilePlaceholder.png');
    }

    const {Logout} = React.useContext(AuthContext);
    const LogoutUser =  async () => {
      await setKeyValuePair('AccessToken', '');
      setAccessToken(null);
      LogData(logType.INFO,'Logout button pressed!');
      Logout();
  
    } 

    return (
      <View style={{ display: 'flex', flex: 1, marginTop: 32 }}>
        <View style={{ justifyContent: 'space-between', rowGap: 24, }}>
          <View style={{ flexDirection: 'row' }}>
            <RefreshCwIcon stroke="gray" style={{ marginHorizontal: 16 }} />
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ display: 'flex' }}>
                  <Text style={{ color: 'lightgray', fontSize: 14, fontFamily: 'Inter_600SemiBold', letterSpacing: 1.2 }}>Interaction Rate Limit</Text>
                  <Text style={{ color: 'gray', fontFamily: 'Inter_400Regular', marginTop: 8, marginRight: 108, }}>For API sustainability IN42 will process your API requests to Intra with an hour-updated interaction limit.</Text>
                </View>
                <View style={{ position: 'absolute', right: 64 }}>
                  <CurrenPeriodCounter />
                </View>
              </View>
              <View style={{ marginTop: 12, width: '80%', display: 'flex' }}>
                <Progress.Bar progress={requestProgress} color={'white'} unfilledColor={'#94a3b8'} borderColor={'#94a3b8'} height={1} borderRadius={0} />
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', marginTop: 12 }}>
                <RequestCounter />
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: 'gray', padding: 0.5 }} />
          <View style={{ alignItems: 'center', alignSelf: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 32 }}>
              <View style={{ borderColor: '#008891', borderWidth: 1, padding: 32, borderRadius: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Image
                    source={ profileimage }
                    style={{ width: 52, height: 52, backgroundColor: 'zinc', borderRadius: 2000, marginRight: 24 }}
                  />
                  <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontFamily: 'Inter_700Bold', fontSize: 16 }}>{displayname}</Text>
                    <Text style={{ color: 'lightgray', fontFamily: 'Inter_500Medium', fontSize: 12, marginBottom: 24, marginTop: 2 }}>{login}</Text>
                    <Button onPress={LogoutUser} variant='link'>
                      <LogOutIcon stroke='#1E1E1E' size="20" />
                      <Text style={{ color: '#1E1E1E', fontSize: 16, fontFamily: 'Inter_900Black' }}>Log out</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
            <Text style={{ color: 'gray' }}>IN42 v0.3.0</Text>
          </View>
        </View>
      </View>
    )
}

export default SettingsScreen


