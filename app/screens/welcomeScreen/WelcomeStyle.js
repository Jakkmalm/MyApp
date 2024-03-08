import { StyleSheet } from "react-native";
import { FONT, SIZES, COLORS } from "../../../constants";

export const styles = StyleSheet.create({
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
