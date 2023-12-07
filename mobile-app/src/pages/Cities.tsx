import { useState } from "react";
import { ScrollView, Text, TextInput, FlatList, View } from "react-native";
import CityCard from "../components/CityCard";
import useGetCities from "../graphql/hook/useGetCities";

function Cities() {
  const [searchText, setSearchText] = useState("");
  const { cities, loading, error } = useGetCities();

  if (loading) return <Text className='text-center'>Loading...</Text>;
  if (error) return <Text className='text-center'>Error: {error.message}</Text>;

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className='h-screen py-8 flex flex-col justify-center'>
      <TextInput
        className='border border-gray-400 mx-2 rounded-lg p-2 bg-white'
        placeholder='Recherche'
        value={searchText}
        onChangeText={(e) => setSearchText(e)}
      />
      <FlatList
        className=''
        horizontal
        data={filteredCities}
        keyExtractor={(city) => city.id.toString()}
        renderItem={({ item }) => <CityCard city={item} />}
      />
    </View>
  );
}

export default Cities;
