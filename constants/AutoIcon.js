import React from 'react';
import { icons } from 'lucide-react-native';

const AutoIcon = ({ name, color, focused }) => {
  const LucideIcon = icons[name];
  const fill = focused ? '#008766' : 'none';
  return <LucideIcon size={24} color={color} fill={fill} />;
};

export default AutoIcon;
