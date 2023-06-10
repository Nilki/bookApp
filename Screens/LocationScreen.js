import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { SafeAreaView } from "react-native-safe-area-context";

const LocationScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelectLocation = (data, details) => {
    const { lat: latitude, lng: longitude } = details.geometry.location;
    setSelectedLocation({ latitude, longitude, description: data.description });
  };

  const renderMarker = () => {
    if (!selectedLocation) return null;

    const { latitude, longitude, description } = selectedLocation;
    return <Marker coordinate={{ latitude, longitude }} title={description} />;
  };

  const zoomToLocation = () => {
    if (selectedLocation) {
      const { latitude, longitude } = selectedLocation;
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const mapRef = useRef(null);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.bottom}>
        <GooglePlacesAutocomplete
          placeholder="Where to?"
          styles={{
            textInputContainer: {
              width: "80%",
              height: 40,
              backgroundColor: "#FFFFFF",
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              height: 45,
              fontSize: 16,
            },
          }}
          onPress={handleSelectLocation}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
        <TouchableOpacity style={styles.button} onPress={zoomToLocation}>
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.mapSection}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={
            selectedLocation
              ? {
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }
              : {
                  latitude: 7.8731,
                  longitude: 80.7718,
                  latitudeDelta: 10,
                  longitudeDelta: 10,
                }
          }
        >
          {renderMarker()}
        </MapView>
      </View>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapSection: {
    height: "50%",
  },
  bottom: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  map: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    width: 200,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
