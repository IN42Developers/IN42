import { View, Image,StyleSheet } from 'react-native'
import React from 'react'

import Logo from '../../../assets/svgs/logo'

const EntryHeader:React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Logo />
      </View>
      <Image
        source={require('../../../assets/images/HeadLayout.png')}
        style={{width: 480, height: 280}}
      />
    </View>
  )
}

const styles= StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
  },
})

export default EntryHeader