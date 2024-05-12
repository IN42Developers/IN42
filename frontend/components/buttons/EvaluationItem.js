import { StyleSheet, Text, TouchableOpacity, View,Image,ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { GetUserData, getCampusTimeZone } from '../../Utilities/UserData';
import { CalculateRemainingTimePeriod } from '../../Utilities/UserData';
import {useEffect, useState} from 'react'
import { getProjectNameFromID } from '../../Utilities/projectIDMapping';
import LogData, { logType } from '../../Utilities/debugging';
import { formatEvaluationMessageString, formatEvaluationTimeString } from '../../Utilities/evaluation_utilities';

const EvaluationItem = ({data}) => {

  const navigation = useNavigation();
  const [evalString, SetEvalString] = useState('unknown');
  if(data == undefined || data == null || data.dummy == true){
    return null;
  }
  useEffect(()=>{
    SetEvalString(formatEvaluationMessageString(data))
  },[])

  const startDate = new Date(data.begin_at);
  const CampusEvalTime = startDate.toLocaleTimeString("en-US",getCampusTimeZone());
  const EvalStartTimeString = formatEvaluationTimeString(data.begin_at);



  const ShowDetails = () =>{
    LogData(logType.INFO,'trying to navigate')
    navigation.navigate("EvaluationDetailScreen",{ evalData: data  });
  }

  return (
    <TouchableOpacity style={styles.button} onPress={ShowDetails} disabled={true}>
      <View style={styles.container}>
        <Text style={styles.timerText}>{CampusEvalTime} {EvalStartTimeString}</Text>
        <Text style={styles.titleText}>{evalString}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 2,
    overflow: 'hidden',
    borderRadius: 3,
    borderColor: '#159BA5',
    borderWidth: 1.5,
    height: 65,
  },
  container: {
    flex: 1,
    backgroundColor: '#1C535D',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  titleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  timerText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold'
  },
});

export default EvaluationItem;
