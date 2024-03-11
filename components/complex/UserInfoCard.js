import React from 'react'
import { View, Text, Image, StyleSheet, ImageBackground, SafeAreaView, Dimensions } from 'react-native'
import { GetUserData } from '../../Utilities/UserData'
import { Ui, UiText, Color } from '../../constants/Styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NoCoalitionIcon from '../svg/NoCoalitionIcon';
import { EvaluationPointsIcon } from '../svg/UIIcons';

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

    return (
        <View style={styles.container}>
            <ImageBackground style={{ width: screenWidth + 20, height: screenHeight / 3.35, bottom: 12 }} source={require('../../assets/images/userInfoCard.png')} resizeMode='cover' >
                <SafeAreaView style={{ alignItems: 'center' }}>
                    <View style={styles.userContainer}>
                        <View id='Coalition content' style={{ top: 4 }}>

                        </View>
                        <View id='About username and loginname' style={{ top: 4, flex: 1, left: 32 }}>
                            <Text style={{ fontSize: 18, color: 'white' }}>{displayname}</Text>
                            <Text style={{ fontSize: 14, color: '#D3D3D3' }}>{login}</Text>
                        </View>
                        <View id='Profile image'>
                            <Image src={profileimage} style={{ width: 60, height: 60, borderRadius: 50, bottom: 4, right: 32, top: 6 }} />
                        </View>
                    </View>

                    <View id='Box Container' style={{ flexDirection: 'row' }}>
                        <View id='Links: Wallet, Evaluations' style={styles.leftBox}>
                            <View id='Wallet' style={styles.stats}>
                                <EvaluationPointsIcon />
                                <Text style={{ color: 'white', marginHorizontal: 5, fontSize: 11 }}>POINTS</Text>
                                <Text style={{ color: '#D3D3D3', fontSize: 14, left: 4, bottom: 2, paddingRight: 2 }}>{walletPoints}</Text>
                            </View>
                            <View id='Evaluations' style={styles.stats}>
                                <EvaluationPointsIcon />
                                <Text style={{ color: 'white', marginHorizontal: 5, fontSize: 11 }}>POINTS</Text>
                                <Text style={{ color: '#D3D3D3', fontSize: 14, fontWeight: 'bold', left: 4, bottom: 2, paddingRight: 8 }}>{correctionPoints}</Text>
                            </View>
                        </View>
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
                </SafeAreaView> 
            </ImageBackground>
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
