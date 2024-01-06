import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { PreferencesProvider } from "./PreferencesContext";

import BadgerTabs from "./navigation/BadgerTabs";
import BadgerNewsScreen from "./screens/BadgerNewsScreen";
import BadgerPreferencesScreen from "./screens/BadgerPreferencesScreen";
import BadgerNewsArticle from "./BadgerNewsArticle";

export default function BadgerNews(props) {

  const Stack = createStackNavigator();

  return (
    <>
      {/* Navigation */}
      <PreferencesProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={BadgerTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="News"
              component={BadgerNewsScreen}
            />
            <Stack.Screen
              name="Preferences"
              component={BadgerPreferencesScreen}
            />
            <Stack.Screen
              name="Article"
              component={BadgerNewsArticle}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </PreferencesProvider>
    </>
  );
}