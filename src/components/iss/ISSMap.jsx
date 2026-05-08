import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom ISS icon
const issIcon = new L.DivIcon({
  html: `<div style="
    width: 40px; height: 40px;
    background: #FF6B6B;
    border: 4px solid #000;
    box-shadow: 4px 4px 0px 0px #000;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; font-weight: 900;
  ">🛸</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  className: '',
});

// Component to recenter map
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView([position.latitude, position.longitude], map.getZoom(), { animate: true });
    }
  }, [position, map]);
  return null;
}

export default function ISSMap({ currentPosition, positions, darkMode }) {
  if (!currentPosition) return null;

  const trajectory = positions.map((p) => [p.latitude, p.longitude]);

  return (
    <div className="border-4 border-black dark:border-neo-bg shadow-neo-md dark:shadow-neo-md-dark">
      <MapContainer
        center={[currentPosition.latitude, currentPosition.longitude]}
        zoom={3}
        style={{ height: '450px', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={
            darkMode
              ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
              : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }
        />

        <Marker position={[currentPosition.latitude, currentPosition.longitude]} icon={issIcon}>
          <Popup>
            <div className="font-grotesk font-bold">
              <p className="text-sm uppercase tracking-wide">🛸 ISS Position</p>
              <p>Lat: {currentPosition.latitude.toFixed(4)}</p>
              <p>Lon: {currentPosition.longitude.toFixed(4)}</p>
            </div>
          </Popup>
        </Marker>

        {trajectory.length > 1 && (
          <Polyline
            positions={trajectory}
            pathOptions={{
              color: '#FF6B6B',
              weight: 4,
              dashArray: '10, 6',
            }}
          />
        )}

        <RecenterMap position={currentPosition} />
      </MapContainer>
    </div>
  );
}
