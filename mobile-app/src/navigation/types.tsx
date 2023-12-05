import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Cities: undefined;
  Profile: { userId: string };
  Map: { cityId: string };
  CityCard: { cityId: string };
};

export type CitiesProps = NativeStackScreenProps<RootStackParamList, "Cities">;
export type CityCardProps = NativeStackScreenProps<
  RootStackParamList,
  "CityCard"
>;
