import React from 'react'
import { View, Image, Text, ImageBackground, Platform } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context';

import { GetUserData, getUserCursus } from '../../utils/UserData'
import * as Progress from 'react-native-progress';
import { UserData } from '../../types/UserDataTypes'
import Avatar from './Avatar';
import UserCurrencyContainer from './UserCurrencyContainer';
import UserName from './UserName';
import { useTypedTranslation } from '../../hooks/useTypedTranslation';
import In42Icon from '../general/ui_basic/In42Icon';

export default function UserInfoCard() {

  const { t } = useTypedTranslation();

  const UserData: UserData | null = GetUserData();
  const UserCursus = getUserCursus();
  let curLevel = -1;
  let nextLevel = -1;
  let levelProgress = 0.5;
  let walletPoints = -1;
  let correctionPoints = -1;
  if (UserData != null) {
    curLevel = Math.floor(UserCursus.level);
    nextLevel = curLevel + 1;
    levelProgress = UserCursus.level - curLevel;
    walletPoints = UserData.wallet;
    correctionPoints = UserData.correction_point;
  } else {
    walletPoints = 0;
    correctionPoints = 0;
  }

  return (
    <View style={{ flex: 0 }}>
      <ImageBackground source={require('../../../assets/images/userInfoCard.png')} style={{ display: 'flex', paddingHorizontal: 32, backgroundColor: 'cyan' }}>
        <SafeAreaView style={{ marginBottom: 16 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column', columnGap: 1, marginTop: 26 }}>
              <UserName/>
            </View>
            <View style= {{marginTop: 14,}}> 
              <Avatar width={56} height={56}/>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 24, justifyContent: 'space-between', gap: 6, alignContent: 'center' }}>
            <View style={{ flex: 0.8, flexDirection: 'column', rowGap: 8 }}>
              <UserCurrencyContainer currencyAmount={walletPoints} currencyText={t('home_currency_wallet')} 
                icon={<In42Icon origin={'lucide'} name={"Coins"} size={20} color={"#00B5C0"}></In42Icon>}/> 
              <UserCurrencyContainer currencyAmount={correctionPoints} currencyText={t('home_currency_evalPoints')} 
                icon={<In42Icon origin={'lucide'} name={"Coins"} size={20} color={"#00B5C0"}></In42Icon> }/>
            </View>
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', paddingLeft: 12, paddingRight: 12, paddingTop: 8, rowGap: 8, borderRadius: 8 }}>
                <Text style={{ color: 'white', fontFamily: 'Inter_700Bold', paddingTop: 2 }}>{t('home_level_progress')}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'white', fontFamily: 'Inter_500Medium' }}>{ t('home_level') + " " + curLevel }</Text>
                  <Text style={{ color: 'gray', fontFamily: 'Inter_400Regular' }}>{t('home_level') + " " + nextLevel}</Text>
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