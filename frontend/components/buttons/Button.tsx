import * as React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ButtonProps {
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'link' | 'dialog' | 'dialogWithBorder';
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({ onPress, variant, children, style }) => {

  const defaultButtonStyle: ViewStyle = {
    backgroundColor: '#CCCCCC',
    padding: 16,
    borderRadius: 999,
  };

  const variants: Record<string, ViewStyle> = {
    primary: {
      backgroundColor: '#CCCCCC',
      padding: 16,
      borderRadius: 999,
    },
    secondary: {
      backgroundColor: '#0055FF',
      padding: 16,
      borderRadius: 16,
    },
    link: {
      backgroundColor: '#008891',
      paddingVertical: 18,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    dialog: {
      backgroundColor: '#212121',
      paddingVertical: 20,
      paddingHorizontal: 16,
      width: 110,
    },
  };

  const variantStyles = variants[variant] || defaultButtonStyle;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.button, variantStyles, style]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', columnGap: 8 }}>{children}</View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
