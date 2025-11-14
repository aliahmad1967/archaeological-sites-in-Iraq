import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapProps {
  destinations: {
    id: number;
    name: string;
    englishName: string;
    category: string;
    period: string;
    location: string;
    coordinates: string;
    description: string;
    fullDescription: string;
    highlights: string[];
    visitInfo: {
      bestTime: string;
      duration: string;
      difficulty: string;
      facilities: string;
    };
    image: string;
    rating: number;
    reviews: number;
  }[];
}

const Map: React.FC<MapProps> = ({ destinations }) => {
  const parseCoordinates = (coords: string): [number, number] | null => {
    const parts = coords.replace('°N', '').replace('°E', '').split(', ');
    if (parts.length === 2) {
      const lat = parseFloat(parts[0]);
      const lon = parseFloat(parts[1]);
      if (!isNaN(lat) && !isNaN(lon)) {
        return [lat, lon];
      }
    }
    return null;
  };

  return (
    <MapContainer center={[33.3152, 44.3661]} zoom={6} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {destinations.map((destination) => {
        const position = parseCoordinates(destination.coordinates);
        if (position) {
          return (
            <Marker key={destination.id} position={position}>
              <Popup>
                <b>{destination.name}</b>
                <br />
                {destination.description}
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
};

export default Map;