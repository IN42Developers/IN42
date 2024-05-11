import React from 'react'
import { View, Image, Text, ImageBackground, Platform } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context';
import { CoinsIcon } from 'lucide-react-native';

import { GetUserData, getUserCursus } from '../../Utilities/UserData'
import * as Progress from 'react-native-progress';

export default function UserInfoCard() {
  const UserData = GetUserData();
  const UserCursus = getUserCursus();
  let displayname = 'Long display name';
  let login = 'intra login';
  let profileimage = '';
  let walletPoints = -1;
  let correctionPoints = -1;
  let curLevel = '';
  let nextLevel = -1;
  let levelProgress = 0.5;
  if (UserData != null) {
    displayname = UserData.displayname;
    login = UserData.login;
    profileimage ={uri: UserData.image.versions.small};
    walletPoints = UserData.wallet;
    correctionPoints = UserData.correction_point;
    curLevel = Math.floor(UserCursus.level);
    nextLevel = curLevel + 1;
    levelProgress = UserCursus.level - curLevel;
  } else {
    displayname = 'Loading displayname ...';
    login = 'Loading login ...'
    profileimage = require('../../assets/images/profilePlaceholder.png');
    walletPoints = '0';
    correctionPoints = '0';
  }

  return (
    <View style={{ flex: 0 }}>
      <ImageBackground source={require('../../assets/images/userInfoCard.png')} style={{ display: 'flex', paddingHorizontal: 32, backgroundColor: 'cyan' }}>
        <SafeAreaView style={{ marginBottom: 16 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column', columnGap: 1, marginTop: 26 }}>
              <Text style={{ color: 'white', fontFamily: 'Inter_700Bold' }}>{displayname}</Text>
              <Text style={{ color: 'white', fontFamily: 'Inter_400Regular' }}>{login}</Text>
            </View>
            <View>
              <Image
                source={profileimage}
                style={{ width: 56, height: 56, backgroundColor: 'rgb(203, 213, 225)', borderRadius: 2000, marginTop: 14 }}
              />
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 24, justifyContent: 'space-between', gap: 6, alignContent: 'center' }}>
            <View style={{ flex: 0.8, flexDirection: 'column', rowGap: 8 }}>
              <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0.3)', opacity: 5, padding: 4, justifyContent: 'space-between', borderRadius: 8 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'normal' }}>
                  <Text style={{ color: '#00B5C0', marginLeft: 8, fontFamily: 'Inter_600SemiBold', fontSize: 22 }}>₳</Text>
                  <Text style={{ color: 'lightgray', fontFamily: 'Inter_700Bold', paddingTop: 6, marginLeft: 12 }}>Wallet</Text>
                </View>
                <Text style={{ color: 'white', marginLeft: 8, fontFamily: 'Inter_700Bold', marginTop: 6, paddingRight: 8 }}>{walletPoints}</Text>
              </View>
              <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0.3)', paddingLeft: 12, paddingTop: 8, paddingBottom: 8, justifyContent: 'space-between', borderRadius: 8 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'normal' }}>
                  <CoinsIcon stroke="#00B5C0" size={20} /> 
                  <Text style={{ color: 'lightgray', fontFamily: 'Inter_700Bold', paddingTop: 2, marginLeft: 12 }}>Ev.P.</Text>
                </View>
                <Text style={{ color: 'white', marginLeft: 8, fontFamily: 'Inter_700Bold', marginTop: 2, paddingRight: 12 }}>{correctionPoints}</Text>
              </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', paddingLeft: 12, paddingRight: 12, paddingTop: 8, rowGap: 8, borderRadius: 8 }}>
                <Text style={{ color: 'white', fontFamily: 'Inter_700Bold', paddingTop: 2 }}>Level based progress</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'white', fontFamily: 'Inter_500Medium' }}>{ "Level " + curLevel }</Text>
                  <Text style={{ color: 'gray', fontFamily: 'Inter_400Regular' }}>{"Level "+ nextLevel}</Text>
                </View>
                <View style={{ display: 'flex', width: '100%' }}>
                  <Progress.Bar progress={levelProgress} width={164} height={4} color={'white'} unfilledColor={'#94a3b8'} borderColor={'#94a3b8'} />
                </View>
            </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    )
};