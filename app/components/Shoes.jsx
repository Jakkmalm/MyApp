import React, { useState } from "react";
import { API_URL, LOKAL_API_URL } from '@env';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from "react-native";
//import { Modal } from "react-native-modal";

import { COLORS, FONT, SIZES, images, icons } from "../../constants";

const Shoes = ({ shoeData, refreshShoes }) => {
  // State för Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // snygga till sträng
  const fixBrandString = shoeData.brand.toLowerCase().replace(/\s/g, "");
  const shoeImage = images[fixBrandString] || images.noImg;
  //const shoeImageSource = images[brand] || images.noImg;
  console.log("Image source for brand", fixBrandString);
  if (images) {
    // Hämta nycklarna från images-objektet och loopa igenom dem
    Object.keys(images).forEach((key) => {
      // Logga varje nyckel tillsammans med dess bild
      console.log("Nyckel:", key, ", Bild:", images[key]);
    });
  } else {
    console.log(images);
  }

  const handleDelete = () => {
    setIsModalVisible(true);
  };

  // Delete-funktion

  const submitDelete = async () => {
    try {
      const response = await fetch(
        `${LOKAL_API_URL}/${shoeData._id}`,
        {
          method: "delete",
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete shoes");
      }
      setIsModalVisible(false);
      refreshShoes();
    } catch (error) {
      console.error("ERROR delete shoe:", error);
    }
  };

  return (
    <View style={styles.cards}>
      <View style={styles.titleContainer}>
        <Text style={styles.brand}>{shoeData.brand.toUpperCase()}</Text>
        <Text style={styles.type}>{shoeData.type}</Text>
      </View>
      <View style={styles.imageWrapper}>
        <ImageBackground
          source={shoeImage}
          style={styles.ImageBackground}
        ></ImageBackground>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{shoeData.price} kr</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Ta bort</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Är du säker på att du vill ta bort denna sko?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.buttonText}>Avbryt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={submitDelete}
              >
                <Text style={[styles.buttonText, styles.deleteText]}>
                  Bekräfta
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cards: {
    height: 370,
    width: "80%",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 8,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  imageWrapper: {
    flex: 1,
    alignItems: "center",
    padding: SIZES.medium,
  },
  ImageBackground: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
  titleContainer: {
    padding: 10,
  },
  brand: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  type: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
  bottomContainer: {
    //arginTop:
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  priceContainer: {
    borderRadius: 50,
    alignItems: "center",
    minWidth: 100,
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    paddingHorizontal: 22,
  },
  priceText: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
  },
  deleteButton: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 50,
    alignItems: "center",
    minWidth: 100,
    backgroundColor: COLORS.white,
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  deleteText: {
    color: COLORS.secondary,
  },
});

export default Shoes;
