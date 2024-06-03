// https://www.youtube.com/watch?v=oIEykI5oagI
import React, { useMemo, useState, useEffect } from "react";
// bottomSheet komponenten från Gorhom
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { styles } from "./CustomBottomSheetStyle";
// environment variabler för API
import { RENDER_URL } from "@env";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import { COLORS } from "../../../constants";

// props
const CustomBottomSheet = ({
  isVisible,
  onClose,
  onUpdate,
  title,
  selectedData,
}) => {
  // useMemo för att memorize värden för snapPoints
  const snapPoints = useMemo(() => ["90%"], []);
  // state för conditional rendering
  const [isUpdating, setIsUpdating] = useState(false);
  // state för kolla ändringar
  const [isNotChanged, setIsNotChanged] = useState(false);
  // InputStates
  // sätter statesen till data för aktuell sko
  const [price, setPrice] = useState(selectedData.price.toString());
  const [color, setColor] = useState(selectedData.color);
  const [brand, setBrand] = useState(selectedData.brand);
  const [type, setType] = useState(selectedData.type);

  // ToastMessage
  const showToastMessage = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Sko är uppdaterad!",
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
  };
  // put-request till API
  // Asyncron funktion
  const submitUpdate = async () => {
    // om ingen ändring skett i input - returnera
    if (!isNotChanged) return;
    // annars updatera state
    setIsUpdating(true);

    //
    try {
      // PUT-request till API - uppdaterar sko med selectedData._id (aktuell sko)
      const response = await fetch(`${RENDER_URL}${selectedData._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price, color, brand, type }),
      });
      // Om svaret inte är "ok" - error
      if (!response.ok) {
        throw Error("Failed to update");
      }
      // Om request ok - kör onUpdate() - funktion som prop från förälder - refetchShoes
      onUpdate();
    } catch (error) {
      // eventuella error
      console.log("Failed to update", error);
    } finally {
      // återställer state
      setIsUpdating(false);
      showToastMessage();
      // Kör onClose() -  funktion som prop från förälder - handleCardClose
      onClose();
    }
  };

  // useEffect hook för att hantera updateringsfunktionen
  // Om inga ändringar skett körs inte submitUpdate funktionen - för att förhindra onödiga requests
  // jämför states med data från inkommande för att se om ändringar skett
  useEffect(() => {
    if (
      price !== selectedData.price ||
      color !== selectedData.color ||
      brand !== selectedData.brand ||
      type !== selectedData.type
    ) {
      // Om inga ändringar skett - uppdatera state till true
      setIsNotChanged(true);
    } else {
      // om ändringar skett - uppdatera state till falskt
      setIsNotChanged(false);
    }
    // Körs om ändringar sker på:
  }, [price, color, brand, type]);

  return (
    isVisible && (
      <BottomSheet
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        style={styles.BottomSheet}
        backgroundStyle={{ backgroundColor: COLORS.white }}
        handleIndicatorStyle={styles.indicator}
        enablePanDownToClose={true}
        enableOverDrag={false}
        index={0}
        snapPoints={snapPoints}
        onClose={onClose}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.form}>
            <Text style={styles.label}>Pris</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholder="Uppdatera pris"
            />
            <Text style={styles.label}>Färg</Text>
            <TextInput
              style={styles.input}
              value={color}
              onChangeText={setColor}
              placeholder="Uppdatera Färg"
            />
            <Text style={styles.label}>Märke</Text>
            <TextInput
              style={styles.input}
              value={brand}
              onChangeText={setBrand}
              placeholder="Uppdatera Märke"
            />
            <Text style={styles.label}>Typ av sko</Text>
            <TextInput
              style={styles.input}
              value={type}
              onChangeText={setType}
              placeholder="Uppdatera Typ"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.update, styles.button]}
                onPress={submitUpdate}
              >
                <Text style={styles.updateBtnText}>
                  {isUpdating ? "Uppdaterar..." : "Uppdatera"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cancel, styles.button]}
                onPress={onClose}
              >
                <Text style={styles.cancelBtnText}>Avbryt</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>
    )
  );
};

export default CustomBottomSheet;
