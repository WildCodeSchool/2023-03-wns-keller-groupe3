import { useParams } from "react-router-dom";

import Map from "./Map";
import useGetCityBy from "../graphql/hook/useGetCityBy";

export default function MapSelected() {
  const { id } = useParams();
  const { city, loading, error } = useGetCityBy({
    variables: { getCityById: id! },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <div key={city.id}>
        <Map
          id={city.id}
          lat={city.latitude}
          long={city.longitude}
          allPoi={city.pointsOfInterest.map((poi) => poi)}
        />
      </div>
    </div>
  );
}
