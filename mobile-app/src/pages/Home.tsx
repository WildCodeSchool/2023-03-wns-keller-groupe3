import { Text, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Home() {
  const navigation = useNavigation<any>();
  return (
    <ImageBackground
      source={require("../../assets/backgroundHome.jpg")}
      className='h-full border-t border-gray-600'
    >
      <Text className='text-4xl font-bold mt-16 ml-5 text-gray-600'>
        City Guide
      </Text>
      <Text className='ml-5 mt-8 text-gray-600 text-lg'>
        Parcourir une ville comme un local. Aller droit au but. Découvrir des
        perles rares.
      </Text>
    </ImageBackground>
  );
}

export default Home;
