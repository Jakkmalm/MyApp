import React, { useEffect, useState } from "react";
import { styles } from "./HomeStyle";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ShoeMiniCard from "../../components/shoeMiniCard/ShoeMiniCard";
import CustomBottomSheet from "../../components/bottomSheet/CustomBottomSheet";
import { COLORS } from "../../../constants";
import useNewsApi from "../../../hooks/useNewsApi";
import useFetchApi from "../../../hooks/useFetchApi";
import NewsCard from "../../components/newsCard/NewsCard";

/* KÄLLOR:
 * https://reactnative.dev/docs/refreshcontrol
 * https://reactnavigation.org/docs/use-navigation/
 * https://www.geeksforgeeks.org/how-to-add-snap-to-alignment-feature-in-flatlist-in-react-native/
 */

const { width } = Dimensions.get("window");

// Home-komponent
// Renderar listor med Nyheter och Skor

const Home = () => {
  // Använder useNavigation från react-navigation
  const navigation = useNavigation();
  // State för vald sko - default null
  const [selectedShoeMiniCard, setSelectedShoeMiniCard] = useState(null);
  // state för bottomSheet - default false
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  // Desctructe customHooks - använder data, boolean och funktion
  const { shoesData, isLoadingShoes, refetchShoes } = useFetchApi();
  const { newsData, isLoadingNews } = useNewsApi();

  // useEffect fär att lyssna på navigation "focus"
  // kommer köra refetchShoes när Home.jsx har focus för att rendera om innehållet i flatListen med ShoeMiniCard
  // navigation i dependency array innebär att useEffect körs när ändring sker på navigation.
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetchShoes();
      console.log("HOME.JSX - refetchShoes on Focus");
    });
    console.log("HOME.JSX - unsubscribe");
    // "Clean-up"
    return unsubscribe;
  }, [navigation]);

  // funktion för sätta states när användare klickar på ShoeMiniCard
  // tar in parameter
  const handleCardPress = (shoeData) => {
    // Uppdaterar state med item i flatList - dvs aktuell data för vald ShoeMiniCard
    setSelectedShoeMiniCard(shoeData);
    console.log("HandleCardPress :", shoeData);
    // Uppdaterar state med true för att visa BottomSheet
    setBottomSheetVisible(true);
  };
  // funktion för återställa states när användaren stänger bottomSheet
  const handleCardClose = () => {
    // återställa state
    setBottomSheetVisible(false);
    setSelectedShoeMiniCard(null);
  };

  // funktion för att navigera användare till "List"
  const goToList = () => {
    navigation.navigate("List");
  };

  // renderar ShoeMiniCard komponenten i Flatlist, med item från flatlist satt till shoesData och onPress skickar med handleCardPress funktion
  const renderShoeMiniCard = ({ item }) => (
    <ShoeMiniCard shoesData={item} onPress={handleCardPress} />
  );

  // renderar NewCard komponent i Flatlist skickar item som newsData
  const renderNews = ({ item }) => <NewsCard newsData={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.topHorizontalContainer}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Senaste nyheterna</Text>
        </View>
        {/* INNEHÅLL Horizontell scroll */}
        {/* CONDITIONAL-RENDERING
        isLoadingNews true - Visa ActivityIndicator
        Annars - Visa Flatlist */}
        {isLoadingNews ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={"large"} color={COLORS.primary} />
            <Text>Laddar...</Text>
          </View>
        ) : (
          <FlatList
            // Horizontal scrolling Flatlist
            // renderar NewsCard komponenten, skickar newsData.articles som data (från useNewsApi)
            contentContainerStyle={{ gap: 10, marginTop: 20 }}
            style={styles.flatlist}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={newsData.articles}
            renderItem={renderNews}
            keyExtractor={(item, index) => index.toString()}
            //snapToAlignment={"center"}
            snapToInterval={width + 10}
            decelerationRate={0.9}
            //overScrollMode="always"
          />
        )}
      </View>
      <View style={styles.middleStaticContainer}>
        {/* Mittsektion med statiskt innehåll */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Mittsektion</Text>
        </View>
      </View>
      <View style={styles.bottomHorizontalContainer}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Senast tillagda</Text>
          <TouchableOpacity onPress={goToList}>
            <Text style={styles.textDetail}>Se alla</Text>
          </TouchableOpacity>
        </View>
        {/* INNEHÅLL Horizontell scroll 
        // Använder isLoadingShoes från useApi för conditional rendering
        */}
        {isLoadingShoes ? (
          <View style={[styles.loadingContainer, { paddingBottom: 90 }]}>
            <ActivityIndicator size={"large"} color={COLORS.primary} />
            <Text style={{ textAlign: "center" }}>Laddar...</Text>
          </View>
        ) : (
          <FlatList
            // Horizontal scrolling Flatlist
            // renderar ShoeMiniCard komponenten, skickar shoesData som data (från useApi)
            // renderar 5 första items i flatlist
            contentContainerStyle={{
              gap: 20,
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 20,
            }}
            snapToInterval={width - 64}
            decelerationRate={0.9}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderShoeMiniCard}
            // Visa 5 senaste skorna
            data={shoesData.filter((item, index) => index < 5)}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>

      {/* BOTTOMSHEET component 
        När användare klickar på ett ShoeMiniCard skickas data för kortet till handleCardPress funktionen
        som sätter bottomSheetVisible till true samt data till setSelectedShoeMiniCard
        skickar med data till props
      */}
      {selectedShoeMiniCard && (
        <CustomBottomSheet
          isVisible={bottomSheetVisible}
          title={"Ändra din sko"}
          selectedData={selectedShoeMiniCard}
          onClose={handleCardClose}
          onUpdate={refetchShoes}
        />
      )}
    </View>
  );
};

export default Home;
