import { View, Image } from 'react-native'
import React from 'react'

import Logo from '../svg/logo'

const EntryHeader = () => {
  return (
    <View className='flex items-center justify-center'>
      <View className='flex-col items-center absolute z-10'>
        <Logo />
      </View>
      <Image
        source={require('../../assets/images/HeadLayout.png')}
        style={{width: 480, height: 280}}
      />
    </View>
  )
}

export default EntryHeader