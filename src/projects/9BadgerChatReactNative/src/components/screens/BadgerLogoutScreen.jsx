import { Alert, Button, StyleSheet, Text, View } from "react-native";
import * as SecureStore from 'expo-secure-store';

function BadgerLogoutScreen(props) {

    // Step 6: remove JWT
    const removeToken = async () => {
        try {
            await SecureStore.deleteItemAsync("jwtToken");
        } catch (error) {
            console.error("Error removing token:", error);
        }
    };

    // Step 6: log out
    function handleLogout() {
        if (props.isGuest) {
            props.setIsLoggedIn(false);
            props.setIsRegistering(true);
        } else {
            removeToken();
            props.setIsLoggedIn(false);
            Alert.alert("Logged out successfully");
        }
    };

    return <View style={styles.container}>
        <Text style={{ fontSize: 24, marginTop: -100 }}>Are you sure you're done?</Text>
        <Text>Come back soon!</Text>
        <Text />
        {/* Step 6: logout */}
        <Button title="Logout" color="darkred" onPress={handleLogout} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: "50%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});

export default BadgerLogoutScreen;