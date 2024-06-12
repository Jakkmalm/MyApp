import React, { useState } from "react";
import { View, Text, Image, ToastAndroid, ActivityIndicator } from "react-native";
import NewsModal from "../newsModal/NewsModal";
import QuickAddModal from "../quickAddModal/QuickAddModal";
import { styles } from "./NewsCardStyle";
import { images } from "../../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { OPENAI_API_URL } from "@env";
import { icons, COLORS } from "../../../constants";

const NewsCard = ({ newsData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [quickAddModalVisible, setQuickAddModalVisible] = useState(false);
  const [aiResponseLoading, setAiResponseLoading] = useState(false);
  const [responseBrand, setResponseBrand] = useState("");
  const [responseType, setResponseType] = useState("");
  const [imageURL, setImageURL] = useState(newsData.urlToImage);
  const placeholderImgURL = images.noImg;

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openQuickAddModal = () => {
    setQuickAddModalVisible(true);
  };

  const closeQuickAddModal = () => {
    setQuickAddModalVisible(false);
  };

  const openAIRequest = async (text) => {
    try {
      setAiResponseLoading(true);

      const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
        }),
      });

      const data = await response.json();

      if (data.message && data.message.content) {
        const assistantMessage = data.message.content.trim();

        if (assistantMessage.includes("Finns ej")) {
          showToastMessage();
        } else {
          const [brand, type] = assistantMessage.split(",");
          setResponseBrand(brand.trim());
          setResponseType(type.trim());
          openQuickAddModal();
        }
      } else {
        console.error("Assistant Message is undefined or empty");
      }
    } catch (error) {
      console.error("console error fetch AI API", error);
    } finally {
      setAiResponseLoading(false);
    }
  };

  const handleOpenAIRequest = async () => {
    try {
      const cleanedText = cleanText(
        `${newsData.title} ${newsData.content} ${newsData.description}`
      );
      await openAIRequest(cleanedText);
    } catch (error) {
      console.error("Error handleFunction openAIRequest:", error);
    }
  };

  const cleanText = (text) => {
    return text.replace(/[^a-zA-Z0-9\s]/g, "");
  };

  const showToastMessage = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Ingen information om skor hittades.",
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      25,
      50
    );
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
            <View style={styles.quickAddContainer}>
              <TouchableOpacity
                onPress={handleOpenAIRequest}
                activeOpacity={0.7}
              >
                {aiResponseLoading ? (
                  <ActivityIndicator color={COLORS.primary} />
                ) : (
                  icons.add(COLORS.black)
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.infoContainer} onPress={openModal}>
              <Text style={styles.readMore}>Läs mer..</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {modalVisible && (
        <NewsModal
          isVisible={modalVisible}
          closeModal={closeModal}
          newsData={newsData}
        />
      )}
      {quickAddModalVisible && responseBrand && responseType && (
        <QuickAddModal
          isVisible={quickAddModalVisible}
          onClose={closeQuickAddModal}
          brand={responseBrand}
          type={responseType}
        />
      )}
    </View>
  );
};

export default NewsCard;
