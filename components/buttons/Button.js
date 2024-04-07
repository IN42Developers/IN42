import * as React from 'react';
import { Text, Pressable} from 'react-native';

export const Button = ({ onPress, variant, children }) => {

  const variants = {
    primary: 'bg-gray-300 p-4 rounded-full active:bg-gray-400',
    secondary: 'bg-blue-500 p-4 rounded-lg active:bg-blue-600',
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <Pressable onPress={onPress} className={`${variantStyles}`}>
      {children}
    </Pressable>
  )
}