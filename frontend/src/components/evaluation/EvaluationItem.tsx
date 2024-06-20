import { StyleSheet, Text, TouchableOpacity, View,Image,ImageBackground } from 'react-native';
import React from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { GetUserData, getCampusTimeZone } from '../../utils/UserData';
import {useEffect, useState} from 'react'
import { getProjectNameFromID } from '../../utils/events/projectIDMapping';
import LogData, { logType } from '../../utils/debugging/debugging';
import { formatEvaluationMessageString, formatEvaluationTimeString } from '../../utils/evaluation_utilities';

interface EvaluationItemProps {
  data: any,
}


const EvaluationItem:React.FC<EvaluationItemProps> = ({data}) => {

  const navigation: NavigationProp<ParamListBase> = useNavigation();
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
