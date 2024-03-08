import React, { useState } from "react";
import { styles } from "./ShoesStyle";
import { CYCLIC_URL } from "@env";
import ShoeModal from "../shoeModal/ShoeModal";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { images } from "../../../constants";

const Shoes = ({ shoeData, updateData, onPress }) => {
  // State för Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Placeholder-bilder - matchar shoeData.brand.toLowercase/replace med bildnamn
  // snygga till sträng
  const fixBrandString = shoeData.brand.toLowerCase().replace(/\s/g, "");
  const shoeImage = images[fixBrandString] || images.noImg;
  //const shoeImageSource = images[brand] || images.noImg;
  console.log("Image source brand", fixBrandString);
  if (images) {
    // Hämta nycklarna från images-objektet och loopa igenom dem
    Object.keys(images).forEach((key) => {
      // Logga varje nyckel + bild
      console.log("Nyckel:", key, ", Bild:", images[key]);
    });
  } else {
    console.log(images);
  }

  const handleDelete = () => {
    setIsModalVisible(true);
  };

  const showToastMessage = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Sko borttagen",
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      25,
      50
    );
  };

  // Delete-funktion

  const submitDelete = async () => {
    console.log(`${CYCLIC_URL}/${shoeData._id}`);
    setIsDeleting(true);
    try {
      const response = await fetch(`${CYCLIC_URL}${shoeData._id}`, {
        method: "delete",
        header: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete shoes");
      }
      setIsModalVisible(false);
      // TITTA PÅ DETTA SEN DEPENDANCY ARRAY I USEAPI.JSX
      updateData();
      showToastMessage();
      setIsDeleting(false);
    } catch (error) {
      console.error("ERROR delete shoe:", error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.cards}
      onPress={() => onPress(shoeData)}
      activeOpacity={0.7}
    >
      <View style={styles.imageWrapper}>
        <Image source={shoeImage} style={styles.Image}></Image>
      </View>
      <View style={styles.centerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.brand}>{shoeData.brand.toUpperCase()}</Text>
          <Text style={styles.color}>{shoeData.color}</Text>
          <Text style={styles.type}>{shoeData.type}</Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{shoeData.price} kr</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText} activeOpacity={0.7}>
            Ta bort
          </Text>
        </TouchableOpacity>
      </View>
      {isModalVisible && (
        <ShoeModal
          isDeleting={isDeleting}
          closeModal={() => setIsModalVisible(false)}
          isVisible={isModalVisible}
          onDelete={submitDelete}
          selectedShoe={shoeData}
        />
      )}
    </TouchableOpacity>
  );
};

export default Shoes;
