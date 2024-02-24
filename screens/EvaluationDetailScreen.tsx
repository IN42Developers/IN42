import { View,StyleSheet,Text,SafeAreaView,TouchableOpacity } from "react-native"
import React, { useEffect, useState } from 'react'
import { Ui, UiText, Color } from "../constants/Styles"


export default function EvaluationDetailScreen() {


    return (
        <View  style={styles.container}>
            <Text style={[UiText.bold, { fontSize: 20, color: Color.white, marginLeft: 16 }]}>Feature not implemented</Text>
            <Text style={[UiText.medium,  { fontSize: 12, color: Color.white, marginLeft: 16, marginTop: 8 }]}>Evaluation Details are not available.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})