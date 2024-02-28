import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  FlatList,
} from "react-native";
import Shoes from "../components/Shoes";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../constants";

const List = () => {
  // useState för api-data - default tom array
  const [shoesData, setShoesData] = useState([]);

  const fetchShoes = async () => {
    try {
      // utvecklingsmiljö - lokalt
      // Byt till https://zealous-foal-yoke.cyclic.app/ http://192.168.1.204:3000/
      const response = await fetch("http://192.168.1.204:3000/");
      console.log(response);
      const data = await response.json();
      console.log("JSON data", data);

      setShoesData(data);

      // om error - console.error
    } catch (error) {
      console.error("FEL I HÄMTNINGEN", error);
    }
  };

  // useEffect - kör fetch när komponent renderas
  useEffect(() => {
    fetchShoes();
  }, []);

  // renderShoe returnerar <Shoes/> med prop
  // shoeData och fetchShoes
  const renderShoe = ({ item }) => (
    <Shoes shoeData={item} updateList={fetchShoes} />
  );

  return (
    <SafeAreaView style={styles.scrollViewContainer}>
      <FlatList
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        data={shoesData}
        renderItem={renderShoe}
        keyExtractor={(index) => index}
        ListHeaderComponent={
          <View style={styles.headerWrapper}>
            <Text>HÄR ÄR ALLA SKOR</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 50 }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  headerWrapper: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },

  flatList: {
    flexGrow: 1,
    width: "100%",
    paddingHorizontal: 25,
    paddingTop: 50,
  },
});

export default List;
