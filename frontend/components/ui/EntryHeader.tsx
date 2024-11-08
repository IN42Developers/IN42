import { View, Image } from 'react-native'
import React from 'react'

import Logo from '../svg/logo'

const EntryHeader = () => {
  return (
    <View style={{ display: 'flex', flex: 0, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'column', alignItems: 'center', position: 'absolute', zIndex: 10 }}>
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