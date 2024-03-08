import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 25,
    alignItems: "center",
  },
  title: {
    color: COLORS.black,
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
  },
  form: {
    flex: 1,
    width: width,
    paddingBottom: 25,
    paddingHorizontal: 50,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  label: {
    paddingLeft: 20,
    color: COLORS.black,
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
  },
  content: {
    marginTop: 20,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.testWhite,
  },
  indicator: {
    backgroundColor: COLORS.primary,
  },

  iconContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 25,
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.black,
    paddingLeft: 20,
    paddingVertical: 4,
    marginBottom: 10,
  },
  buttonContainer: {
    gap: 5,
  },
  button: {
    borderRadius: 50,
    alignItems: "center",
  },

  cancel: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
  },
  update: {
    paddingVertical: 13,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },

  updateBtnText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.secondary,
  },
  cancelBtnText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.white,
  },
});
