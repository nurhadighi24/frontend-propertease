// MapInput.jsx
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

export default function MapDetail({ lat, lng, onLatLngChange, mapCenter }) {
  const [markerLat, setMarkerLat] = useState(lat);
  const [markerLng, setMarkerLng] = useState(lng);

  const mapRef = useRef(null); // Menyimpan referensi peta

  useEffect(() => {
    setMarkerLat(lat);
    setMarkerLng(lng);
  }, [lat, lng]);

  // Update center whenever marker position changes
  useEffect(() => {
    if (mapRef.current && markerLat !== null && markerLng !== null) {
      mapRef.current.panTo([markerLat, markerLng]); // Menggunakan referensi peta untuk memanggil panTo
    }
  }, [markerLat, markerLng]);

  return (
    <>
      <MapContainer center={mapCenter} zoom={14} className="w-4/6">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markerLat !== null && markerLng !== null && (
          <Marker position={[markerLat, markerLng]} draggable={false}>
            <Popup>
              <span>
                Latitude: {markerLat}, Longitude: {markerLng}
              </span>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
}
