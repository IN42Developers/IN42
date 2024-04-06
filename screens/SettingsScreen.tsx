import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from "react-native"
import { AuthContext } from '../Context'
import { setAccessToken, setKeyValuePair } from '../Utilities/TokenStorage';
import RequestCounter from '../components/complex/RequestCounter';
import { GetRequestCounter, GetRequestCounterMax, GetUserData } from '../Utilities/UserData';
import CurrenPeriodCounter from '../components/complex/CurrenPeriodCounter';
import SettingsSection from '../components/generic/SettingsSection';
import SettingsToggle from '../components/generic/SettingsToggle';
import { AntDesign } from '@expo/vector-icons'

import { LogOutIcon, RefreshCwIcon } from 'lucide-react-native';

const SettingsScreen = () => {

    const UserData = GetUserData();
    let displayname = 'Long display name';
    let login = 'intra login';
    let profileimage = '';

    if (UserData != null) {
        displayname = UserData.displayname;
        login = UserData.login;
        profileimage = UserData.image.versions.small;
    } else {
        displayname = 'User';
        login = 'username';
        profileimage = require('../assets/images/profilePlaceholder.png');
    }

    const {Logout} = React.useContext(AuthContext);
    const LogoutUser =  async () => {
      await setKeyValuePair('AccessToken', '');
      setAccessToken(null);
      console.log('Trying to Logout');
      Logout();
  
    } 

    return (
      <View className='flex justify-center container'>
        <View className='flex justify-between'>
          <View className='flex-row gap-x-4 ml-8 mt-10'>
            <RefreshCwIcon stroke="gray" />
            <View className='flex flex-col gap-y-2'>
              <View className='flex flex-row justify-between'>
                <Text className='text-base font-InterSemibold tracking-wider text-gray-200'>Interaction Rate Limit</Text>
                <View className='flex mr-[64] '>
                  <CurrenPeriodCounter />
                </View>
              </View>
              <Text className='text-gray-400 font-InterRegular mr-32'>For API sustainability IN42 will process your API requests to Intra with an hour-updated interaction limit.</Text>
              <View className='mt-4 h-0.5 w-3/6 bg-slate-400 z-0'>
                <View className='w-3/4 h-0.5 bg-white' />
              </View>
              <View className='flex flex-row mt-3'>
                <RequestCounter />
              </View>
            </View>
          </View>
          <View className='ml-0 mt-8 bg-gray-600 h-0.5' />
          <View className='flex flex-row items-center mt-12 justify-center gap-x-16'>
            <View className='flex bg-[##202020] w-3/6 p-8 bottom-0 rounded-xl'>
              <View className='flex flex-row gap-x-8 justify-center'>
                <Image
                  source={{profileimage}}
                  className='w-14 h-14 bg-slate-300 rounded-full'
                />
                <View className='flex flex-col justify-center'>
                  <Text className='text-white font-InterBold text-lg'>{displayname}</Text>
                  <Text className='text-gray-300 font-InterMedium text-sm'>{login}</Text>
                </View>
              </View>
            </View>
            <View className='flex flex-row'>
              <Pressable className='w-50 h-50' onPress={LogoutUser}>
                <LogOutIcon stroke="gray" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    )
}

export default SettingsScreen


