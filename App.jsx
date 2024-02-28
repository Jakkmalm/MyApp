import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
//https://reactnavigation.org/docs/tab-based-navigation
import React, { useEffect } from "react";

// Custom-Fonts-dep
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { images, icons, COLORS, FONT, SIZES } from "./constants";
import AppNavigation from "./app/navigation/AppNavigation";

// SplashScreen
SplashScreen.preventAutoHideAsync();

const App = () => {
  // useFonts-hook för custom fonts
  const [fontsLoaded] = useFonts({
    "Nohemi-Regular": require("./assets/fonts/Nohemi-Regular-BF6438cc58b98fc.otf"),
    "Nohemi-Medium": require("./assets/fonts/Nohemi-Medium-BF6438cc581a509.otf"),
    "Nohemi-Bold": require("./assets/fonts/Nohemi-Bold-BF6438cc5812315.otf"),
    "Nohemi-Black": require("./assets/fonts/Nohemi-Black-BF6438cc5874bd2.otf"),
  });
  console.log("FONTSLOADED: ", fontsLoaded);

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} />
      <AppNavigation />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
