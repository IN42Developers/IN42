import { LinearGradient } from "expo-linear-gradient";

export const Gradient = () => {
   return (
      <LinearGradient
         colors={[rgba(255, 255, 255, 1), rgba(247, 247, 247, 0.81), rgba(217, 217, 217, 0.1)]}>
      </LinearGradient>
   )
}

export const Color = {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#f5f5f5',
    text: '#333333',
    white: '#ffffff',
    black: '#000000',
    gray: '#c5c5c5',
    darkGray: '#7C7C7C',
  };

  export const Ui = {
   Container: {
      marginHorizontal: 16,
      flexDirection: 'row',
   },
   defaultBox: {
      borderRadius: 8,
   },
  }