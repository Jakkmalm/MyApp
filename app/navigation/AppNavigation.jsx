import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/welcomeScreen/Welcome";
import TabNavigaton from "./TabNavigation";


// Skapa instans av StackNavigator
const Stack = createNativeStackNavigator();

const AppNavigaton = () => {
  return (
    // Använder StackNavigation
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
          headerStyle: {},
        }}
      >
        {/* Renderar 2 Screens/komponenter varav ena är min TabNavigation */}
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Main" component={TabNavigaton} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigaton;
