import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export interface POI {
  name: string;
  categories: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  id: string;
  lat: number;
  long: number;
  poi: POI[];
}

export default function Map({ id, lat, long, poi }: MapProps) {
  console.log(poi);
  return (
    <div id="map">
      <MapContainer
        id={id}
        center={[lat, long]}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {poi.map((p) => (
          <Marker position={[p.latitude, p.longitude]}>
            <Popup>
              <span> Catégorie : {}</span>
              <br />
              <span>{p.name}</span>
              <br />
              <span>{p.description}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
