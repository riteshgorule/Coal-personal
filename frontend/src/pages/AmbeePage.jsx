import React, { useState } from 'react';

function AmbeePage() {
  const [formData, setFormData] = useState({
    lat: '',
    lng: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Predefined locations for easy testing - focusing on coal mining regions
  const presetLocations = [
    { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
    // Major coal mining regions in India
    { name: 'Jharia Coalfield, Jharkhand', lat: 23.7644, lng: 86.4134 },
    { name: 'Dhanbad, Jharkhand', lat: 23.7957, lng: 86.4304 },
    { name: 'Korba, Chhattisgarh', lat: 22.3595, lng: 82.7501 },
    { name: 'Raipur, Chhattisgarh', lat: 21.2514, lng: 81.6296 },
    { name: 'Singareni, Telangana', lat: 17.3850, lng: 79.1193 },
    { name: 'Nagpur, Maharashtra', lat: 21.1458, lng: 79.0882 },
    { name: 'Raniganj, West Bengal', lat: 23.6189, lng: 87.1230 },
    { name: 'Talcher, Odisha', lat: 20.9517, lng: 85.2312 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePresetLocation = (location) => {
    setFormData({
      lat: location.lat.toString(),
      lng: location.lng.toString()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const lat = parseFloat(formData.lat);
    const lng = parseFloat(formData.lng);

    if (isNaN(lat) || isNaN(lng)) {
      setError('Please enter valid latitude and longitude values');
      setLoading(false);
      return;
    }

    if (lat < -90 || lat > 90) {
      setError('Latitude must be between -90 and 90');
      setLoading(false);
      return;
    }

    if (lng < -180 || lng > 180) {
      setError('Longitude must be between -180 and 180');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/data/ambee/latest?lat=${lat}&lng=${lng}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Ambee API error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      lat: '',
      lng: ''
    });
    setResult(null);
    setError(null);
  };

  const getAQILevel = (aqi) => {
    if (!aqi) return { level: 'Unknown', color: 'gray', description: 'No data available' };
    
    if (aqi <= 50) return { level: 'Good', color: 'green', description: 'Air quality is satisfactory' };
    if (aqi <= 100) return { level: 'Moderate', color: 'yellow', description: 'Air quality is acceptable' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'orange', description: 'Members of sensitive groups may experience health effects' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'red', description: 'Everyone may begin to experience health effects' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: 'purple', description: 'Health warnings of emergency conditions' };
    return { level: 'Hazardous', color: 'maroon', description: 'Emergency conditions' };
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white mb-2">Live Environmental Data</h1>
            <p className="text-gray-300">
              Get real-time air quality and environmental data for any location using Ambee API
            </p>
            <div className="mt-4 p-3 bg-blue-900/30 border border-blue-600 rounded-lg">
              <p className="text-blue-200 text-sm">
                <strong>Rate Limit:</strong> Sandbox/Trial allows 100 calls per day.
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="xl:col-span-1">
                <h2 className="text-xl font-semibold text-white mb-4">Location Coordinates</h2>
                
                {/* Preset Locations */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Quick Select:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {presetLocations.map((location, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handlePresetLocation(location)}
                        className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white py-2 px-3 rounded transition-colors duration-200"
                      >
                        {location.name}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Latitude
                    </label>
                    <input
                      type="number"
                      name="lat"
                      value={formData.lat}
                      onChange={handleInputChange}
                      step="0.0001"
                      min="-90"
                      max="90"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 28.6139"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Longitude
                    </label>
                    <input
                      type="number"
                      name="lng"
                      value={formData.lng}
                      onChange={handleInputChange}
                      step="0.0001"
                      min="-180"
                      max="180"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 77.2090"
                      required
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Loading...
                        </div>
                      ) : (
                        'Get Live Data'
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>

              {/* Results Section */}
              <div className="xl:col-span-2">
                <h2 className="text-xl font-semibold text-white mb-4">Environmental Data</h2>
                
                {error && (
                  <div className="mb-4 p-4 bg-red-900/30 border border-red-600 rounded-lg">
                    <h3 className="text-red-200 font-medium mb-2">Error</h3>
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                {result && (
                  <div className="space-y-6">
                    {/* Air Quality Section */}
                    {result.stations && result.stations.length > 0 && (
                      <div className="p-4 bg-gray-700 rounded-lg">
                        <h3 className="text-white font-medium mb-4 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                          Air Quality Data
                        </h3>
                        
                        {result.stations.map((station, index) => {
                          const aqiInfo = getAQILevel(station.AQI);
                          return (
                            <div key={index} className="mb-4 p-4 bg-gray-800 rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-gray-300 font-medium">Station: {station.placeName}</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${aqiInfo.color}-600 text-white`}>
                                  {aqiInfo.level}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-white">{station.AQI || 'N/A'}</div>
                                  <div className="text-xs text-gray-400">AQI</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-white">{station.PM25 || 'N/A'}</div>
                                  <div className="text-xs text-gray-400">PM2.5 (µg/m³)</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-white">{station.PM10 || 'N/A'}</div>
                                  <div className="text-xs text-gray-400">PM10 (µg/m³)</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-white">{station.CO || 'N/A'}</div>
                                  <div className="text-xs text-gray-400">CO (mg/m³)</div>
                                </div>
                              </div>

                              <div className="mt-3 text-sm text-gray-400">
                                <p>{aqiInfo.description}</p>
                                {station.updatedAt && (
                                  <p className="mt-1">Last updated: {new Date(station.updatedAt).toLocaleString()}</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Additional Environmental Data */}
                    {(result.weather || result.pollen) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Weather Data */}
                        {result.weather && (
                          <div className="p-4 bg-gray-700 rounded-lg">
                            <h3 className="text-white font-medium mb-3 flex items-center">
                              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 3.314-2.686 6-6 6s-6-2.686-6-6a4.75 4.75 0 01.332-1.973z" clipRule="evenodd" />
                              </svg>
                              Weather
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Temperature:</span>
                                <span className="text-white">{result.weather.temperature}°C</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Humidity:</span>
                                <span className="text-white">{result.weather.humidity}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Pressure:</span>
                                <span className="text-white">{result.weather.pressure} hPa</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Wind Speed:</span>
                                <span className="text-white">{result.weather.windSpeed} m/s</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Pollen Data */}
                        {result.pollen && (
                          <div className="p-4 bg-gray-700 rounded-lg">
                            <h3 className="text-white font-medium mb-3 flex items-center">
                              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 001.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Pollen Count
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Tree Pollen:</span>
                                <span className="text-white">{result.pollen.tree || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Grass Pollen:</span>
                                <span className="text-white">{result.pollen.grass || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Weed Pollen:</span>
                                <span className="text-white">{result.pollen.weed || 'N/A'}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Location Info */}
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <h3 className="text-white font-medium mb-3">Location Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Latitude:</span>
                          <span className="text-white">{formData.lat}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Longitude:</span>
                          <span className="text-white">{formData.lng}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!result && !error && !loading && (
                  <div className="p-12 text-center text-gray-400">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p>Enter coordinates to get live environmental data</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AmbeePage;