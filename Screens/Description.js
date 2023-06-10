import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const DescriptionInput = ({ route }) => {
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState(null);

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const navigation = useNavigation();

  useEffect(() => {
    const { region } = route.params;
    setRegion(region);
    console.log(region);
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://172.27.24.204:5000/rec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          location: [region.latitude, region.longitude],
        }),
      });
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.texts}> Discover your next book Detination</Text>
      <Text style={styles.subTexts}>
        {" "}
        Explore your next literary adventure by sharing a brief description of
        your reading preferences.
      </Text>
      <TextInput
        multiline
        numberOfLines={5}
        value={description}
        onChangeText={handleDescriptionChange}
        style={styles.input}
      />
      {/* <Button title="Submit" onPress={handleSubmit} /> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttons} onPress={handleSubmit}>
          <Text style={styles.buttonTexts}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 90,
  },
  input: {
    height: 300,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    fontSize: 20,
  },
  texts: {
    fontSize: 24,
    marginRight: 5,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 30,
    color: "#d35722",
  },
  subTexts: {
    fontSize: 14,
    marginRight: 5,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 30,
    color: "#000000",
  },
  buttons: {
    backgroundColor: "#d35722",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 45,
    width: 200,
  },
  buttonTexts: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DescriptionInput;
