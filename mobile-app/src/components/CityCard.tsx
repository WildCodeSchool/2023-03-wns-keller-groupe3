import { View, Image, Text, Pressable } from "react-native";
import { City } from "../graphql/__generated__/graphql";

interface CityCardProps {
  city: Partial<City>;
  navigation: any;
}

function CityCard({ city, navigation }: CityCardProps) {
  return (
    <Pressable
      onPress={() => navigation.navigate("Accueil")}
      className="CardShadowHover max-w-sm rounded-lg border-b-[6px] border-primary bg-base-100 shadow-xl"
    >
      <View className="h-48 md:h-28">
        <Image
          source={{ uri: city.picture }}
          className="rounded-t-lg h-full w-full"
        />
      </View>
      <View className="card-body border-t-2 border-primary">
        <Text className="card-title text-base-content md:h-8 w-auto">
          {city.name}
        </Text>
      </View>
    </Pressable>
  );
}

export default CityCard;
