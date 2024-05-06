import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image,ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const EmptyContainerItem = ({text,icon}) => {


  return (
      <View style={styles.container}>
        <AntDesign name={icon} color={'#606060'} size={24} />
        <Text style={styles.titleText}>{text}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    overflow: 'hidden',
    borderRadius: 10,
    borderColor: '#606060',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    gap: 10,
    height: 90,
  },
  titleText: {
    color: '#606060',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EmptyContainerItem;
