import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

const RoundedDescriptor = ({ title='temp',scale=1,IconName='minuscircleo' }) => {
    let ItemWidth = title.length * 20 * scale;
    let minWidth = 50;
    if(ItemWidth < minWidth)
        ItemWidth = minWidth; 
    const ItemHeight = 42 * scale;
    const IconSize = 28 * scale ;
    const TextSize = 16 * scale;
    const PaddingR = 7 * scale;
  return (
    <View style={[styles.view, { width: ItemWidth, height: ItemHeight}]}>
        <AntDesign style={[styles.icon, {paddingRight:PaddingR  }] }
        size={IconSize} 
        name={IconName}>
        </AntDesign>
        <Text style={[styles.text, { fontSize:TextSize}]}>{title}</Text>
    </View>
  )
}

export default RoundedDescriptor

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    backgroundColor: '#181818',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  view2:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon:{
    color: '#999999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#999999',
    textTransform: 'uppercase',
    fontFamily: 'ExtraBold',
  },
});

