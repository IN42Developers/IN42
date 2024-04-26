import { getUserCursus } from "../../Utilities/UserData";
import { View, Text,StyleSheet } from 'react-native';
import { Ui, UiText, Color } from '../../constants/Styles';
import * as Progress from 'react-native-progress'

export default function UserProgressBar() {

    const cursus = getUserCursus();

    let level = -1;
    let nextLevel = -1;
    let progressIndicator = -1;

    if(cursus != null) {
        level = Math.floor(cursus.level);
        nextLevel = Math.floor(cursus.level + 1);  
        progressIndicator = Math.ceil(cursus.level);
      }   
    
    return (
        <View style={[Ui.defaultBox, styles.container]}>
          <Text style={[UiText.bold, { color: Color.gray, fontSize: 8, marginTop: 2 }]}>LEVEL BASED PROGRESS</Text>
          <View style={[Ui.defaultBox, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={[UiText.medium, { color: Color.gray, marginTop: 5 }]}>LEVEL {level}</Text>
            <Text style={[UiText.medium, { color: Color.darkGray, marginTop: 5 }]}>LEVEL {nextLevel}</Text>
          </View>
          <View style={[Ui.defaultBox, { backgroundColor: Color.darkGray, height: 5, width: '100%', borderRadius: 8, marginTop: 8}]}>
            <Progress.Bar progress={progressIndicator} color="white" unfilledColor='blue' style={[Ui.defaultBox, { height: 5 }]}></Progress.Bar>
          </View>
        </View>  
    ) 
}    
 
  
styles = StyleSheet.create({
    container:{
        backgroundColor: '#000', //Color.black
        paddingHorizontal: 10, 
        paddingTop: 5,
        paddingBottom: 10,
        width: '100%', 
        // height: 81, 
    },
  })