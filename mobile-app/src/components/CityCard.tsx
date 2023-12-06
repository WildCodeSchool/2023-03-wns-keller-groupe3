import { View, Image, Text, Pressable } from "react-native";
import { City } from "../graphql/__generated__/graphql";
import { CitiesProps } from "../navigation/types";
import { useNavigation } from "@react-navigation/native";

function CityCard({ city }: any) {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      onPress={() => navigation.navigate("Map", { cityId: city.id })}
      className='h-72 w-56 m-4 p-4'
    >
      <Image source={{ uri: city.picture }} className='rounded-lg h-full ' />
      <Text className='text-center text-lg font-bold'>{city.name}</Text>
    </Pressable>
  );
}

export default CityCard;
