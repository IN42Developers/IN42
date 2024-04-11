import React from 'react'
import { View, Image, Text } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context';
import { PiggyBankIcon, CoinsIcon } from 'lucide-react-native';

import { GetUserData, getUserCursus } from '../../Utilities/UserData'

export default function UserInfoCard() {
  const UserData = GetUserData();
  const UserCursus = getUserCursus();
  // console.log(UserData)
  let displayname = 'Long display name';
  let login = 'intra login';
  let profileimage = '';
  let walletPoints = -1;
  let correctionPoints = -1;
  let curLevel = '';
  let nextLevel = -1;
  if (UserData != null) {
    displayname = UserData.displayname;
    login = UserData.login;
    profileimage = UserData.image.versions.small;
    walletPoints = UserData.wallet;
    correctionPoints = UserData.correction_point;
    curLevel = Math.floor(UserCursus.level);
    nextLevel = curLevel + 1;
  } else {
    displayname = 'Loading displayname ...';
    login = 'Loading login ...'
    profileimage = require('../../assets/images/profilePlaceholder.png');
    walletPoints = '0';
    correctionPoints = '0';
    curLevel = 'Level 0';
    nextLevel = 'Level 0';
  }

  console.log(profileimage)
  return (
    <View className='container'>
      <View className='flex p-8 bg-blue-500'>
        <SafeAreaView style={{margin: -10}}>
          <View className='flex flex-row justify-between'>
            <View className='flex-col gap-y-1 mt-1'>
              <Text className='text-white font-InterBold'>{displayname}</Text>
              <Text className='text-white font-InterRegular'>{login}</Text>
            </View>
            <View>
              <Image
                source={{uri: profileimage}}
                className='w-14 h-14 bg-slate-300 rounded-full'
              />
            </View>
          </View>
          <View className='flex flex-row mt-6 justify-between gap-2 content-center'>
            <View className='flex flex-col gap-y-2 min-w-[140] max-w-96'>
              <View className='flex-row bg-slate-950 p-3 justify-between rounded-lg'>
                <View className='flex flex-row items-start justify-normal'>
                  <Text className='text-["#A8D8F8"] mt-1 ml-1 font-InterSemibold text-2xl'>₳</Text>
                  <Text className='text-white font-InterBold mt-2.5 ml-3'>Wallet</Text>
                </View>
                <Text className='text-gray-400 ml-2 font-InterBold mt-2.5'>{walletPoints}</Text>
              </View>
              <View className='flex-row bg-slate-950 p-3 justify-between rounded-lg'>
                <View className='flex flex-row items-start justify-normal'>
                  <CoinsIcon stroke="#A8D8F8" /> 
                  <Text className='text-white font-InterBold mt-1 ml-3'>Ev. Points</Text>
                </View>
                <Text className='text-gray-400 ml-2 font-InterBold mt-1'>{correctionPoints}</Text>
              </View>
            </View>
            <View className='flex bg-slate-950 p-4 w-60 gap-y-2 rounded-lg'>
                <Text className='text-white font-InterBold'>Level based progress</Text>
                <View className='flex flex-row justify-between'>
                  <Text className='text-white font-InterMedium'>{"LEVEL "+ curLevel}</Text>
                  <Text className='text-gray-400 font-InterRegular'>{"LEVEL "+ nextLevel}</Text>
                </View>
                <View className='p-0.5 bg-slate-400 rounded-full z-0'>
                  <View className='w-[35%] p-0.5 z-10 bg-white rounded-full' />
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </View>
    )
};