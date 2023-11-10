import { useParams } from "react-router-dom";
import { View, Text } from "react-native";
import Map from "./Map";
import useGetCityBy from "../graphql/hook/useGetCityBy";

export default function MapSelected() {
  const { id } = useParams();
  const { city, loading, error } = useGetCityBy({
    variables: { getCityById: id! },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <View>
      <View key={city.id}>
        <Map
          id={city.id}
          lat={city.latitude}
          long={city.longitude}
          allPoi={city.pointsOfInterest.map((poi) => poi)}
        />
      </View>
    </View>
  );
}
