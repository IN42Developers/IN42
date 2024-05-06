import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { StyleSheet } from "react-native";
import EmptyContainerItem from "../buttons/EmptyContainerItem";
import { AntDesign } from '@expo/vector-icons';

const ListContainer = ({ title='Title', onDetailPressed=null ,detailIcon='plus',containerStyle=styles.container, ComponentData=[],emptyListComponent=<EmptyContainerItem text='Nothing going on here' icon='calendar'/>, ChildComponent }) => {
  
    let renderButton = true;
    if(onDetailPressed === null || onDetailPressed === undefined){
        renderButton = false;
    }

    return(
        <View style={containerStyle}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
                {renderButton ?
                <TouchableOpacity style={styles.button} onPress={onDetailPressed}>
                    {/* <Text style={styles.buttonText}>...</Text> */}
                    <AntDesign name={detailIcon} color={'white'} size={20}></AntDesign>
                </TouchableOpacity>
                :
                null
                }
            </View>
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