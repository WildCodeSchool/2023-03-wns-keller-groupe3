// import "leaflet/dist/leaflet.css";
import { View, Text } from "react-native";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POI } from "../graphql/mutations";
import { GET_CATEGORIES, GET_ONE_CITY } from "../graphql/queries";
import MapView, { Marker } from "react-native-maps";
import CustomToast from "../utils/CustomToast";
import { toast } from "react-toastify";
import CreatePoiModalForm from "./CreatePoiModalForm";
import { Category, Poi } from "../graphql/__generated__/graphql";
import useGetCityBy from "../graphql/hook/useGetCityBy";
import PoiCard from "./PoiCard";

interface MapProps {
  id: string;
  lat: number;
  long: number;
  allPoi: Poi[];
  route: any;
}

export default function Map({ id, lat, long, allPoi, route }: MapProps) {
  console.log(route.params);

  const { city, loading, error } = useGetCityBy({
    variables: { getCityById: route.params.cityId! },
  });

  console.log(city?.pointsOfInterest);

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
              />
            );
          })}
        </MapView>
      </View>
    </>
  );
}
