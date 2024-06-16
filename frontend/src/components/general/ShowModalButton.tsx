import { View,Text,TouchableOpacity, Modal, Button,StyleSheet } from "react-native";
import EvaluationSlotPicker from "../userSlots/EvaluationSlotPicker";
import React from 'react'
import BlurOverlay from "./BlurOverlay";
import LogData, { logType } from "../../utils/debugging/debugging";

 const ShowModalButton: React.FC = () => {
    const [mainModalVisible, setMainModalVisible] = React.useState(false);
    const [isBlurred, setIsBlurred] = React.useState(false);

    const ButtonPressed = (): void => {
        LogData(logType.INFO,"pressed fucking button")
        setMainModalVisible(true)
    }

    const deactivate = (): void => {
        LogData(logType.INFO,"pressed Cancel from other screen")
        setMainModalVisible(false)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={ButtonPressed}>
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
            <Modal transparent={true} visible={mainModalVisible}>
                <EvaluationSlotPicker modalVisible={mainModalVisible} onDismissModal={deactivate}></EvaluationSlotPicker>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        // flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 36,
        paddingRight:10,
    },
})

export default ShowModalButton;