import React, { useState } from "react";
import { API_URL, LOKAL_API_URL} from '@env';
import { COLORS, FONT, SIZES } from "../../constants";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Custom Hook
import useShoes from "../../hooks/useShoes";

const Add = ({}) => {
  const { refetchShoes } = useShoes();

  // https://www.youtube.com/watch?v=BecN2PxyR_0

  // Skapa states för respektive egenskap
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  // Skapa state för hålla koll om post sker - deafult False
  // För conditional rendering
  const [isPosting, setIsPosting] = useState(false);

  // Tillstånd för att hålla reda på tomma fält
  const [priceEmpty, setPriceEmpty] = useState(false);
  const [colorEmpty, setColorEmpty] = useState(false);
  const [brandEmpty, setBrandEmpty] = useState(false);
  const [typeEmpty, setTypeEmpty] = useState(false);

  const submitPost = async () => {
    if (!price || !color || !brand || !type) {
      // Updatera tillstånd i states
      if (!price) setPriceEmpty(true);
      if (!color) setColorEmpty(true);
      if (!brand) setBrandEmpty(true);
      if (!type) setTypeEmpty(true);
      return; // Returnera om fält är tomma
    }
    setIsPosting(true);
    const response = await fetch(LOKAL_API_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: price,
        color: color,
        brand: brand,
        type: type,
      }),
    });
    // Återställa states
    setIsPosting(false);
    setPrice("");
    setColor("");
    setBrand("");
    setType("");
    refetchShoes();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={(text) => {
            setPrice(text);
            setPriceEmpty(false);
          }}
          keyboardType="numeric"
          placeholder={priceEmpty ? "Du måste fylla i här.." : "Fyll i Pris"}
        />

        <Text style={styles.label}>Color:</Text>
        <TextInput
          style={styles.input}
          value={color}
          onChangeText={(text) => {
            setColor(text);
            setColorEmpty(false);
          }}
          placeholder={colorEmpty ? "Du måste fylla i här.." : "Fyll i Färg"}
        />

        <Text style={styles.label}>Brand:</Text>
        <TextInput
          style={styles.input}
          value={brand}
          onChangeText={(text) => {
            setBrand(text);
            setBrandEmpty(false);
          }}
          placeholder={brandEmpty ? "Du måste fylla i här.." : "Fyll i Märke"}
        />

        <Text style={styles.label}>Type:</Text>
        <TextInput
          style={styles.input}
          value={type}
          onChangeText={(text) => {
            setType(text);
            setTypeEmpty(false);
          }}
          placeholder={typeEmpty ? "Du måste fylla i här.." : "Fyll i Typ"}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={submitPost}
            disabled={isPosting}
          >
            <Text style={styles.buttonText}>
              {isPosting ? "Lägger till..." : "Lägg till"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: COLORS.primary,
  },
  form: {
    marginTop: 100,
    paddingVertical: 50,
    paddingHorizontal: 25,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  label: {
    paddingLeft: 20,
    color: COLORS.secondary,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 25,
    fontFamily: FONT.regular,
    color: COLORS.primary,
    paddingLeft: 20,
    paddingVertical: 8,
    marginBottom: 10,
  },
  buttonContainer: {

  },

  button: {
    borderRadius: 50,
    alignItems: "center",
    minWidth: 100,
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    paddingHorizontal: 22,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
  },
});

export default Add;
