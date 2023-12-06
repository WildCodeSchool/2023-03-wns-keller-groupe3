import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
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
    <ImageBackground
      source={require("../../assets/logo.png")}
      className='h-full border-t border-gray-600'
    >
      <ScrollView className=''>
        <View className='flex items-center mx-auto w-full'>
          <TextInput
            className='border border-gray-400 w-5/6 p-4 m-2 rounded-lg bg-white'
            placeholder='Recherche'
            value={searchText}
            onChangeText={(e) => setSearchText(e)}
          />
          <FlatList
            horizontal
            data={filteredCities}
            keyExtractor={(city) => city.id.toString()}
            renderItem={({ item }) => <CityCard city={item} />}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default Cities;
