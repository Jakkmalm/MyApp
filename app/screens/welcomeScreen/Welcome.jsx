import React from "react";
import { styles } from './WelcomeStyle';
import {
  Text,
  View,
  ImageBackground,
} from "react-native";
import CustomButton from "../../components/button/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import bgImg from "../../../assets/welcomeBackground.jpg";

// Fix
//const windowWidth = Dimensions.get("window").width;
//const windowHeight = Dimensions.get("window").height;

const Welcome = ({}) => {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate("Main");
  };
  return (
    <ImageBackground source={bgImg} style={styles.backgroundImage}>
      <StatusBar />
      <View style={styles.headerWrapper}>
        <Text style={styles.welcomeTitle}>Välkommen</Text>
        <Text style={styles.toTitle}>till</Text>
        <Text style={styles.shoeyTitle}>SHOEY</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Här kan du samla dina favoritskor!</Text>
        <CustomButton title="Fortsätt" onPress={goToHome} />
      </View>
    </ImageBackground>
  );
};

export default Welcome;
