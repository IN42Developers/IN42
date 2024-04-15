import React from 'react'
import { Text, View } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'


const EvaluationDetailScreen = () => {
  return (
    <SafeAreaView>
      <View className='justify-center items-center mt-12'>
        <Text className="text-2xl font-InterSemibold text-white">Evaluations</Text>
      </View>
    </SafeAreaView>
  )
}

export default EvaluationDetailScreen