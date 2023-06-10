import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegisterUserScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [animation] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const [requestState, setRequestState] = useState(true);

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://172.27.24.204:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, full_name: fullname }),
      });
      const data = await response.json();
      if (response.ok) {
        // User registered successfully
        console.log(data.message);
        setRequestState(true);
        Alert.alert(
          "Successfylly User Registered",
          data.message,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("LoginScreen"),
            },
          ],
          {
            backgroundColor: "#9c7474",
            color: "#333",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
          }
        );
      } else {
        setRequestState(false);

        // Error occurred while registering user
        console.error(data.message);
        Alert.alert(
          "User already exists",
          data.message,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("RegisterUserScreen"),
            },
          ],
          {
            backgroundColor: "#f2f2f2",
            color: "#333",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
          }
        );
      }
    } catch (error) {
      console.error(error);
      setRequestState(false);
    }
  };

  const animateButton = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  };

  const buttonAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const gif = require("../assets/nilki.gif");

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Create an Account</Text> */}
      {/* <Gif
        source={{
          uri: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
        }}
        style={{ width: 200, height: 200 }}
        resizeMode="cover"
      /> */}
      <Image
        source={gif}
        style={{ width: 400, height: 400 }}
        resizeMode="cover"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#000"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#000"
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullname}
        onChangeText={setFullName}
        placeholderTextColor="#000"
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          handleSignUp();
          animateButton();
        }}
      >
        <Animated.Text
          style={[
            styles.buttonText,
            { transform: [{ rotate: buttonAnimation }] },
          ]}
        >
          Sign Up
        </Animated.Text>
      </TouchableOpacity>
      <Text style={styles.texts}>Already have an account?</Text>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.buttonTexts}>Log in</Text>
      </TouchableOpacity>
      {/* {requestState == false && (
        <Text style={styles.errors}> User already exists</Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  // title: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   marginBottom: 10,
  //   color: "#d35722",
  // },
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
  buttonContainer: {
    width: "80%",
    height: 50,
    backgroundColor: "#d35722",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errors: {
    color: "#760606",
    fontSize: 18,
    marginTop: 9,
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

export default RegisterUserScreen;
