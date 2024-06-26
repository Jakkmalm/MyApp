import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES, FONT } from "../../../constants";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 40,
    marginHorizontal: 20,
    overflow: "hidden",
  },
  cardContainer: {
    elevation: 4,
    shadowOpacity: 3,
    flex: 1,
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 15,
  },
  quickAddContainer: {
    position: "absolute",
    backgroundColor: COLORS.white,
    bottom: 185,
    right: -5,
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addSign: {
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  image: {
    backgroundColor: COLORS.secondary,
    flex: 0.7,
    width: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    flex: 0.3,
    justifyContent: "space-around",
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: COLORS.card,
  },
  title: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  author: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xSmall,
    color: COLORS.black,
  },
  bottomContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainer: {},
  readMore: {
    color: COLORS.detail,
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
  },
});
