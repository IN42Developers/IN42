import { View,Text,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'

export default function NavigateBackButton({size=30}) {
    const navigation = useNavigation();

    const onPress =() => {
        navigation.goBack();
    }

    return (
        <TouchableOpacity onPress={onPress} style={{flex:1,}}>
            <AntDesign name={'left'} size={size} color={'white'}></AntDesign>
        </TouchableOpacity>
    )
}