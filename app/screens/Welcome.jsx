import React from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FONT, SIZES, COLORS } from "../../constants";

import bgImg from "../../assets/welcomeBackground.jpg";

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
      <View style={styles.headerWrapper}>
        <Text style={styles.welcomeTitle}>VÄLKOMMEN</Text>
        <Text style={styles.toTitle}>TILL</Text>
        <Text style={styles.shoeyTitle}>SHOEY</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Här kan du samla dina favoritskor!</Text>
        <CustomButton title="Fortsätt" onPress={goToHome} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    //width: windowWidth,
    //height: windowHeight,
    resizeMode: "cover",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerWrapper: {
    marginTop: 100,
    alignItems: "center",
  },
  welcomeTitle: {
    color: COLORS.secondary,
    fontFamily: FONT.medium,
    fontSize: SIZES.xLarge,
  },
  toTitle: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
  },
  shoeyTitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.superLarge,
    color: COLORS.primary,
  },
  textWrapper: {
    marginBottom: 160,
    alignItems: "center",
  },
  text: {
    fontFamily: FONT.regular,
    color: COLORS.white,
    fontSize: SIZES.medium,
    marginBottom: SIZES.xSmall,
  },
});

export default Welcome;
