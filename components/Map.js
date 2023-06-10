import { View, Text } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { StyleSheet } from "react-native";

const Map = () => {
  return (
    <MapView
      style={styles.mapView}
      mapType="mutedStandard"
      initialRegion={{
        latitude: 37.78825,
        longtitude: -122.4324,
        latitudeDelta: 0.0922,
        longtitudeDelta: 0.0421,
      }}
    />
  );
};

export default Map;

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
});
