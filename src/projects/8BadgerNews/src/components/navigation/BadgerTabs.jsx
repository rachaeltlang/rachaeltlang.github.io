import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator()

function BadgerTabs(props) {
    return <>
        {/* Step 1: tab navigation */}
        <Tab.Navigator>
            <Tab.Screen
                name="News"
                component={BadgerNewsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="newspaper-outline" color={color} size={size} />
                    ),
                }} />
            <Tab.Screen
                name="Preferences"
                component={BadgerPreferencesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" color={color} size={size} />
                    ),
                }} />
        </Tab.Navigator>
    </>
}

export default BadgerTabs;