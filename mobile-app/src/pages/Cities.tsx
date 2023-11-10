// import backgroundImage from "../../assets/europeMap.png";
import React, { useState } from "react";
import CityCard from "../components/CityCard";
import useGetCities from "../graphql/hook/useGetCities";
import { Pressable, Text, TextInput, View } from "react-native";

function Cities({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const { cities, loading, error } = useGetCities();
  if (loading) return <Text className="text-center">Loading...</Text>;
  if (error)
    return <Text className="text-center">Error : {error.message}</Text>;
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <View className="md:ml-[96px] min-h-screen bg-base-content">
      <View className="flex flex-col max-w-xs min-[705px]:max-w-2xl md:max-w-[26rem] lg:max-w-[40rem] xl:max-w-[54rem] mx-auto pt-5">
        <Text className="text-2xl text-base-100 font-bold py-5">
          Choisissez votre ville
        </Text>
        <View className="flex items-center">
          <TextInput className="input input-bordered bg-base-content text-accent-content w-full" />
        </View>
        <View className="flex items-center">
          <TextInput
            className="input input-bordered bg-base-content text-accent-content w-full"
            placeholder="Recherche"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </View>
      </View>
      <View className="pt-5 pb-16 grid min-[705px]:grid-cols-2 min-[705px]:!max-[44rem] lg:grid-cols-3 xl:grid-cols-4 justify-center md:max-w-md lg:max-w-2xl xl:max-w-4xl mx-auto">
        {filteredCities.map((city) => (
          <Pressable
            key={city.id}
            onPress={() => navigation.navigate("Map")}
            className="m-4 w-80 md:w-48"
          >
            <CityCard city={city} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default Cities;
