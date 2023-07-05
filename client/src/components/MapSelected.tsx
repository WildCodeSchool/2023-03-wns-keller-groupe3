import { useParams } from "react-router-dom";
import Map from "./Map";
import { mockData } from "../utils/mockData";

export default function MapSelected() {
  const { id } = useParams();
  // TODO fetch One city avec l'id en params avec une requête graphQL

  return (
    <div>
      {mockData
        .filter((city) => {
          if (city.id === id) {
            return city;
          }
          return null;
        })
        .map((city) => (
          <div key={city.id}>
            <Map
              id={city.id}
              poi={city.poi.map((poi) => poi)}
              lat={city.lat}
              long={city.long}
            />
          </div>
        ))}
    </div>
  );
}
