import React from 'react';
import { View } from 'react-native';
import { BlurView } from 'expo-blur';

const BlurOverlay = ({ visible }) => {
  if (!visible) return null;

  return (
    <BlurView
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      tint='dark'
      intensity={40}
    />
  );
};

export default BlurOverlay;
