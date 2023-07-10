import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Map, { POI } from "./Map";

export const GET_ONE_CITY = gql`
  query Query($id: String!) {
    getCityById(id: $id) {
      id
      name
      latitude
      longitude
      pointsOfInterest {
        id
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
      <div key={data.getCityById.id}>
        <Map
          id={data.getCityById.id}
          lat={data.getCityById.latitude}
          long={data.getCityById.longitude}
          poi={data.getCityById.pointsOfInterest.map((poi: POI) => poi)}
        />
      </div>
    </div>
  );
}
