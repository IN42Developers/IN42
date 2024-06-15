import React from 'react';
import { View, Text } from "react-native"
import RequestCounter from '../components/settings/RequestCounter';
import { GetRequestCounter, GetRequestCounterMax, GetUserData } from '../utils/UserData';
import CurrenPeriodCounter from '../components/settings/CurrenPeriodCounter';
// import SettingsSection from '../components/general/SettingsSection';
// import SettingsToggle from '../components/generic/SettingsToggle';
import * as Progress from 'react-native-progress';

import {  RefreshCwIcon } from 'lucide-react-native';
import LogOutField from '../components/settings/LogOutField';
import { useTranslation } from 'react-i18next';
import appConfig from '../../app.json';

const SettingsScreen: React.FC = () => {

  const { t } = useTranslation();
  const version: string = appConfig.expo.version;

    let requestProgress = GetRequestCounter() - GetRequestCounterMax();

    return (
      <View style={{ display: 'flex', flex: 1, marginTop: 32 }}>
        <View style={{ justifyContent: 'space-between', rowGap: 24, }}>
          <View style={{ flexDirection: 'row' }}>
            <RefreshCwIcon stroke="gray" style={{ marginHorizontal: 16 }} />
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ display: 'flex' }}>
                  <Text style={{ color: 'lightgray', fontSize: 14, fontFamily: 'Inter_600SemiBold', letterSpacing: 1.2 }}>{t('settings_rateLimit_title')}</Text>
                  <Text style={{ color: 'gray', fontFamily: 'Inter_400Regular', marginTop: 8, marginRight: 108, }}>{t('settings_rateLimit_description')}</Text>
                </View>
                <View style={{ position: 'absolute', right: 64 }}>
                  <CurrenPeriodCounter />
                </View>
              </View>
              <View style={{ marginTop: 12, width: '80%', display: 'flex' }}>
                <Progress.Bar progress={requestProgress} color={'white'} unfilledColor={'gray'} borderColor={'gray'} height={1} borderRadius={0} />
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', marginTop: 12 }}>
                <RequestCounter />
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: 'gray', padding: 0.5 }} />
          <View style={{ alignItems: 'center', alignSelf: 'center' }}>
            <LogOutField/>
            <Text style={{ color: 'gray' }}>{'IN42 ' + version}</Text>
          </View>
        </View>
      </View>
    )
}

export default SettingsScreen


