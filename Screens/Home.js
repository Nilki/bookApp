import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [books, setBooks] = useState([
    {
      userId: 1,
      book_title: "To Kill a Mockingbird",
      book_isbn: "9780446310789",
      book_authors: "Harper Lee",
      book_desc:
        "A Pulitzer Prize-winning novel set in the Depression-era South. It explores themes of racial injustice and loss of innocence.",
      image_url: "https://images.gr-assets.com/books/1356466917l/15061345.jpg",
    },
  ]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://172.27.24.204:5000/rec1");
      const data = await response.json();
      const shuffledBooks = shuffleArray(data.recommendations);
      setBooks(shuffledBooks);
    } catch (error) {
      console.error(error);
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const navigation = useNavigation();
  <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {books.map((book) => (
          <View key={book.userId} style={styles.bookContainer}>
            <Image source={{ uri: book.image_url }} style={styles.bookImage} />
            <Text style={styles.bookTitle}>{book.book_title}</Text>
            <Text style={styles.bookText}>ISBN: {book.book_isbn}</Text>
            <Text style={styles.bookText}>Author: {book.book_authors}</Text>
            <Text style={styles.bookText}>User Id: {book.userId}</Text>
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
  },
  plusIcon: {
    marginRight: 5,
  },
  plusIconText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
