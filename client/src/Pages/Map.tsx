import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const lat = 50.6333;
const long = 3.0667;

export default function Map() {
  return (
    <div id="map">
      <MapContainer center={[lat, long]} zoom={14} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[50.6333, 3.0667]}>
          <Popup>Bar à Bière</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
