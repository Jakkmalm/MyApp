import React from "react";
import { styles } from './ShoeMiniCardStyle';
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

// Minicard för skor - "förhandsvisning" på hemskärmen
const ShoeMiniCard = ({ shoesData, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(shoesData)}
      activeOpacity={0.7}
    >
      <View style={styles.wrapper}>
        <Text style={styles.brandTitle} numberOfLines={1}>
          {shoesData.brand.toUpperCase()}
        </Text>
        <Text style={styles.typeTitle} numberOfLines={1}>
          {shoesData.type}
        </Text>
      </View>

      <Text style={styles.priceTitle} numberOfLines={1}>
        {shoesData.price} Kr
      </Text>
    </TouchableOpacity>
  );
};

export default ShoeMiniCard;
