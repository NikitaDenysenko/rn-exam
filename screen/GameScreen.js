import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    FlatList,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Input from "../components/Input";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import DefaultStyles from "../constants/default-styles";

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [direction, setDirection] = useState("");
    const [pastGuesses, setPastGuesses] = useState([enteredValue.toString()]);

    const { randomNumber, onGameOver } = props;

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ""));
    };

    const nextGuessHandler = () => {
        if (enteredValue > randomNumber) {
            setDirection("greater");
        }
        if (enteredValue < randomNumber) {
            setDirection("lower");
        }
        console.log(randomNumber);
        console.log(enteredValue);
        if (enteredValue == randomNumber) {
            onGameOver(pastGuesses.length);
        }
        setPastGuesses((curPastGuesses) => [
            enteredValue.toString(),
            ...curPastGuesses,
        ]);
    };

    let listContainerStyle = styles.listContainer;

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Your Guess is {direction} then guessed</Text>
            <Input
                style={styles.input}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
            />
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this)}>
                    Try To Guess
                </MainButton>
            </Card>
            <View style={listContainerStyle}>
                <FlatList
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
        width: 400,
        maxWidth: "90%",
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "80%",
    },
    listContainer: {
        flex: 1,
        width: "60%",
    },
    listContainerBig: {
        flex: 1,
        width: "80%",
    },
    list: {
        flexGrow: 1,
        justifyContent: "flex-end",
    },
    listItem: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    input: {
        width: 50,
        textAlign: "center",
    },
});

export default GameScreen;
