import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/pages/Home";
import CitiesScreen from "./src/pages/Cities";
import UserScreen from "./src/pages/User";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
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
  );
}
