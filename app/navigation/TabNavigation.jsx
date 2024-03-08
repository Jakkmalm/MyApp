import { StyleSheet, TouchableOpacity } from "react-native";
//https://reactnavigation.org/docs/tab-based-navigation
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { icons, COLORS, FONT, SIZES } from "../../constants";
import Home from "../screens/homeScreen/Home";
import List from "../screens/listScreen/List";
import Add from "../screens/addScreen/Add";

// Skapa instans av Tab Navigation
const Tab = createBottomTabNavigator();

// använder react .goBack från react navigation
const TabNavigation = () => {
  const handleLeftArrow = ({ navigation }) => {
    navigation.goBack();
  };
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarHideOnKeyboard: true,
        // OFF tillsvidare
        //unmountOnBlur: true,
        //headerTransparent: true,
        tabBarShowLabel: false,
        // headerRight prop
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.7}>
            {icons.info(COLORS.detail)}
          </TouchableOpacity>
        ),
        // headerLeft prop, kör handleLeftArrow funktionen och skickar med navigation
        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleLeftArrow({ navigation })}
          >
            {/* importerar icon.leftArrow skickar med färg som parameter */}
            {icons.leftArrow(COLORS.detail)}
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.detail,
        //tabBarActiveBackgroundColor: COLORS.white,
        tabBarItemStyle: {},
        headerStyle: {
          backgroundColor: COLORS.secondary,
          //borderRadius: 30,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerShown: true,
        headerTitle: "",
        headerTitleStyle: { fontFamily: FONT.regular, color: COLORS.white },
        headerTitleAlign: "center",
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          borderRadius: 30,
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
      {/* Tab.Screens med importerade icons
       och respektive komponent */}
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => icons.home(color),
          //headerTitle: "Välkommen",
        }}
        name="Home"
        component={Home}
      />

      <Tab.Screen
        options={{
          // parametern color innehåller aktiv/inaktiv färg - skickar med den och ikonen kommer anpassa färg automatiskt
          tabBarIcon: ({ color }) => icons.add(color),
          //headerTitle: "Lägg till skor",
        }}
        name="Add"
        component={Add}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => icons.list(color),
          //headerTitle: "Min lista",
        }}
        name="List"
        component={List}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default TabNavigation;
