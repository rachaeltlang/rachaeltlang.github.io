import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";

function BadgerLoginScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
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
        <Button
            color="crimson"
            title="Login"
            onPress={() => {
                props.handleLogin(username, password)
            }} />
        <Text>Need to register?</Text>
        <Button
            color="grey"
            title="Signup"
            onPress={() => props.setIsRegistering(true)} />
        {/* Step 7: guest login */}
        <Button
            color="grey"
            title="Continue as Guest"
            onPress={() => props.loginAsGuest(true)} />
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

export default BadgerLoginScreen;