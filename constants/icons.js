// ICONS FROM https://www.svgrepo.com/collection/solar-line-duotone-icons/
// Använder vector-icons paketet för att hämta icons
import { Entypo, Feather } from "@expo/vector-icons";
import { SIZES } from "./theme";

// objekt - funktioner som returnerar icons som jag kan återanvända - tar in parameter color
const icons = {
  home: (color) => <Entypo name="home" size={SIZES.large} color={color} />,
  list: (color) => <Entypo name="list" size={SIZES.large} color={color} />,
  add: (color) => (
    <Feather name="plus-square" size={SIZES.large} color={color} />
  ),
  info: (color) => (
    <Feather
      style={{ marginRight: 20 }}
      name="info"
      size={SIZES.large}
      color={color}
    />
  ),
  leftArrow: (color) => (
    <Feather
      style={{ marginLeft: 20 }}
      name="arrow-left-circle"
      size={SIZES.large}
      color={color}
    />
  ),
  dots: (color) => (
    <Entypo name="dots-three-vertical" size={SIZES.large} color={color} />
  ),
  externalLink: (color) => (
    <Feather name="external-link" size={SIZES.medium} color={color} />
  ),
};

export default icons;
