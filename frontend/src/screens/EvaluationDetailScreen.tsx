import React from 'react'
import { Text, View, StyleSheet } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'


const EvaluationDetailScreen:React.FC = () => {

  const { t } = useTranslation();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>{t('title_evaluations')}</Text>
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