import React from "react";
import { StyleSheet, TextStyle, View } from "react-native";

import { AntDesign } from '@expo/vector-icons'
import { icons } from "lucide-react-native";

//this is unfortunately not future proof
type LucideIcon = 'Cog' //need to add more shit to this

type AntDesignIconName = keyof typeof AntDesign.glyphMap;
type LucideIconName = keyof typeof icons;

export type In42IconName = AntDesignIconName | LucideIcon; //extend it later with other possible icons

interface IconProps {
    origin: 'custom' | 'antdesign' | 'lucide', //or any other package that we use
    size?: number,
    name: In42IconName | LucideIconName | string,
    style?: TextStyle,
    color?: string,

    //lucidSpecific props
    fillColor?: "none" | string,

}

const In42Icon: React.FC<IconProps> = ({
    origin,
    size=10,
    name="minuscircleo",
    style,
    fillColor="none",
    color='white',
}) => {

    let iconElement;

    switch (origin) {
        case "custom":
            iconElement = null;
            break;
        case 'antdesign':
            iconElement = <AntDesign style={[styles.defaultIconStyle,style,{color:color} ] } size={size} name={name as AntDesignIconName} />
            break;
        case 'lucide':
            const LucideIconComponent = icons[name as LucideIconName];
            if (LucideIconComponent) {
                iconElement = <LucideIconComponent style={[styles.defaultIconStyle, style, { color }]} size={size} color={color} fill={fillColor} />;
            } else {
                iconElement = null; 
            }
            break;
        default:
            iconElement = null;
    }


    return (
    <View>
        {iconElement}
    </View>
    )
}

const styles = StyleSheet.create({
    defaultIconStyle: {
        color: '#999999',
        alignItems: 'center',
        justifyContent: 'center',
    }
})


export default In42Icon;

  