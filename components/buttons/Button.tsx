import * as React from 'react';
import { Pressable } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'link';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onPress, variant, children }) => {

  const defaultButtonStyle = 'bg-gray-300 rounded-full active:bg-gray-400';

  const variants = {
    primary: 'bg-gray-300 rounded-full p-4 active:bg-gray-400',
    secondary: 'bg-blue-500 rounded-lg p-4 active:bg-blue-600',
    link: 'text-white bg-gray-800 p-2 rounded-sm'
  };

  const variantStyles = variants[variant] || defaultButtonStyle;

  return (
    <Pressable onPress={onPress} className={`${variantStyles}`}>
      {children}
    </Pressable>
  )
}