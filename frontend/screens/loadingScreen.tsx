import { View,StyleSheet,Text,SafeAreaView } from "react-native"

const LoadingScreen = () => {

    return (
        <SafeAreaView>
            <View style = {styles.container}>
                <Text>Loading...</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default LoadingScreen;