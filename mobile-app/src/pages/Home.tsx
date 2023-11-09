import React from "react";
import { Text, View, Pressable, Button } from "react-native";
import type { HomeTabScreenProps } from "../navigation/types";
import { NavigationContainer, RouteProp } from "@react-navigation/native";

function Home({ navigation }: HomeTabScreenProps<"Accueil">) {
  // TODO Trouver un type correct pour la prop navigation
  return (
    <View className="hero-content text-center text-neutral-content">
      <View className="max-w-2-xl text-base-content">
        <Text className="mb-5 text-5xl font-bold">City Guide</Text>
        <Text className="mb-5">
          Parcourir une ville comme un local. Aller droit au but. Découvrir des
          perles rares.
        </Text>
        <Button
          onPress={() => navigation.navigate("Villes")}
          title="Explorez maintenant !"
        />
      </View>
    </View>
  );
}

export default Home;
