import React, { useState } from "react";
import { styles } from "./AddStyles";
import { CYCLIC_URL } from "@env";
import { FONT, SIZES, COLORS } from "../../../constants";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

/* KÄLLOR:
 * https://reactnative.dev/docs/refreshcontrol
 * https://reactnavigation.org/docs/use-navigation/
 * https://www.geeksforgeeks.org/how-to-add-snap-to-alignment-feature-in-flatlist-in-react-native/
 * https://reactnative.dev/docs/toastandroid
 */

const Add = ({}) => {
  // https://www.youtube.com/watch?v=BecN2PxyR_0
  // Använder useNavigation från react-navigation
  const navigation = useNavigation();
  // State för snackbar
  const [snackbarVisible, setSnackbarVisible] = useState(false);
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

  // funktion för att navigera användare till "List"
  const goToList = () => {
    navigation.navigate("List");
  };

  // post-request
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

    try {
      const response = await fetch(CYCLIC_URL, {
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
      if (!response.ok) {
        throw Error("Failed to submit");
      }
      // Återställa states

      setIsPosting(false);
      setPrice("");
      setColor("");
      setBrand("");
      setType("");
      handleSnackbar();
    } catch (error) {
      console.error("ERROR Submit Post:", error);
    }
  };
  console.log("handleSnackbar körs: ", snackbarVisible);
  // ToastMessage/ Snackbar
  const handleSnackbar = () => {
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
      console.log("EFTER 2sek", snackbarVisible);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: FONT.regular,
            fontSize: SIZES.large,
          }}
        >
          Lägg till sko
        </Text>
        <Text style={styles.label}>Pris</Text>
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

        <Text style={styles.label}>Färg</Text>
        <TextInput
          style={styles.input}
          value={color}
          onChangeText={(text) => {
            setColor(text);
            setColorEmpty(false);
          }}
          placeholder={colorEmpty ? "Du måste fylla i här.." : "Fyll i Färg"}
        />

        <Text style={styles.label}>Märke</Text>
        <TextInput
          style={styles.input}
          value={brand}
          onChangeText={(text) => {
            setBrand(text);
            setBrandEmpty(false);
          }}
          placeholder={brandEmpty ? "Du måste fylla i här.." : "Fyll i Märke"}
        />

        <Text style={styles.label}>Typ av sko</Text>
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
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {isPosting ? "Lägger till..." : "Lägg till"}
            </Text>
          </TouchableOpacity>
          {snackbarVisible && (
            <Snackbar
              style={{ position: "absolute", top: -300 }}
              visible={snackbarVisible}
              onDismiss={() => setSnackbarVisible(false)}
              action={{
                label: "Gå till listan",
                onPress: () => goToList(),
                style: { color: COLORS.primary },
              }}
              duration={30000}
            >
              Din sko är tillagd!
            </Snackbar>
          )}
        </View>
      </View>
    </View>
  );
};

export default Add;
