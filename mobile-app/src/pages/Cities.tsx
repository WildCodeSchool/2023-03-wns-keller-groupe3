import { useState } from "react";
import { ScrollView, Text, TextInput, FlatList, View } from "react-native";
import CityCard from "../components/CityCard";
import useGetCities from "../graphql/hook/useGetCities";

function Cities() {
  const [searchText, setSearchText] = useState("");
  const { cities, loading, error } = useGetCities();

  if (loading) return <Text className="text-center">Loading...</Text>;
  if (error) return <Text className="text-center">Error: {error.message}</Text>;

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className="h-screen pt-6">
      <View className="w-full py-2 px-4">
        <TextInput
          className="border border-gray-400 w-full py-2 px-3 rounded-lg bg-white"
          placeholder="Recherche"
          value={searchText}
          onChangeText={(e) => setSearchText(e)}
        />
      </View>
      <FlatList
        horizontal
        data={filteredCities}
        keyExtractor={(city) => city.id.toString()}
        renderItem={({ item }) => <CityCard city={item} />}
      />
    </View>
  );
}

export default Cities;
