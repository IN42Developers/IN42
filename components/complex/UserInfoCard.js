import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetUserData } from '../../Utilities/UserData'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EvaluationPointsIcon } from '../svg/UIIcons';

export default function UserInfoCard() {
    const UserData = GetUserData();
    const insets = useSafeAreaInsets();
    let displayname = 'Long display name';
    let login = 'intra login';
    let profileimage = '';
    let walletPoints = -1;
    let correctionPoints = -1;
    let curLevel = 'Current Level';
    let nextLevel = -1;
    if (UserData != null) {
        displayname = UserData.displayname;
        login = UserData.login;
        profileimage = UserData.image.versions.small;
        walletPoints = UserData.wallet;
        correctionPoints = UserData.correction_point;
        curLevel = UserData.level;
        nextLevel = UserData.level + 1;
    } else {
      displayname = 'Loading displayname ...';
      login = 'Loading login ...'
      profileimage = require('../../assets/images/profilePlaceholder.png');
      walletPoints = '0';
      correctionPoints = '0';
      curLevel = 'Level 0';
      nextLevel = 'Level 0';
    }

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
                  source={{profileimage}}
                  className='w-14 h-14 bg-slate-300 rounded-full'
                />
              </View>
            </View>
            <View className='flex flex-row mt-6 justify-between gap-2 content-center'>
              <View className='flex flex-col gap-y-2 min-w-[140] max-w-96'>
                <View className='flex-row bg-slate-950 p-3 justify-between rounded-lg'>
                  <EvaluationPointsIcon />
                  <Text className='text-white font-InterMedium'>Wallet</Text>
                  <Text className='text-gray-400 ml-2 font-InterBold'>{walletPoints}</Text>
                </View>
                <View className='flex-row bg-slate-950 p-3 justify-between rounded-lg'>
                <EvaluationPointsIcon />  
                  <Text className='text-white font-InterMedium'>Points</Text>
                  <Text className='text-gray-400 ml-2 font-InterBold'>{correctionPoints}</Text>
                </View>
              </View>
              <View className='flex bg-slate-950 p-4 w-60 gap-y-2 rounded-lg'>
                <Text className='text-white font-InterBold'>Level based progress</Text>
                <View className='flex flex-row justify-between'>
                  <Text className='text-white font-InterMedium'>{curLevel}</Text>
                  <Text className='text-gray-400 font-InterRegular'>{nextLevel}</Text>
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    userContainer: {
        flexDirection: 'row',
        top: 6,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftBox: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        top: 26,
        flex: 2.3,
        right: 4,
        left: 32,
    },
    stats: {
        backgroundColor: '#1E1E1E',
        paddingBottom: 4,
        paddingTop: 10,
        paddingStart: 8,
        paddingEnd: 8,
        borderRadius: 8,
        flexDirection: 'row',
        verticalAlign: 'middle',
        marginBottom: 6
    },
    rightBox: {
        flex: 2.8,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        top: 26,
        right: 32,
        justifyContent: 'spacesbetween'
    },
    level: {
        backgroundColor: '#1E1E1E',
        width: '100%',
        height: 76,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 16,
        flexDirection: 'column',
        borderRadius: 8,
        justifyContent: 'space-between',
    },
    progressbar: {
        width: '100%',
        backgroundColor: 'gray',
        height: 4,
        top: 4,
        borderRadius: 16,
        zIndex: 0,
    }
})