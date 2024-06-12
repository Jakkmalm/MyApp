import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./QuickAddModalStyle";
import { Snackbar } from "react-native-paper";
import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import { FONT, SIZES, COLORS } from "../../../constants";
import usePostRequest from "../../../hooks/usePostRequest";

const QuickAddModal = ({ isVisible, onClose, brand, type }) => {
  const navigation = useNavigation();
  const {
    submitPost,
    isPosting,
    snackbarVisible,
    snackbarMessage,
    setSnackbarVisible,
    setSnackbarMessage,
  } = usePostRequest();

  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");

  const [animatedBrand, setAnimatedBrand] = useState("");
  const [animatedType, setAnimatedType] = useState("");
  const [isBrandAnimated, setIsBrandAnimated] = useState(false);
  const [isTypeAnimated, setIsTypeAnimated] = useState(false);
  const intervalIdBrandRef = useRef(null);
  const intervalIdTypeRef = useRef(null);

  const goToList = () => {
    navigation.navigate("List");
  };

  useEffect(() => {
    if (isVisible) {
      if (!isBrandAnimated) {
        setAnimatedBrand(""); // Clear before animation
        animateText(brand, setAnimatedBrand, setIsBrandAnimated);
      }
      if (!isTypeAnimated) {
        setAnimatedType(""); // Clear before animation
        animateText(type, setAnimatedType, setIsTypeAnimated);
      }
    }
    return () => {
      clearInterval(intervalIdBrandRef.current);
      clearInterval(intervalIdTypeRef.current);
    };
  }, [isVisible, brand, type]);

  const animateText = (text, setText, setIsAnimated) => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setText((prev) => prev + text[currentIndex]);
        currentIndex += 1;
      } else {
        clearInterval(intervalId);
        setIsAnimated(true);
      }
    }, 50);
    // Assign the correct intervalIdRef
    if (setText === setAnimatedBrand) {
      intervalIdBrandRef.current = intervalId;
    } else if (setText === setAnimatedType) {
      intervalIdTypeRef.current = intervalId;
    }
  };

  const handleAdd = async () => {
    if (!price || !color || !brand || !type) {
      setSnackbarMessage("Fyll i samtliga fält");
      setSnackbarVisible(true);
      return;
    }

    await submitPost(price, color, brand, type);

    if (!isPosting && !snackbarVisible) {
      setPrice("");
      setColor("");
      setAnimatedBrand("");
      setAnimatedType("");
      setIsBrandAnimated(false);
      setIsTypeAnimated(false);
    }
  };

  const handleDismiss = () => {
    setSnackbarVisible(false);
  };

  const handleBrandChange = (text) => {
    if (isBrandAnimated) {
      setAnimatedBrand(text);
    }
  };

  const handleTypeChange = (text) => {
    if (isTypeAnimated) {
      setAnimatedType(text);
    }
  };

  return (
    isVisible && (
      <Modal
        style={styles.BottomSheet}
        backgroundStyle={{ backgroundColor: COLORS.white }}
        handleIndicatorStyle={styles.indicator}
        enablePanDownToClose={true}
        enableOverDrag={false}
        index={0}
        onClose={onClose}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{"Lägg till"}</Text>
          <View style={styles.form}>
            <Text style={styles.label}>Pris</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholder="Fyll i pris"
            />
            <Text style={styles.label}>Färg</Text>
            <TextInput
              style={styles.input}
              value={color}
              onChangeText={setColor}
              placeholder="Fyll i färg"
            />
            <Text style={styles.label}>Märke</Text>
            <TextInput
              style={styles.input}
              value={animatedBrand}
              onChangeText={handleBrandChange}
              placeholder="Fyll i märke"
            />
            <Text style={styles.label}>Typ av sko</Text>
            <TextInput
              style={styles.input}
              value={animatedType}
              onChangeText={handleTypeChange}
              placeholder="Fyll i typ"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.update, styles.button]}
                onPress={handleAdd}
              >
                <Text style={styles.updateBtnText}>
                  {isPosting ? "Lägger till..." : "Lägg till"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cancel, styles.button]}
                onPress={onClose}
              >
                <Text style={styles.cancelBtnText}>Avbryt</Text>
              </TouchableOpacity>
              <Snackbar
                visible={snackbarVisible}
                onDismiss={handleDismiss}
                action={
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
      </Modal>
    )
  );
};

export default QuickAddModal;
