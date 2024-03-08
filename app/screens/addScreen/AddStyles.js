import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const { width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  form: {
    flex: 1,
    height: "70%",
    width: width,
    paddingVertical: 25,
    paddingHorizontal: 35,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  label: {
    paddingLeft: 20,
    color: COLORS.secondary,
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
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
  buttonContainer: {},

  button: {
    borderRadius: 50,
    alignItems: "center",
    minWidth: 100,
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 22,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
  },
});
