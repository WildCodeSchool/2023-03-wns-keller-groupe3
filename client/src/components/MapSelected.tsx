import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Map, { POI } from "./Map";
import { GET_ONE_CITY } from "../graphql/queries";

export default function MapSelected() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ONE_CITY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <div key={data.getCityBy.id}>
        <Map
          id={data.getCityBy.id}
          lat={data.getCityBy.latitude}
          long={data.getCityBy.longitude}
          poi={data.getCityBy.pointsOfInterest.map((poi: POI) => poi)}
        />
      </div>
    </div>
  );
}
