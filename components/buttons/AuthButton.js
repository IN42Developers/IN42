import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DefaultButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
      backgroundColor: '#FFF',
      borderRadius: 100,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 250,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
  },
  text: {
      fontSize: 20,
      color: '#000',
      fontFamily: 'ExtraBold',
  },
});


export default DefaultButton