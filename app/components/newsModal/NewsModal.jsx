import React from "react";
import { styles } from "./NewsModalStyle";
import {
  View,
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { COLORS, icons } from "../../../constants";

// NyhetsModal - visar nyheterna i en Modal
const NewsModal = ({ isVisible, closeModal, newsData }) => {
  // använder Linking för url från api-datan för att skicka användare till originalsidan/artikel
  const handleLink = () => {
    Linking.openURL(newsData.url);
  };
  return (
    <View scrollEnabled={true} style={styles.modalWrapper}>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={isVisible}
        onRequestClose={closeModal}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.modalContent}>
            <Image source={{ uri: newsData.urlToImage }} style={styles.image} />

            <Text style={styles.title}>{newsData.title}</Text>
            <Text style={styles.content}>{newsData.content}</Text>
            <View style={styles.bottomContainer}>
              <Text style={styles.author}>{newsData.author}</Text>
              <Text style={styles.published}>{newsData.publishedAt}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.modalButtons}>
          <TouchableOpacity style={styles.linkButton} onPress={handleLink}>
            <Text style={styles.linkText}>
              Gå till artikel
              {icons.externalLink(COLORS.primary)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
            <Text style={styles.cancelText}>Avbryt</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default NewsModal;
