import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require("../assets/woman.png")}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.profileInfoContainer}>
          <Text style={styles.profileText}>Name: Nilki Upathissa</Text>
          <Text style={styles.profileText}>Email: nilki@example.com</Text>
          <Text style={styles.profileText}>Location: Dehiwala, SL</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#feefdf",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3a619",
    padding: 20,
    borderRadius: 10,
  },
  profileImageContainer: {
    marginRight: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfoContainer: {
    flex: 1,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default UserProfile;
