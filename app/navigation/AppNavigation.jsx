import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import TabNavigaton from "./TabNavigation";

const Stack = createNativeStackNavigator();

const AppNavigaton = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Main" component={TabNavigaton} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigaton;
