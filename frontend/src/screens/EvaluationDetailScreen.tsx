import React from 'react'
import { Text, View, StyleSheet } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIn42Store } from '../services/state/store'


const EvaluationDetailScreen:React.FC = () => {

  const languageObject = useIn42Store((store)=> store.language)

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>{languageObject.title_evaluations}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    justifyContent: "center",
    alignItems: 'center',
  },
  text:{
    color: 'white',
  },
})

export default EvaluationDetailScreen