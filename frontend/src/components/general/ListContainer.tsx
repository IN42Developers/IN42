import { View, Text, TouchableOpacity, FlatList, ViewStyle } from "react-native"
import { StyleSheet } from "react-native";
import EmptyContainerItem from "./EmptyContainerItem";
import LogData, { logType } from "../../utils/debugging/debugging";
import In42Icon from "./ui_basic/In42Icon";

interface ListContainerProps {
    title?: String,
    headerStyle?: 'full'|'title'|'collapsed',
    detailIcon?: String,
    onDetailPressed?: () => void,
    ChildComponent?: React.FC<{ data: any }>,
    ComponentData?: any[],
    emptyListComponent?: React.FC,
    containerStyle?: ViewStyle,
}


const ListContainer:React.FC<ListContainerProps> = ({
    title = 'Title',
    onDetailPressed = () =>{ LogData(logType.INFO,"Pressed DetailButton") },
    detailIcon = 'plus',
    containerStyle = styles.container,
    ComponentData = [],
    emptyListComponent = <EmptyContainerItem text='Nothing going on here' icon='calendar'/>,
    headerStyle = 'title',
    ChildComponent,
    }) => {
  

    return(
        <View style={containerStyle}>
            { headerStyle != 'collapsed' &&
                <View style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
                { headerStyle != 'title' &&
                <TouchableOpacity style={styles.button} onPress={onDetailPressed}>
                    <In42Icon origin={'antdesign'} name={detailIcon} color={'white'} size={20}></In42Icon>
                </TouchableOpacity>
                }
            </View>
            }
            <FlatList
            showsVerticalScrollIndicator={false}
            animated={false}
            data={ComponentData}
            renderItem={({item}) =>( 
                <ChildComponent key={item.id} data={item} ></ChildComponent>
            )}
            ListEmptyComponent={() =>(emptyListComponent)}
            />
        </View>
    )
}

export default ListContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1.3,
        // backgroundColor: 'grey',
        // paddingVertical: 5,
        paddingHorizontal: 16,
        marginTop: 12
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingBottom: 10,
        margin: 0
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        fontSize: 22,
        verticalAlign: 'top',
        color: 'white',
        fontWeight: 'bold',
        bottom: 3,
    },  
})