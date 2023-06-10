import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Text,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GOOGLE_MAPS_APIKEY } from "@env";

const MapScreen = ({ navigation }) => {
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState(null);

  const onPressUpdateLocation = async () => {
    try {
      // Send a POST request to your backend API endpoint
      const response = await fetch("http://172.27.24.204:5000/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: region.latitude,
          longitude: region.longitude,
        }),
      });
      const data = await response.json();
      console.log(data);

      latitude = region.latitude;
      longitude = region.longitude;

      // Navigate to the BookDetails screen after saving the location
      navigation.navigate("DescriptionInput", { region: region });
    } catch (error) {
      console.error(error);
    }
  };

  const onAddressChanged = async (text) => {
    setAddress(text);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${text}&key=${GOOGLE_MAPS_APIKEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onMarkerDragEnd = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {region && (
        <MapView style={styles.map} region={region}>
          <Marker
            coordinate={region}
            image={require("../assets/pin.png")}
            draggable
            onDragEnd={onMarkerDragEnd}
          />
        </MapView>
      )}
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        placeholderTextColor="#000000"
        onChangeText={onAddressChanged}
        value={address}
      />
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#ae8383" : "#503232",
            padding: 10,
            borderRadius: 7,
          },
        ]}
        onPress={() => {
          onPressUpdateLocation();
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Update Location</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d4c7c7",
  },
  input: {
    width: "80%",
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 20,
    color: "black",
    marginTop: 18,
  },
  map: {
    width: "100%",
    height: "80%",
  },
  buttonSubmit: {
    backgroundColor: "black",
    fontSize: 20,
  },
});

export default MapScreen;
