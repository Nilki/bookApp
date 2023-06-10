import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";

const AddBook = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setIsbn] = useState("");
  const navigation = useNavigation();
  const [requestState, setRequestState] = useState(true);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://172.27.24.204:5000/add_book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookName, author, description, isbn }),
      });
      const data = await response.json();
      if (response.ok) {
        // User registered successfully
        console.log(data.message);
        setRequestState(true);
        Alert.alert(
          "Added new book",
          data.message,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("BookList"),
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
          "Something went wrong",
          data.message,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("BookList"),
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add New Book</Text>
      <TextInput
        style={styles.input}
        placeholder="Book Name"
        value={bookName}
        onChangeText={(text) => setBookName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={(text) => setAuthor(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ISBN"
        value={isbn}
        onChangeText={(text) => setIsbn(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#f4511e",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddBook;
