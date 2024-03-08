import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES, FONT } from "../../../constants";

const { height } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: height,
    backgroundColor: COLORS.secondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  textDetail: {
    fontFamily: FONT.bold,
    color: COLORS.detail,
    fontSize: SIZES.small,
  },

  topHorizontalContainer: {
    flex: 0.4,
  },
  flatlist: {},
  middleStaticContainer: {
    flex: 0.2,
  },
  bottomHorizontalContainer: {
    flex: 0.4,
  },
  textWrapper: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    marginHorizontal: 25,
  },
});
