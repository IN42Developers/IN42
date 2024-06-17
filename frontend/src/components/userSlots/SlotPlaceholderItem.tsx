import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import { SlotChunk } from '../../types/customTypes';

interface SlotPlaceHolderProps {
  data: SlotChunk,
  style: ViewStyle,
}

//a simple component that fills rows in a SlotContainer
const SlotPlaceholderItem:React.FC<SlotPlaceHolderProps> = ({data,style}) => {


  return (
    <TouchableOpacity style={[styles.button,style]} onPress={() => null}> 
      <View style={styles.container}>
       <Text style={styles.titleText}>{'....'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
    borderRadius: 3,
    borderColor: '#159BA5',
    borderWidth: 1.5,
    height: 50,
  },
  container: {
    flex: 1,
    // backgroundColor: '#1C535D',
    alignItems: 'center',
    justifyContent: "center",
  },
  titleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
});

export default SlotPlaceholderItem;
