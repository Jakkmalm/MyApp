// Add.jsx

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import usePostRequest from "../../../hooks/usePostRequest";
import { styles } from "./AddStyles";
import { FONT, SIZES, COLORS } from "../../../constants";
import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Add = () => {
  const {
    submitPost,
    isPosting,
    snackbarVisible,
    snackbarMessage,
    setSnackbarVisible,
    setSnackbarMessage,
  } = usePostRequest();
  console.log(snackbarMessage);

  const navigation = useNavigation();

  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");

  const goToList = () => {
    navigation.navigate("List");
  };

  const handleAdd = async () => {
    // Validera att alla fält är ifyllda

    if (!price || !color || !brand || !type) {
      setSnackbarMessage("Fyll i samtliga fält");
      setSnackbarVisible(true);
      return;
    }

    // Skicka in värdena till submitPost-funktionen
    await submitPost(price, color, brand, type);
    // Återställ input-fälten efter en framgångsrik post-request
    if (!isPosting && !snackbarVisible) {
      setPrice("");
      setColor("");
      setBrand("");
      setType("");
    }
  };

  const handleDismiss = () => {
    setSnackbarVisible(false);
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
          onChangeText={(text) => setPrice(text)}
          keyboardType="numeric"
          placeholder="Fyll i Pris"
        />

        <Text style={styles.label}>Färg</Text>
        <TextInput
          style={styles.input}
          value={color}
          onChangeText={(text) => setColor(text)}
          placeholder="Fyll i Färg"
        />

        <Text style={styles.label}>Märke</Text>
        <TextInput
          style={styles.input}
          value={brand}
          onChangeText={(text) => setBrand(text)}
          placeholder="Fyll i Märke"
        />

        <Text style={styles.label}>Typ av sko</Text>
        <TextInput
          style={styles.input}
          value={type}
          onChangeText={(text) => setType(text)}
          placeholder="Fyll i Typ"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleAdd}
            disabled={isPosting}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {isPosting ? "Lägger till..." : "Lägg till"}
            </Text>
          </TouchableOpacity>
          <Snackbar
            visible={snackbarVisible}
            onDismiss={handleDismiss}
            action={
              // Hårdkodad conditional --- lös senare
              snackbarMessage !== "Fyll i samtliga fält"
                ? {
                    label: "Gå till listan",
                    onPress: goToList,
                    style: { color: COLORS.primary },
                  }
                : null
            }
            duration={2000}
          >
            {snackbarMessage}
          </Snackbar>
        </View>
      </View>
    </View>
  );
};

export default Add;

/* BACKUP

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import usePostRequest from '../../../hooks/usePostRequest';
import { styles } from "./AddStyles";
import { RENDER_URL } from "@env";
import { FONT, SIZES, COLORS } from "../../../constants";
import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

*/

/* KÄLLOR:
 * https://reactnative.dev/docs/refreshcontrol
 * https://reactnavigation.org/docs/use-navigation/
 * https://www.geeksforgeeks.org/how-to-add-snap-to-alignment-feature-in-flatlist-in-react-native/
 * https://reactnative.dev/docs/toastandroid
 */

/*
const Add = ({}) => {
  const { submitPost, isPosting, snackbarVisible } = usePostRequest();

  // https://www.youtube.com/watch?v=BecN2PxyR_0
  // Använder useNavigation från react-navigation
  const navigation = useNavigation();
  // State för snackbar
  //const [snackbarVisible, setSnackbarVisible] = useState(false);
  // Skapa states för respektive egenskap
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  // Skapa state för hålla koll om post sker - deafult False
  // För conditional rendering
  //const [isPosting, setIsPosting] = useState(false);

  // Tillstånd för att hålla reda på tomma fält
  const [priceEmpty, setPriceEmpty] = useState(false);
  const [colorEmpty, setColorEmpty] = useState(false);
  const [brandEmpty, setBrandEmpty] = useState(false);
  const [typeEmpty, setTypeEmpty] = useState(false);

  // funktion för att navigera användare till "List"
  const goToList = () => {
    navigation.navigate("List");
  };
*/

// post-request
/*
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
      const response = await fetch(RENDER_URL, {
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
  */

// ToastMessage/ Snackbar
/*
  const handleSnackbar = () => {
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
      console.log("EFTER 2sek", snackbarVisible);
    }, 2000);
  };
  */

/*
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
              //onDismiss={() => setSnackbarVisible(false)}
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
*/
