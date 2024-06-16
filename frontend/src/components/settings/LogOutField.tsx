import React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import Avatar from '../home/Avatar';
import { Button } from '../general/Button';
import { LogOutIcon } from 'lucide-react-native';
import { setAccessToken, setKeyValuePair } from '../../utils/TokenStorage';
import LogData, { logType } from '../../utils/debugging/debugging';
import { AuthContext } from '../../../Context';
import { GetUserData } from '../../utils/UserData';
import { UserData } from '../../types/UserDataTypes';
import UserName from '../home/UserName';
import { useTypedTranslation } from '../../hooks/useTypedTranslation';
import In42Icon from '../general/ui_basic/In42Icon';

const LogOutField: React.FC = () => {

    const {Logout} = React.useContext(AuthContext);
    const { t } = useTypedTranslation();
    
    const UserData:UserData | null = GetUserData();
    let displayname = 'Long display name';
    let login = 'intra login';
    
    if (UserData != null && typeof UserData === 'object') {
        displayname = UserData.displayname;
        login = UserData.login;
        } else {
        displayname = 'User';
        login = 'username';
        }
        
    const LogoutUser =  async () => {
        await setKeyValuePair('AccessToken', '');
        setAccessToken(null);
        LogData(logType.INFO,'Logout button pressed!');
        Logout();
    
      } 


    return(
            <View style={styles.container}>
                <View style={styles.userContainer}>
                    <View style= {{ marginRight: 24 }}>
                        <Avatar width={52} height={52}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <UserName 
                        nameStyle={ { fontSize: 16 }} 
                        slugStyle={ {color: 'lightgray', fontFamily: 'Inter_500Medium', fontSize: 12, marginBottom: 24, marginTop: 2 }}/>
                        <Button onPress={LogoutUser} variant='link'>
                            <In42Icon origin={'lucide'} name={"LogOut"} size={20} color={'#1E1E1E'}></In42Icon>
                            <Text style={{ color: '#1E1E1E', fontSize: 16, fontFamily: 'Inter_900Black' }}>{t('settings_logout')}</Text>
                        </Button>
                    </View>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: { borderColor: '#008891', borderWidth: 1, padding: 32, borderRadius: 16 },
    userContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    buttonContainer: { flexDirection: 'column', justifyContent: 'center' },
})


export default LogOutField;