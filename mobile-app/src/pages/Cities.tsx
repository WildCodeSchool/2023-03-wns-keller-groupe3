import { useState } from "react";
import { ScrollView, Text, TextInput, FlatList } from "react-native";
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
    <ScrollView className='' scrollEnabled>
      <FlatList
        horizontal
        data={filteredCities}
        keyExtractor={(city) => city.id.toString()}
        renderItem={({ item }) => <CityCard city={item} />}
      >
        <TextInput
          className='border border-gray-400 w-5/6 p-4 m-2 rounded-lg bg-white z-10'
          placeholder='Recherche'
          value={searchText}
          onChangeText={(e) => setSearchText(e)}
        />
      </FlatList>
    </ScrollView>
  );
}

export default Cities;
