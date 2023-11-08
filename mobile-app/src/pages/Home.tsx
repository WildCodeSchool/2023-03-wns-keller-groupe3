import React from "react";
import { Text, View, Pressable } from "react-native";
import { NavigationContainer, RouteProp } from "@react-navigation/native";

// Créez un type pour la stack de navigation

function Home({ navigation }) {
  return (
    <View className="hero-content text-center text-neutral-content">
      <View className="max-w-2-xl text-base-content">
        <Text className="mb-5 text-5xl font-bold">City Guide</Text>
        <Text className="mb-5">
          Parcourir une ville comme un local. Aller droit au but. Découvrir des
          perles rares.
        </Text>
        <Pressable
          className="btn"
          onPress={() => navigation.navigate("Villes")}
        >
          <Text>Explorez maintenant !</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Home;
