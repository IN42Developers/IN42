import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import In42Icon from './ui_basic/In42Icon';

interface EmptyContainerItemProps {
  text: string,
  icon: string,
}


const EmptyContainerItem: React.FC<EmptyContainerItemProps> = ({
  text = "Its very Empty here",
  icon = "calendar",
}) => {


  return (
      <View style={styles.container}>
        <In42Icon origin={'antdesign'} name={icon} color={'#606060'} size={24}></In42Icon>
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
