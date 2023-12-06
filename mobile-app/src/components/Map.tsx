import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useGetCityBy from "../graphql/hook/useGetCityBy";

interface MapProps {
  route: any;
}

export default function Map({ route }: MapProps) {
  console.log(route.params);

  const { city, loading, error } = useGetCityBy({
    variables: { getCityById: route.params.cityId! },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <>
      <View id='map'>
        <MapView
          className='w-full h-full'
          initialRegion={{
            latitude: city.latitude,
            longitude: city.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {city?.pointsOfInterest?.map((poi, index) => {
            let markerPosition = {
              latitude: poi.latitude,
              longitude: poi.longitude,
            };
            return (
              <Marker
                key={index}
                coordinate={markerPosition}
                title={poi.name}
                description={poi.description}
              />
            );
          })}
        </MapView>
      </View>
    </>
  );
}
