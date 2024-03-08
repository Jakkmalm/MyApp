import { StyleSheet, Dimensions } from "react-native";
import { FONT, COLORS, SIZES } from "../../../constants";
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
    justifyContent: "flex-start",
  },

  modalContent: {
    paddingTop: 50,
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  image: {
    borderRadius: 20,
    width: "auto",
    resizeMode: "cover",
    height: 200,
  },
  bottomContainer: {
    marginTop: 20,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
  },
  content: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
  },
  author: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
  },
  published: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xSmall,
  },
  modalText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
  modalButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    paddingVertical: 20,
    backgroundColor: "transparent",
  },
  linkButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 50,
    alignItems: "center",
    minWidth: 100,
    backgroundColor: COLORS.white,
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  linkText: {
    fontSize: SIZES.small,
    color: COLORS.secondary,
  },
  cancelButton: {
    borderRadius: 50,
    alignItems: "center",
    minWidth: 100,
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  cancelText: {
    fontSize: SIZES.small,
    color: COLORS.white,
  },
});
