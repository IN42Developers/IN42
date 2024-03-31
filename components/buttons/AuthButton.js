import * as React from 'react';
import { Text, Pressable } from 'react-native';

const DefaultButton = ({ title, onPress }) => {

  return (
      <Pressable onPress={onPress} className='w-full h-16 bg-slate-300 active:bg-slate-300/70 rounded-full justify-center'>
          <Text className='font-InterBold text-2xl text-center'>{title}</Text>
      </Pressable>
  )
};

export default DefaultButton