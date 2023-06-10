import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBook,
  faHome,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import Authentication from "./Screens/Authentication";
import LocationScreen from "./Screens/LocationScreen";
import BookDetails from "./Screens/BookDetails";
import MapScreen from "./Screens/MapScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import AddBook from "./Screens/AddBook";
import UserProfile from "./Screens/UserProfile";
import HomeScreen from "./Screens/Home";
import RegisterUserScreen from "./Screens/RegisterUserScreen";
import LoginScreen from "./Screens/LoginScreen";
import DescriptionInput from "./Screens/Description";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#a0deb0" },
  headerTitleStyle: { color: "white", fontWeight: "bold" },
  headerTintColor: "white",
  headerTitleAlign: "center",
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          switch (route.name) {
            case "HomeScreen":
              icon = faHome;
              color = "#3a3838";
              break;
            case "BookList":
              icon = faBook;
              color = "#3a3838";

              break;
            case "Find":
              icon = faSearch;
              color = "#3a3838";
              break;
            case "UserProfile":
              icon = faUser;
              color = "#3a3838";
              break;
          }

          return <FontAwesomeIcon icon={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="BookList"
        component={BookDetails}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Find"
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const [showTabs, setShowTabs] = useState(false);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="RegisterUserScreen"
            component={RegisterUserScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Location"
            component={LocationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DescriptionInput"
            component={DescriptionInput}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddBook"
            component={AddBook}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
