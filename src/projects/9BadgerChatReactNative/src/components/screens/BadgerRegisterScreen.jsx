import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";

function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        <Text>Username</Text>
        <TextInput
            style={styles.input}
            onChangeText={text => setUsername(text)}
        ></TextInput>
        <Text>Password</Text>
        <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={text => setPassword(text)}
        ></TextInput>
        <Text>Confirm Password</Text>
        <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={text => setConfirmPassword(text)}
        ></TextInput>
        <Button
            color="crimson"
            title="Signup"
            onPress={() => props.handleSignup(username, password, confirmPassword)} />
        <Button
            color="grey"
            title="Back"
            onPress={() => props.setIsRegistering(false)} />
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default BadgerRegisterScreen;