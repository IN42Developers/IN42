import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import In42Icon, {In42IconName} from './ui_basic/In42Icon';

interface RoundedDescriptorProps {
  title: string,
  scale?: number,
  IconName?: In42IconName,
}

const RoundedDescriptor:React.FC<RoundedDescriptorProps> = ({
   title='temp',
   scale=1,
   IconName='minuscircleo'
   }) => {
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
      <In42Icon origin={'antdesign'} style={{paddingRight:PaddingR  }} size={IconSize} name={IconName}/>
      <Text style={[styles.text, { fontSize:TextSize}]}>{title}</Text>
    </View>
  )
}

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
  text: {
    fontSize: 16,
    color: '#999999',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default RoundedDescriptor
