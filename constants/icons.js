// ICONS FROM https://www.svgrepo.com/collection/solar-line-duotone-icons/
import { Entypo, Feather  } from "@expo/vector-icons";
import { SIZES } from "./theme";

const icons = {
  home: (color) => <Entypo name="home" size={SIZES.large} color={color} />,
  list: (color) => <Entypo name="list" size={SIZES.large} color={color} />,
  add: (color) => <Feather name="plus-square" size={SIZES.large} color={color} />,
  info: (color) => <Feather name="info" size={SIZES.large} color={color} />,
  leftArrow: (color) => <Feather name="arrow-left-circle" size={SIZES.large} color={color} />
};

export default icons;
