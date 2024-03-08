import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const { width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: COLORS.card,
    width: width - 250,
    height: 150,
    borderRadius: 20,
    elevation: 3,
    shadowOpacity: 3,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  brandTitle: {
    color: COLORS.black,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
  typeTitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  priceTitle: {
    color: COLORS.detail,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
});
