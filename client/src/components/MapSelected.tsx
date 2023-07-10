import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Map, { POI } from "./Map";

export const GET_ONE_CITY = gql`
  query Query($id: String!) {
    getCityBy(id: $id) {
      id
      name
      latitude
      longitude
      pointsOfInterest {
        id
        picture
        name
        latitude
        longitude
      }
    }
  }
`;

export default function MapSelected() {
  const { id } = useParams();
  // TODO fetch One city avec l'id en params avec une requête graphQL
  const { loading, error, data } = useQuery(GET_ONE_CITY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data);

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
