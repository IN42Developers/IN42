import React from 'react'
import { View, Image, Text, ImageBackground,StyleSheet } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context';
import { PiggyBankIcon, CoinsIcon } from 'lucide-react-native';

import { GetUserData, getUserCursus } from '../../Utilities/UserData'

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
  if (UserData != null) {
    displayname = UserData.displayname;
    login = UserData.login;
    profileimage ={uri: UserData.image.versions.small};
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
  }

  return (
    <View className='container '>
      <ImageBackground source={require('../../assets/images/userInfoCard.png')} className='flex pb-3 px-8 bg-cyan-600 '>
        <SafeAreaView style={styles.safeArea} >
          <View className='flex flex-row justify-between'>
            <View className='flex-col gap-y-1 mt-1'>
              <Text className='text-white font-InterBold'>{displayname}</Text>
              <Text className='text-white font-InterRegular'>{login}</Text>
            </View>
            <View>
              <Image
                source={profileimage}
                className='w-14 h-14 bg-slate-300 rounded-full'
              />
            </View>
          </View>
          <View className='flex flex-row mt-6 justify-between gap-2 content-center'>
            <View className='flex-2 flex-col gap-y-2'>
              <View className='flex-row bg-slate-950/30 bg-opacity-55 p-1 justify-between rounded-lg'>
                <View className='flex flex-row items-start justify-normal'>
                  <Text className='text-["#00B5C0"] ml-2 font-InterSemibold text-2xl'>₳</Text>
                  <Text className='text-gray-200 font-InterBold mt-2 ml-3'>Wallet</Text>
                </View>
                <Text className='text-white ml-2 font-InterBold mt-2 pr-2'>{walletPoints}</Text>
              </View>
              <View className='flex-row bg-slate-950/30 pl-3 pt-2 pb-2 justify-between rounded-lg'>
                <View className='flex flex-row items-start justify-normal'>
                  <CoinsIcon stroke="#00B5C0" size={20} /> 
                  <Text className='text-gray-200 font-InterBold pt-0.5 ml-3'>Ev.P.</Text>
                </View>
                <Text className='text-white ml-2 font-InterBold mt-0.5 pr-3'>{correctionPoints}</Text>
              </View>
            </View>
            <View className='flex-1 bg-slate-950/30 pl-3 pr-3 pt-2 gap-y-2 rounded-lg'>
                <Text className='text-white font-InterBold pt-0.5'>Level based progress</Text>
                <View className='flex flex-row justify-between'>
                  <Text className='text-white font-InterMedium pt-1'>{"Level "+ curLevel}</Text>
                  <Text className='text-gray-400 font-InterRegular pt-1'>{"Level "+ nextLevel}</Text>
                </View>
                <View className='p-0.5 bg-slate-400 rounded-full z-0'>
                  <View className='w-[35%] p-0.5 z-10 bg-white rounded-full' />
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    )
};

const styles = StyleSheet.create({
  safeArea: {
    // marginTop: -25,
    // marginBottom: -45,
    // borderColor: 'red',
    // borderWidth: 1,
  }
})