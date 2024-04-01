import * as React from 'react';
import { Text, Pressable} from 'react-native';

export const DefaultButton = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} className='p-4 bg-slate-300 active:bg-slate-300/70 rounded-full'>
      <Text className='font-InterBold text-2xl text-center'>{title}</Text>
    </Pressable>
  )
}