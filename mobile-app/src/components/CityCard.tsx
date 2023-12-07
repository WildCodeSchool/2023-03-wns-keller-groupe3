import { Image, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function CityCard({ city }: any) {
  const navigation = useNavigation<any>();
  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate("Map", { cityId: city.id })}
        className='w-screen'
      >
        <Image source={{ uri: city.picture }} className='h-screen z-0 ' />
      </Pressable>
      <Text className='text-center text-lg font-bold text-gray-600'>
        {city.name}
      </Text>
    </View>
  );
}

export default CityCard;
