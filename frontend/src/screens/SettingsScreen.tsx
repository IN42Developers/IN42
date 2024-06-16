import React from 'react';
import { View, Text } from "react-native"
import RequestCounter from '../components/settings/RequestCounter';
import { GetRequestCounter, GetRequestCounterMax, GetUserData } from '../utils/UserData';
import CurrenPeriodCounter from '../components/settings/CurrenPeriodCounter';
import * as Progress from 'react-native-progress';
import LogOutField from '../components/settings/LogOutField';
import appConfig from '../../app.json';
import { useTypedTranslation } from '../hooks/useTypedTranslation';
import In42Icon from '../components/general/ui_basic/In42Icon';

const SettingsScreen: React.FC = () => {

  const { t } = useTypedTranslation();
  const version: string = appConfig.expo.version;

    let requestProgress = GetRequestCounter() - GetRequestCounterMax();

    return (
      <View style={{ display: 'flex', flex: 1, marginTop: 32 }}>
        <View style={{ justifyContent: 'space-between', rowGap: 24, }}>
          <View style={{ flexDirection: 'row' }}>
          <In42Icon origin={'lucide'} name={"RefreshCw"} size={20} color={"gray"} style={{ marginHorizontal: 16 }} ></In42Icon>
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


