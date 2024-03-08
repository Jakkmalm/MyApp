import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

// CustomButton props
const CustomButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 120,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 0,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
  },
});

export default CustomButton;
