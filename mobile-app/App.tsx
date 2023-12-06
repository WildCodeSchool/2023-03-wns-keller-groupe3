import "react-native-gesture-handler";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/pages/Home";
import CitiesScreen from "./src/pages/Cities";
import UserScreen from "./src/pages/User";
import { MyStack } from "./src/components/CityCard";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";

const { manifest2 } = Constants;

const graphqlUri =
  "http://" + manifest2?.extra?.expoGo?.debuggerHost?.split(":")[0] + ":4000/";

const client = new ApolloClient({
  // uri: "https://staging.keller3.wns.wilders.dev/graphql",
  uri: graphqlUri,
  cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = "home";
              if (route.name === "Accueil") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Villes") {
                iconName = focused ? "map" : "map-outline";
              } else if (route.name === "Profil") {
                iconName = focused ? "person-circle" : "person-circle-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Accueil" component={HomeScreen} />
          <Tab.Screen name="Villes" component={CitiesScreen} />
          <Tab.Screen name="Profil" component={UserScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
