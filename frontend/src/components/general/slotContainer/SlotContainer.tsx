import { View,Text, ScrollView,TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SlotPlaceholderItem from "../../userSlots/SlotPlaceholderItem";

const containerPadding = 3;
const columns = 3;
const elementMargin = 1; //in percent
const elementMarginRatio = elementMargin * 2 * columns;

interface SlotContainerProps {
    title?: String,
    onDetailPressed: () => void ,
    ComponentData: any[],
    ChildComponent: any,
}

const SlotContainer:React.FC<SlotContainerProps> = ({ title='Title', onDetailPressed=null, ComponentData=[], ChildComponent }) => {

    let renderButton = true;
    if(onDetailPressed === null || onDetailPressed === undefined){
        renderButton = false;
    }

    //not sure if its teh greatest idea
    //important to fill up teh array with shadow data;
    let id = 0;
    while(ComponentData.length == 0 ||ComponentData.length % 3 != 0){
        ComponentData.push({id: id++,type: 'shadow'});
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
                {renderButton ?
                <TouchableOpacity style={styles.button} onPress={()=>onDetailPressed}>
                    <Text style={styles.buttonText}>...</Text>
                </TouchableOpacity>
                :
                null
                }
            </View>
            <FlatList
            showsVerticalScrollIndicator={false}
            // animated={false}
            numColumns={columns}
            data={ComponentData}
            renderItem={({item}) =>(
                item.type == 'slotChunk' ?
                <ChildComponent key={item.id} data={item} style={{width: (100-containerPadding-elementMarginRatio) / columns + '%',margin: elementMargin +'%',}}></ChildComponent>
                :
                <SlotPlaceholderItem key={item.id} data={item} style={{width: `${(100-containerPadding-elementMarginRatio) / columns }%`,margin: `${elementMargin}%`,}}></SlotPlaceholderItem>
                )}>
            
            </FlatList>
        </View>
    )
}



const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: `${containerPadding}%`,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingBottom: 10,
        // backgroundColor: '#202020'
    },
    headerText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    element: {
        color: 'white',
        fontSize: 20,
        // backgroundColor: '#131313',
    },
    button:{
        // backgroundColor: '#303030',
    },
    buttonText:{
        fontSize: 22,
        verticalAlign: 'top',
        color: 'white',
        fontWeight: 'bold',
        bottom: 3,
    },  
})

export default SlotContainer;