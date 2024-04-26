import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ui, UiText, Color } from '../../constants/Styles';
import { EvaluationPointsIcon } from '../svg/UIIcons';

export default function UserCurrencyContainer({currencyAmount,currencyText,icon=<EvaluationPointsIcon />}) {
    return (
        <View style={[Ui.defaultBox, styles.container]}>
        {icon} 
        <Text style={[ styles.descriptionText]}>{currencyText}</Text>
        <Text style={[ styles.numberText]}>{currencyAmount}</Text>
      </View>  
    )         
}    

styles = StyleSheet.create({
  container: { 
    // flex: 1,  
    backgroundColor: Color.black , // Color.black 
    gap: 3, 
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 3,
    width: 130,
   },
   descriptionText:{
    color: Color.darkGray,
    fontSize: 10,
    top: 1,
   },
   numberText: {
    color: Color.white,
    alignSelf: 'flex-end',
    left: 8,
    bottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
   },

})