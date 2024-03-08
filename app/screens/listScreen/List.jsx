import React, { useState, useEffect, useCallback } from "react";
import { styles } from "./ListStyle";
import CustomBottomSheet from "../../components/bottomSheet/CustomBottomSheet";
import { useNavigation } from "@react-navigation/native";
import {
  RefreshControl,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../../constants";
import Shoes from "../../components/shoes/Shoes";
// CUSTOM HOOK
import useApi from "../../../hooks/useFetchApi";

/* KÄLLOR:
 * https://reactnative.dev/docs/refreshcontrol
 * https://reactnavigation.org/docs/use-navigation/
 */

const List = () => {
  const navigation = useNavigation();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedShoeCard, setSelectedShoeCard] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { shoesData, isLoadingShoes, refetchShoes } = useApi();

  // Refresh funktion
  // Använder refreshControl från react-native till min flatList
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchShoes();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refetchShoes]);
  console.log(refreshing);

  // useEffect för att lyssna på navigation "focus"
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetchShoes();
    });
    return unsubscribe;
  }, [navigation]);

  const handleCardPress = (shoeData) => {
    setSelectedShoeCard(shoeData);
    setBottomSheetVisible(true);
  };
  const handleCardClose = () => {
    setBottomSheetVisible(false);
    setSelectedShoeCard(null);
  };

  // rendera skor - skicka med shoeData och refetchShoes och handlecardPress som props
  const renderShoe = ({ item }) => (
    <Shoes
      shoeData={item}
      updateData={refetchShoes}
      onPress={handleCardPress}
    />
  );

  return (
    <View style={styles.container}>
      {isLoadingShoes ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color={COLORS.primary} />
          <Text style={{ textAlign: "center" }}>Laddar...</Text>
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            paddingBottom: 100,
            paddingHorizontal: 10,
          }}
          showsVerticalScrollIndicator={false}
          data={shoesData}
          renderItem={renderShoe}
          keyExtractor={(item) => item._id} // använder id som key
          ListHeaderComponent={
            <View style={styles.headerWrapper}>
              <Text style={styles.title}>Dina sparade skor</Text>
            </View>
          }
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
      )}

      {/* BOTTOMSHEET component */}
      {selectedShoeCard && (
        <CustomBottomSheet
          isVisible={bottomSheetVisible}
          title={"Ändra din sko"}
          selectedData={selectedShoeCard}
          onClose={handleCardClose}
          onUpdate={refetchShoes}
        />
      )}
    </View>
  );
};

export default List;
