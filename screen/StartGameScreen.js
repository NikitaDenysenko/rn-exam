import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";

import Card from "../components/Card";
import MainButton from "../components/MainButton";
const StartGameScreen = (props) => {
    const [confirmed, setConfirmed] = useState(true);

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get("window").width / 4);
        };

        Dimensions.addEventListener("change", updateLayout);
        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        };
    });

    let confirmedOutput;

    if (confirmed) {
        const randomNumber = Math.floor(Math.random() * 100)
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <MainButton onPress={() => props.onStartGame(randomNumber)}>
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={30}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                >
                    <View style={styles.screen}>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
});

export default StartGameScreen;
