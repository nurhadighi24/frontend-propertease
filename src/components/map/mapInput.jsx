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

export default function MapInput({ lat, lng, onLatLngChange }) {
  const [markerLat, setMarkerLat] = useState(lat);
  const [markerLng, setMarkerLng] = useState(lng);

  const mapRef = useRef(null); // Menyimpan referensi peta

  useEffect(() => {
    setMarkerLat(lat);
    setMarkerLng(lng);
  }, [lat, lng]);

  const LocationFinder = () => {
    const map = useMapEvents({
      click(e) {
        setMarkerLat(e.latlng.lat);
        setMarkerLng(e.latlng.lng);
        onLatLngChange(e.latlng.lat, e.latlng.lng);
      },
    });
    // Menyimpan referensi peta
    mapRef.current = map;

    return null;
  };

  // Update center whenever marker position changes
  useEffect(() => {
    if (mapRef.current && markerLat !== null && markerLng !== null) {
      mapRef.current.panTo([markerLat, markerLng]); // Menggunakan referensi peta untuk memanggil panTo
    }
  }, [markerLat, markerLng]);

  // Update latlng when user dragging the marker
  const handleMarkerDragEnd = (e) => {
    const newLat = e.target.getLatLng().lat;
    const newLng = e.target.getLatLng().lng;
    setMarkerLat(newLat);
    setMarkerLng(newLng);
    onLatLngChange(newLat, newLng);
  };

  return (
    <>
      <MapContainer
        center={[-6.175392, 106.827156]}
        zoom={14}
        className="w-4/6"
      >
        <LocationFinder />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markerLat !== null && markerLng !== null && (
          <Marker
            position={[markerLat, markerLng]}
            draggable={true}
            eventHandlers={{
              dragend: handleMarkerDragEnd,
            }}
          >
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
