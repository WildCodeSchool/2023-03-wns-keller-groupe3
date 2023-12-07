import { Image, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function CityCard({ city }: any) {
  const navigation = useNavigation<any>();
  return (
    <View className='h-screen'>
      <Pressable
        onPress={() => navigation.navigate("Map", { cityId: city.id })}
        className='w-80 h-4/5 p-2 '
      >
        <Image
          source={{ uri: city.picture }}
          className='z-0 h-full rounded-lg'
        />
      </Pressable>
      <Text className='text-center text-lg font-bold text-gray-600'>
        {city.name}
      </Text>
    </View>
  );
}

export default CityCard;
