import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export interface POI {
  name: string;
  category: string;
  description: string;
  poiLat: number;
  poiLong: number;
}

interface MapProps {
  id: string;
  lat: number;
  long: number;
  poi: POI[];
}

export default function Map({ id, lat, long, poi }: MapProps) {
  // const testLatLng = new LatLng(lat, long);
  // console.log(testLatLng.lat);
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
          <Marker position={[p.poiLat, p.poiLong]}>
            <Popup>
              <span> Catégorie : {p.category}</span>
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
