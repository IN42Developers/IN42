import { View,Text,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import In42Icon from "./ui_basic/In42Icon";

export default function NavigateBackButton({size=30}) {
    const navigation = useNavigation();

    const onPress =() => {
        navigation.goBack();
    }

    return (
        <TouchableOpacity onPress={onPress} style={{flex:1,}}>
            <In42Icon origin={'antdesign'} name={'left'} size={size} color={'white'}></In42Icon>
        </TouchableOpacity>
    )
}