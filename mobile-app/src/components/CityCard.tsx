import { Image, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function CityCard({ city }: any) {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      onPress={() => navigation.navigate("Map", { cityId: city.id })}
      className="mx-2 my-auto h-4/5 w-80 flex flex-col justify-center"
    >
      <Image source={{ uri: city.picture }} className="h-full rounded-lg" />
      <Text className="text-center text-xl text-gray-600">{city.name}</Text>
    </Pressable>
  );
}

export default CityCard;
