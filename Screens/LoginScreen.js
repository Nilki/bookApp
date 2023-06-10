import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recommendations, setRecommendations] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://172.27.24.204:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // User authenticated successfully
        console.log(data.message);
        Alert.alert("Success", data.message, [
          { text: "OK", onPress: () => navigation.navigate("MapScreen") },
        ]);
        fadeIn();
      } else {
        // Error occurred while authenticating user
        console.error(data.message);
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "An error occurred while logging in. Please try again."
      );
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Login
      </Animated.Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#000"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#000"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleLogin();
          fadeIn();
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.texts}>I Don't Have Account</Text>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate("RegisterUserScreen")}
      >
        <Text style={styles.buttonTexts}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#d35722",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttons: {
    // backgroundColor: "#d35722",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonTexts: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    color: "#d35722",
  },
  texts: {
    fontSize: 18,
    marginRight: 5,
    fontWeight: "bold",
  },
});

export default LoginScreen;
