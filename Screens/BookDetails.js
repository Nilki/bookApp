import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const BookDetails = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      name: "To Kill a Mockingbird",
      ISBN: "9780446310789",
      author: "Harper Lee",
      owner: "John Doe",
      description:
        "A Pulitzer Prize-winning novel set in the Depression-era South. It explores themes of racial injustice and loss of innocence.",
      image: require("../assets/other_words_for_home.jpg"),
    },
    {
      id: 2,
      name: "The Great Gatsby",
      ISBN: "9780743273565",
      author: "F. Scott Fitzgerald",
      owner: "Jane Smith",
      description:
        "A classic novel about the decadent lifestyle of wealthy Americans during the Roaring Twenties. It explores themes of love, wealth, and the corruption of the American Dream.",
      image: require("../assets/the_tiny_dragon.jpg"),
    },
    {
      id: 3,
      name: "1984",
      ISBN: "9780451524935",
      author: "George Orwell",
      owner: "Sarah Johnson",
      description:
        "A dystopian novel set in a future totalitarian society. It explores themes of government oppression, individual freedom, and the power of language.",
      image: require("../assets/the_metropolist.jpg"),
    },
  ]);

  useEffect(() => {
    fetch("http://172.27.24.204:5000/get_books", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
        setBooks(data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const navigation = useNavigation();
  const route = useRoute();

  <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddBook")}
        style={styles.plusIconContainer}
      >
        <FontAwesomeIcon
          icon={faPlus}
          size={20}
          color="#fff"
          style={styles.plusIcon}
        />
        <Text style={styles.plusIconText}>Add Book</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {books.map((book, i) => (
          <View key={i} style={styles.bookContainer}>
            <Image
              source={require("../assets/foxread.jpg")}
              style={styles.bookImage}
            />
            <Text style={styles.bookTitle}>{book.bookName}</Text>
            <Text style={styles.bookText}>ISBN: {book.isbn}</Text>
            <Text style={styles.bookText}>Author: {book.author}</Text>
            <Text style={styles.bookText}>Description: {book.description}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#283f53",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  bookContainer: {
    backgroundColor: "#bbc5ce",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: "90%",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bookImage: {
    width: 200,
    height: 300,
    resizeMode: "contain",
    marginBottom: 10,
    alignSelf: "center",
  },
  bookText: {
    fontSize: 16,
    marginBottom: 5,
  },
  plusIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#bbc5ceb5",
    padding: 10,
    borderRadius: 20,
  },
  plusIcon: {
    marginRight: 5,
  },
  plusIconText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default BookDetails;
