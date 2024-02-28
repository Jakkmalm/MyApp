import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
//https://reactnavigation.org/docs/tab-based-navigation
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { images, icons, COLORS, FONT, SIZES } from "../../constants";

import Home from "../screens/Home";
import List from "../screens/List";
import Add from "../screens/Add";

// Skapa instans av Tab och Stack
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
        headerTransparent: true,
        tabBarShowLabel: false,
        headerShown: true,
        headerTitle: "",
        headerRight: icons.info,
        headerLeft: icons.leftArrow,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.white,
        //tabBarActiveBackgroundColor: COLORS.white,
        tabBarItemStyle: {},
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          borderRadius: 15,
          height: 60,
          backgroundColor: COLORS.secondary,
          borderTopWidth: 0,
          // Destructure styles.
        },
        tabBarLabelStyle: {
          fontSize: SIZES.small,
          marginBottom: SIZES.medium,
          fontFamily: FONT.regular,
        },
      })}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => icons.home(color),
          headerTitle: "Hej",
        }}
        name="Home"
        component={Home}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => icons.add(color),
          headerTitle: "Lägg till",
        }}
        name="Add"
        component={Add}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => icons.list(color),
          headerTitle: "Min lista",
        }}
        name="Shoes"
        component={List}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default TabNavigation;
