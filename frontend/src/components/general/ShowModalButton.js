import { View,Text,TouchableOpacity, Modal, Button,StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'
import EvaluationSlotPicker from "../userSlots/EvaluationSlotPicker";
import React from 'react'
import BlurOverlay from "./BlurOverlay";
import LogData, { logType } from "../../utils/debugging/debugging";

export default function ShowModalButton() {
    const [mainModalVisible, setMainModalVisible] = React.useState(false);
    const [isBlurred, setIsBlurred] = React.useState(false);

    const ButtonPressed = () => {
        LogData(logType.INFO,"pressed fucking button")
        setMainModalVisible(true)
    }

    const deactivate = () => {
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