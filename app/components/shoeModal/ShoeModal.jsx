import React from "react";
import { styles } from "./ShoeModalStyle";
import { View, Text, Modal, TouchableOpacity } from "react-native";


// Shoemodal
const ShoeModal = ({
  isVisible,
  closeModal,
  onDelete,
  selectedShoe,
  isDeleting,
}) => {
  console.log(isDeleting);
  return (
    <View>
      {/* MODAL */}
      <Modal
        style={styles.modalWrapper}
        animationType={"slide"}
        transparent={false}
        visible={isVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.infoContainer}>
              <Text style={styles.modalText}>
                Är du säker på att du vill ta bort{" "}
              </Text>
              <Text style={styles.infoText}>
                {selectedShoe.brand} {selectedShoe.type}
              </Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={onDelete}
                activeOpacity={0.7}
              >
                <Text style={styles.deleteText}>
                  {isDeleting ? "Tar bort..." : "Bekräfta"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeModal}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelText}>Avbryt</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ShoeModal;
