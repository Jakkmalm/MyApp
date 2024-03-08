import React, { useState } from "react";
import NewsModal from "../newsModal/NewsModal";
import { styles } from "./NewsCardStyle";
import { View, Text, Image } from "react-native";
import { images } from "../../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";


// NewsCard renderar nyhetskort, tar in data från nyheter api
const NewsCard = ({ newsData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const imageURL = newsData.urlToImage;
  const placeholderImgURL = images.noImg;

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.image}
          source={imageURL ? { uri: imageURL } : placeholderImgURL}
        ></Image>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.title} numberOfLines={2}>
              {newsData.title}
            </Text>
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.author} numberOfLines={1}>
              {newsData.author}
            </Text>
            <TouchableOpacity style={styles.infoContainer} onPress={openModal}>
              <Text style={styles.readMore}>Läs mer..</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Modal Component */}
      {modalVisible && (
        /* Conditional rendering NewsModal 
        skickar in data till props
        */
        <NewsModal
          isVisible={modalVisible}
          closeModal={closeModal}
          newsData={newsData}
        />
      )}
    </View>
  );
};

export default NewsCard;
