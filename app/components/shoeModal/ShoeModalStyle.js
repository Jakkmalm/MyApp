import { StyleSheet } from "react-native";
import { FONT, COLORS, SIZES } from "../../../constants";

export const styles = StyleSheet.create({
  modalWrapper: {},
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {},
  infoContainer: {
    margin: 20,
    alignItems: "center",
  },
  infoText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  modalText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
  modalButtons: {
    gap: 5,
    alignItems: "center",
  },
  deleteButton: {
    width: 220,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  deleteText: {
    fontSize: SIZES.small,
    color: COLORS.secondary,
  },
  cancelButton: {
    width: 220,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  cancelText: {
    fontSize: SIZES.small,
    color: COLORS.white,
  },
});
