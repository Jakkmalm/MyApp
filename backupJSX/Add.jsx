import React, { useState } from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Add = ({ fetchShoes }) => {
  // https://www.youtube.com/watch?v=BecN2PxyR_0

  // Skapa states för respektive egenskap
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  // Skapa state för hålla koll om post sker - deafult False
  // För conditional rendering
  const [isPosting, setIsPosting] = useState(false);

  const submitPost = async () => {
    setIsPosting(true);
    const response = await fetch("http://192.168.1.204:3000/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: price,
        color: color,
        brand: brand,
        type: type,
      }),
    });
    // Återställa states
    setIsPosting(false);
    setPrice("");
    setColor("");
    setBrand("");
    setType("");
    fetchShoes();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Här kommer en meny</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Color:</Text>
        <TextInput style={styles.input} value={color} onChangeText={setColor} />
        <Text style={styles.label}>Brand:</Text>
        <TextInput style={styles.input} value={brand} onChangeText={setBrand} />
        <Text style={styles.label}>Type:</Text>
        <TextInput style={styles.input} value={type} onChangeText={setType} />
        <Button
          title={isPosting ? "Lägger till..." : "Lägg till"}
          onPress={submitPost}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: COLORS.primary,
  },
  form: {
    
  },
});

export default Add;
