import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ui, Color } from '../../styles/generalStyles/Styles';
import { EvaluationPointsIcon } from '../../../assets/svgs/UIIcons';

type Props = {
  currencyAmount: string | number | null | undefined,
  currencyText: string | number | null | undefined,
  icon?: any,
}

const UserCurrencyContainer:React.FC<Props> = ({
    currencyAmount = "0000",
    currencyText = "0000",
    icon=<EvaluationPointsIcon />
}) => {

    if(currencyAmount == null)
      currencyAmount = "0000";
    if(currencyText == null)
      currencyText = "0000";
    return (
      <View style={styles.container}>
        <View style={styles.secondaryContainer}>
            {icon} 
            <Text style={styles.descriptionText}>{currencyText}</Text>
        </View>
        <Text style={styles.currencyText}>{currencyAmount}</Text>
      </View>

    )         
}    

const styles = StyleSheet.create({
  container: { 
    paddingLeft: 12,
    paddingVertical: 8,
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    // borderColor: 'red',
    // borderWidth: 1,
    
  },
  secondaryContainer: {
    flexDirection: 'row',
  },
   descriptionText: {
    color: 'lightgray',
    fontFamily: 'Inter_700Bold',
    paddingTop: 2,
    marginLeft: 12,
  },
   valueText: {
    color: Color.white,
    alignSelf: 'flex-end',
    fontSize: 14,
    fontWeight: 'bold',
   },
   currencyText: {
    color: 'white',
    marginLeft: 8,
    fontFamily: 'Inter_700Bold',
    marginTop: 2,
    paddingRight: 12 
  }
})

export default UserCurrencyContainer;