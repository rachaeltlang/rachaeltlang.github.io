import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Switch, ScrollView } from "react-native";
import { usePreferences } from "../PreferencesContext";

const BadgerPreferencesScreen = () => {
    const { preferences, togglePreference } = usePreferences();

    return (
        <View style={styles.container}>
            <ScrollView>
                {Object.keys(preferences).map((tag) => (
                    <View key={tag}>
                        <Text>{tag}</Text>
                        <Switch
                            trackColor={{ true: 'darksalmon', false: 'lightgrey' }}
                            thumbColor={preferences[tag] ? 'crimson' : 'grey'}
                            activeThumbColor="crimson"
                            onValueChange={() => togglePreference(tag)}
                            value={preferences[tag]}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

// styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    }
});

export default BadgerPreferencesScreen;