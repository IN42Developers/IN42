import { View, Image, StyleSheet } from 'react-native'
import { UserData } from '../../types/UserDataTypes';
import { GetUserData } from '../../utils/UserData';

type AvatarProps = {
    width?: number,
    height?: number,
}

const Avatar: React.FC<AvatarProps> = ({
    width = 56,
    height= 56,
}) => {

    const UserData: UserData = GetUserData();
    let profileimage = require('../../../assets/images/profilePlaceholder.png')
    if (UserData != null) {
        profileimage ={uri: UserData.image.versions.small};
    }
    return (
        <Image source={profileimage} style={[style.imageStyle,{width: width,height: height }]}/>
    )
}

const style = StyleSheet.create({
    imageStyle:{
        backgroundColor: 'rgb(203, 213, 225)',
        borderRadius: 2000,  
    }
})

export default Avatar;