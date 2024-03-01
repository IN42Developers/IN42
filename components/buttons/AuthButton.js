import * as React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DefaultButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
      backgroundColor: '#F4F4F4',
      borderRadius: 100,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 250,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
  },
  text: {
      ...Platform.select({
          ios: {
              fontSize: 20,
              color: '#1e1e1e',
              fontWeight: '700',
          },
          android: {
              fontSize: 20,
              color: '#1e1e1e',
              fontWeight: '600',
          },
      }),
  },
});


export default DefaultButton