import { StyleSheet, Text, TouchableOpacity, View,Image,ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { GetUserData, getCampusTimeZone } from '../../Utilities/UserData';
import { CalculateRemainingTimePeriod } from '../../Utilities/UserData';
import {useEffect, useState} from 'react'
import { getProjectNameFromID } from '../../Utilities/projectIDMapping';
import LogData, { logType } from '../../Utilities/debugging';

const EvaluationItem = ({data}) => {

  const navigation = useNavigation();
  const [evalString, SetEvalString] = useState('unknown');
  if(data == undefined || data == null || data.dummy == true){
    data={
      name:'<Name>',
      project: 'Project Name>',
      begin_at: '2023-09-13T10:34:51.575Z',
      corrector: 'invisible',
      id: 69,
      team: {
        project_id: '69',
        name: "<TEAMNAME'>",
      },
    }
  }
  useEffect(()=>{
    // cLogData(logType.INFO,data.corrector,',',data.team.name)
    let Userdata = GetUserData();
    LogData(logType.INFO,Userdata.id)
    if(data.corrector == 'invisible' ){
      SetEvalString(`Somebody will evaluate you on ${getProjectNameFromID(data.team.project_id)}`)
    }
    else if(data.corrector.id != Userdata.id){
      SetEvalString(`${data.corrector.login} will evaluate you on ${getProjectNameFromID(data.team.project_id)}`)
    }
    else{
      let teamName = data.team.name.split("'")[0];
      SetEvalString(`You will evaluate ${teamName} on ${getProjectNameFromID(data.team.project_id)}`)
    }

  },[])

  let startDate = new Date(data.begin_at);
  const timezone = getCampusTimeZone();
  let CampusEvalTime = 'TIMEZONE';
  if(timezone != null)
    CampusEvalTime = startDate.toLocaleTimeString("en-US",timezone);
  
  const timeUntilEvalStart = CalculateRemainingTimePeriod(startDate.getTime());
  let past = '';
  if(timeUntilEvalStart.isPast == true)
    past = 'ago'
  let days = '';
  if(timeUntilEvalStart.days != 0)
    days = `${timeUntilEvalStart.days}d`;
  let hours = '';
  if(timeUntilEvalStart.hours != 0)
    hours = `${timeUntilEvalStart.hours}h`;
  let minutes = '';
  if(timeUntilEvalStart.minutes != 0)
    minutes = `${timeUntilEvalStart.minutes}min`;

  const EvalStartTimeString = `${days} ${hours} ${minutes} ${past}`;
  const evalMessage = 'You will evaluate ' + data.name + ' on ' + data.project;


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
    // flexDirection: 'row',
    backgroundColor: '#1C535D',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
    gap: 5,
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
