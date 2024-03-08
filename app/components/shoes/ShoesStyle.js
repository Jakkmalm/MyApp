import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

export const styles = StyleSheet.create({
  cards: {
    flex: 1,
    flexDirection: "row",
    //justifyContent: "space-evenly",
    height: 120,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    elevation: 4,
  },
  topContainer: {},
  iconContainer: {},
  imageWrapper: {
    flex: 0.333,
    alignItems: "center",
  },
  Image: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
  },

  centerContainer: {
    flex: 0.333,
    justifyContent: "center",
    marginLeft: 15,
  },
  rightContainer: {
    flex: 0.333,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  titleContainer: {},
  brand: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  type: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    color: COLORS.secondary,
  },

  color: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.secondary,
  },

  priceContainer: {
    borderRadius: 50,
    alignItems: "center",
    minWidth: 100,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  priceText: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
  },
  deleteButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 50,
    alignItems: "center",
    minWidth: 100,
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  deleteText: {
    fontSize: SIZES.small,
    color: COLORS.secondary,
  },
});
