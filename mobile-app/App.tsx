import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/pages/Home";
import CitiesScreen from "./src/pages/Cities";
import UserScreen from "./src/pages/User";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Coucou Cityguide !</Text>
      <StatusBar style="auto" />

      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Accueil" component={HomeScreen} />
          <Tab.Screen name="Villes" component={CitiesScreen} />
          <Tab.Screen name="Profil" component={UserScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}
