import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import indiaGeoJson from '../data/indiaGeoJson.js';

// Fix for default markers in React Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

function MapPage() {
  const [mines, setMines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMines = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/data/mines');
        if (!response.ok) {
          throw new Error('Failed to fetch mines data');
        }
        const data = await response.json();
        setMines(data);
      } catch (err) {
        console.error("Failed to fetch mines:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMines();
  }, []);

  const indiaBounds = [
    [6.55, 68.11], 
    [35.67, 97.40]
  ];

  const customMarkerIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-white">Loading mines data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-red-400">
          <h2 className="text-xl mb-2">Error Loading Data</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white mb-2">India Coal Mines Map</h1>
            <p className="text-gray-300">
              Interactive map showing coal mine locations across India
            </p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-400">
              <span>Total Mines: {mines.length}</span>
              <span>•</span>
              <span>Click markers for details</span>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative">
            <MapContainer 
              center={[22.59, 78.96]} 
              zoom={5} 
              style={{ height: '70vh', width: '100%' }}
              maxBounds={indiaBounds}
              minZoom={4}
              maxZoom={12}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              <GeoJSON 
                data={indiaGeoJson} 
                style={() => ({
                  color: '#10b981',
                  weight: 2,
                  fillColor: "#065f46",
                  fillOpacity: 0.1,
                })} 
              />
              
              {mines.map((mine, index) => {
                if (!mine.Latitude || !mine.Longitude) return null;
                
                const lat = parseFloat(mine.Latitude);
                const lng = parseFloat(mine.Longitude);
                
                if (isNaN(lat) || isNaN(lng)) return null;

                return (
                  <Marker 
                    key={`${mine['Mine Name']}-${index}`} 
                    position={[lat, lng]}
                    icon={customMarkerIcon}
                  >
                    <Popup maxWidth={400} className="custom-popup">
                      <div className="p-3">
                        <h3 className="font-bold text-lg mb-2 text-gray-800">
                          {mine['Mine Name']}
                        </h3>
                        
                        <div className="space-y-2 text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="font-semibold text-gray-700">Location:</span>
                              <p className="text-gray-600">{mine.Location || 'N/A'}, {mine.District || 'N/A'}</p>
                              <p className="text-gray-600">{mine.State || 'N/A'}, {mine.Country || 'N/A'}</p>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Status:</span>
                              <p className="text-gray-600">{mine.Status || 'N/A'}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="font-semibold text-gray-700">Mine Type:</span>
                              <p className="text-gray-600">{mine.Type || 'N/A'}</p>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Coal Type:</span>
                              <p className="text-gray-600">{mine['Coal Type'] || 'N/A'}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="font-semibold text-gray-700">Coal Grade:</span>
                              <p className="text-gray-600">{mine['Coal Grade'] || 'N/A'}</p>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Opening Year:</span>
                              <p className="text-gray-600">{mine['Opening Year'] || 'N/A'}</p>
                            </div>
                          </div>
                          
                          <div className="border-t pt-2 mt-2">
                            <h4 className="font-semibold text-gray-700 mb-1">Production & Environmental Data:</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="font-medium text-gray-600">Capacity:</span>
                                <p className="text-gray-600">{mine.Capacity || 'N/A'} Mtpa</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Production:</span>
                                <p className="text-gray-600">{mine.Production || 'N/A'} Mtpa</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <div>
                                <span className="font-medium text-gray-600">Mine Size:</span>
                                <p className="text-gray-600">{mine['Mine Size'] || 'N/A'} km²</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Workforce:</span>
                                <p className="text-gray-600">{mine['Workforce Size'] || 'N/A'} people</p>
                              </div>
                            </div>
                            <div className="mt-1">
                              <span className="font-medium text-gray-600">Methane Emissions:</span>
                              <p className="text-red-600 font-medium">{mine['CO2 Emissions'] || 'N/A'} M tonnes/yr</p>
                            </div>
                            <div className="mt-1">
                              <span className="font-medium text-gray-600">Coordinates:</span>
                              <p className="text-gray-600">{lat.toFixed(4)}, {lng.toFixed(4)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>

          {/* Footer Info */}
          <div className="p-4 bg-gray-700 text-xs text-gray-400">
            <p>Data source: Global Coal Mine Tracker • Map tiles: OpenStreetMap</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPage;