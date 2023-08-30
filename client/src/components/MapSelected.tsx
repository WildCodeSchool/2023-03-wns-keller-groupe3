import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_ONE_CITY } from "../graphql/queries";
import Map from "./Map";

export default function MapSelected() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ONE_CITY, {
    variables: { getCityById: id! },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <div key={data?.getCityBy.id}>
        <Map
          id={data!.getCityBy.id}
          lat={data!.getCityBy.latitude}
          long={data!.getCityBy.longitude}
          allPoi={data!.getCityBy.pointsOfInterest.map((poi) => poi)}
        />
      </div>
    </div>
  );
}
