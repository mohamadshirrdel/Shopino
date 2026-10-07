import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;

      setPosition({
        lat,
        lng,
      });
    },
  });

  return position && <Marker position={[position.lat, position.lng]} />;
}

const LocationPicker = ({ position, setPosition }) => {
  const defaultPosition = [35.7219, 51.3347];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300">
      <MapContainer
        center={position ? [position.lat, position.lng] : defaultPosition}
        zoom={13}
        scrollWheelZoom={true}
        className="h-[350px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
