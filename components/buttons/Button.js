import * as React from 'react';
import { Pressable } from 'react-native';

export const Button = ({ onPress, variant, children }) => {

  const defaultButtonStyle = 'bg-gray-300 rounded-full active:bg-gray-400';

  const variants = {
    primary: 'bg-gray-300 rounded-full active:bg-gray-400',
    secondary: 'bg-blue-500 rounded-lg active:bg-blue-600',
  };

  const variantStyles = variants[variant] || defaultButtonStyle;

  return (
    <Pressable onPress={onPress} className={`p-4 ${variantStyles}`}>
      {children}
    </Pressable>
  )
}