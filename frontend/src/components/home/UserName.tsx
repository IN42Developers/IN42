import { Text, View, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { GetUserData } from "../../utils/UserData";
import { UserData } from "../../types/UserDataTypes";

interface UserNameProps {
    nameStyle?: TextStyle,
    slugStyle?: TextStyle,
}


const UserName: React.FC<UserNameProps> = ({
    nameStyle={ color: 'white', fontFamily: 'Inter_700Bold' },
    slugStyle = { color: 'white', fontFamily: 'Inter_400Regular'}
}) => {

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

    return(
        <View >
            <Text style={[styles.defaultNameStyle, nameStyle]}>{displayname}</Text>
            <Text style={[styles.defaultSlugStyle ,slugStyle]}>{login}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    defaultNameStyle: { color: 'white', fontFamily: 'Inter_700Bold' },
    defaultSlugStyle: { color: 'white', fontFamily: 'Inter_400Regular'},
})

export default UserName;