import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { GetUserData } from '../../Utilities/UserData'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NoCoalitionIcon from '../svg/NoCoalitionIcon';
import { EvaluationPointsIcon } from '../svg/UIIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserInfoCard() {
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
    const UserData = GetUserData();
    const insets = useSafeAreaInsets();
    let displayname = 'Long display name';
    let login = 'intra login';
    let profileimage = '';
    let walletPoints = -1;
    let correctionPoints = -1;
    let curLevel = 'Current Level';
    let nextLevel = -1;
    if(UserData != null) {
        displayname = UserData.displayname;
        login = UserData.login;
        profileimage = UserData.image.versions.small;
        walletPoints = UserData.wallet;
        correctionPoints = UserData.correction_point;
        curLevel = UserData.level;
        nextLevel = UserData.level + 1;
    }

    // Image: source={require('../../assets/images/userInfoCard.png')}

    /*
    <View id='Rechts: Level' style={styles.rightBox}>
                            <View id='Level based progress' style={styles.level}>
                                <Text style={{ color: '#e8e8e8', fontSize: 12, fontWeight: 'bold', }}>LEVEL BASED PROGRESS</Text>
                                <View id='Current and next level' style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'white', fontSize: 11 }}>{curLevel}</Text>
                                    <Text style={{ color: 'white', fontSize: 11 }}>LEVEL 4</Text>
                                </View>
                                <View id='Progress bar' style={styles.progressbar}>
                                    <View id='Progress made' style={{ width: '35%', backgroundColor: 'white', zIndex: 1, height: 4 }} />
                                </View>
                            </View>
                        </View>
                    </View>
    */

    return (
      <View className='flex bg-blue-600 justify-center'>
        <SafeAreaView className='flex-col mx-4'>
          <View className='flex flex-col'>
            <Text className='text-white text-lg font-InterSemibold'>{displayname}</Text>
            <Text className='text-white text-sm font-InterRegular'>{login}</Text>
          </View>
          <View className='flex'>
            <View className='flex flex-col mt-4 bg-slate-950 p-4 justify-center items-center rounded-2xl'>
              <Text className='text-white'>Wallet</Text>
            </View>
            <View className='flex flex-col mt-2 bg-slate-950 p-4 justify-center items-center rounded-2xl'>
              <Text className='text-white'>Balance</Text>
            </View>
          </View>
        </SafeAreaView>
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
