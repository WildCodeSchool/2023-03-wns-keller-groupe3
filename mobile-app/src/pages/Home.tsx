import { Text, ImageBackground, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Home() {
  const navigation = useNavigation<any>();
  return (
    <View className='h-screen'>
      <Text className='text-4xl font-bold text-gray-600 mt-16 mx-auto'>
        City Guide
      </Text>
      <Text className='text-gray-600 text-lg mt-4 p-2 mx-auto'>
        Parcourir une ville comme un local. Aller droit au but. Découvrir des
        perles rares.
      </Text>
      <Image
        className='h-80 w-64 mx-auto mt-8'
        source={require("../../assets/logo.png")}
      />
    </View>
  );
}

export default Home;
