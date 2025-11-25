import React, { useState } from 'react';

function ClimatiqPage() {
  const [formData, setFormData] = useState({
    emission_factor: {
      activity_id: 'electricity-supply_grid-source_residual_mix',
      data_version: '28.28',
      region: 'AU'
    },
    parameters: {
      energy: 100,
      energy_unit: 'kWh'
    }
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const activityOptions = [
    { 
      value: 'electricity-supply_grid-source_residual_mix', 
      label: 'Grid Electricity (Residual Mix)', 
      paramType: 'energy', 
      unit: 'kWh', 
      example: 100,
      description: 'Electricity from grid - verified working'
    },
    { 
      value: 'fuel_type-solid_fuel-coal-combustion', 
      label: 'Coal Combustion', 
      paramType: 'energy', 
      unit: 'kWh', 
      example: 100,
      description: 'Coal fuel combustion for energy'
    },
    { 
      value: 'fuel_type-liquid_fuel-diesel-combustion', 
      label: 'Diesel Fuel Combustion', 
      paramType: 'energy', 
      unit: 'kWh', 
      example: 100,
      description: 'Diesel fuel combustion'
    },
    { 
      value: 'transport-vehicle_type_heavy_goods_vehicle-fuel_source_na', 
      label: 'Heavy Freight Transport', 
      paramType: 'distance', 
      unit: 'km', 
      example: 100,
      description: 'Heavy goods vehicle transport'
    },
    { 
      value: 'transport-vehicle_type_freight_train-fuel_source_na', 
      label: 'Rail Freight Transport', 
      paramType: 'distance', 
      unit: 'km', 
      example: 100,
      description: 'Rail freight transportation'
    }
  ];

  const regions = [
    { value: 'GB', label: 'United Kingdom (GB)' },
    { value: 'US', label: 'United States (US)' },
    { value: 'AU', label: 'Australia (AU)' },
    { value: 'DE', label: 'Germany (DE)' },
    { value: 'IN', label: 'India (IN)' },
    { value: 'CN', label: 'China (CN)' },
    { value: 'CA', label: 'Canada (CA)' }
  ];

  // Helper functions to get current values based on parameter type
  const getCurrentActivity = () => {
    return activityOptions.find(opt => opt.value === formData.emission_factor.activity_id);
  };

  const getCurrentAmount = () => {
    const activity = getCurrentActivity();
    const paramType = activity?.paramType || 'energy';
    
    if (paramType === 'energy') return formData.parameters.energy || '';
    if (paramType === 'distance') return formData.parameters.distance || '';
    return formData.parameters.energy || '';
  };

  const getCurrentUnit = () => {
    const activity = getCurrentActivity();
    const paramType = activity?.paramType || 'energy';
    
    if (paramType === 'energy') return formData.parameters.energy_unit || 'kWh';
    if (paramType === 'distance') return formData.parameters.distance_unit || 'km';
    return formData.parameters.energy_unit || 'kWh';
  };

  const getUnitOptions = () => {
    const activity = getCurrentActivity();
    const paramType = activity?.paramType || 'energy';
    
    if (paramType === 'energy') {
      return [
        { value: 'kWh', label: 'Kilowatt Hours (kWh)' },
        { value: 'MWh', label: 'Megawatt Hours (MWh)' },
        { value: 'GJ', label: 'Gigajoules (GJ)' },
        { value: 'TJ', label: 'Terajoules (TJ)' }
      ];
    } else if (paramType === 'distance') {
      return [
        { value: 'km', label: 'Kilometers (km)' },
        { value: 'mi', label: 'Miles (mi)' },
        { value: 'm', label: 'Meters (m)' }
      ];
    }
    return [{ value: 'kWh', label: 'Kilowatt Hours (kWh)' }];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'activity_id') {
      const selectedActivity = activityOptions.find(opt => opt.value === value);
      const paramType = selectedActivity?.paramType || 'energy';
      const unit = selectedActivity?.unit || 'kWh';
      const example = selectedActivity?.example || 1000;
      
      // Create the parameter object based on type
      let parameters = {};
      if (paramType === 'energy') {
        parameters = { energy: example, energy_unit: unit };
      } else if (paramType === 'distance') {
        parameters = { distance: example, distance_unit: unit };
      } else {
        parameters = { energy: example, energy_unit: unit };
      }
      
      setFormData(prev => ({
        ...prev,
        emission_factor: {
          activity_id: value,
          data_version: '28.28',
          region: 'AU'
        },
        parameters
      }));
    } else if (name === 'amount') {
      const selectedActivity = activityOptions.find(opt => opt.value === formData.emission_factor.activity_id);
      const paramType = selectedActivity?.paramType || 'energy';
      
      setFormData(prev => {
        const newParameters = { ...prev.parameters };
        if (paramType === 'energy') {
          newParameters.energy = parseFloat(value) || 0;
        } else if (paramType === 'distance') {
          newParameters.distance = parseFloat(value) || 0;
        }
        
        return {
          ...prev,
          parameters: newParameters
        };
      });
    } else if (name === 'amount_unit') {
      const selectedActivity = activityOptions.find(opt => opt.value === formData.emission_factor.activity_id);
      const paramType = selectedActivity?.paramType || 'energy';
      
      setFormData(prev => {
        const newParameters = { ...prev.parameters };
        if (paramType === 'energy') {
          newParameters.energy_unit = value;
        } else if (paramType === 'distance') {
          newParameters.distance_unit = value;
        }
        
        return {
          ...prev,
          parameters: newParameters
        };
      });
    } else if (name === 'region') {
      setFormData(prev => ({
        ...prev,
        emission_factor: {
          ...prev.emission_factor,
          region: value
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/data/climatiq/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emission_factor: formData.emission_factor,
          parameters: formData.parameters
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Climatiq API error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      emission_factor: {
        activity_id: 'electricity-supply_grid-source_residual_mix',
        data_version: '28.28',
        region: 'AU'
      },
      parameters: {
        energy: 100,
        energy_unit: 'kWh'
      }
    });
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white mb-2">Carbon Footprint Calculator</h1>
            <p className="text-gray-300">
              Calculate CO2 emissions for various coal-related activities using Climatiq API
            </p>
            <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
              <p className="text-yellow-200 text-sm">
                <strong>Rate Limit:</strong> Community Plan allows 250 requests per month. Use wisely during development.
              </p>
            </div>
            <div className="mt-4 p-4 bg-green-900/30 border border-green-600 rounded-lg">
              <h4 className="text-green-200 font-medium mb-2">Quick Guide - Verified Activities:</h4>
              <ul className="text-green-100 text-sm space-y-1">
                <li>• <strong>Select Region:</strong> Choose UK (GB) or US for best coverage</li>
                <li>• <strong>Grid Electricity:</strong> Enter kWh consumed (e.g., 1000)</li>
                <li>• <strong>Coal Combustion:</strong> Enter kg of solid coal burned (e.g., 500)</li>
                <li>• <strong>Diesel Fuel:</strong> Enter litres of diesel consumed (e.g., 100)</li>
                <li>• <strong>Freight Transport:</strong> Enter km traveled (e.g., 150-500)</li>
              </ul>
              <p className="text-green-200 text-xs mt-2">
                <strong>Tip:</strong> If no data found, try UK (GB) or US regions for better coverage.
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Calculate Emissions</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Activity Type
                    </label>
                    <select
                      name="activity_id"
                      value={formData.emission_factor.activity_id}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      {activityOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label} ({option.unit})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Region
                    </label>
                    <select
                      name="region"
                      value={formData.emission_factor.region}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      {regions.map(region => (
                        <option key={region.value} value={region.value}>
                          {region.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={getCurrentAmount()}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={`Enter amount (e.g., ${getCurrentActivity()?.example || 1000})`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Unit
                    </label>
                    <select
                      name="amount_unit"
                      value={getCurrentUnit()}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      {getUnitOptions().map(unit => (
                        <option key={unit.value} value={unit.value}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Calculating...
                        </div>
                      ) : (
                        'Calculate Emissions'
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
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Results</h2>
                
                {error && (
                  <div className="mb-4 p-4 bg-red-900/30 border border-red-600 rounded-lg">
                    <h3 className="text-red-200 font-medium mb-2">Error</h3>
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                {result && (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-900/30 border border-green-600 rounded-lg">
                      <h3 className="text-green-200 font-medium mb-3">Carbon Footprint Results</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                          <span className="text-gray-300">Total CO2 Emissions:</span>
                          <span className="text-white font-bold text-lg">
                            {result.co2e_kg ? `${result.co2e_kg.toFixed(4)} kg CO2e` : 'N/A'}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                          <span className="text-gray-300">CO2 Emissions:</span>
                          <span className="text-white font-medium">
                            {result.co2_kg ? `${result.co2_kg.toFixed(4)} kg CO2` : 'N/A'}
                          </span>
                        </div>

                        {result.emission_factor && (
                          <div className="mt-4 p-3 bg-gray-700 rounded">
                            <h4 className="text-gray-300 font-medium mb-2">Emission Factor Details:</h4>
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Source:</span>
                                <span className="text-gray-200">{result.emission_factor.source}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Region:</span>
                                <span className="text-gray-200">{result.emission_factor.region}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Year:</span>
                                <span className="text-gray-200">{result.emission_factor.year}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Factor:</span>
                                <span className="text-gray-200">
                                  {result.emission_factor.kg_co2e_per_unit?.toFixed(6)} kg CO2e per unit
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="mt-4 p-3 bg-blue-900/30 border border-blue-600 rounded">
                          <h4 className="text-blue-200 font-medium mb-2">Environmental Context:</h4>
                          <p className="text-blue-100 text-sm">
                            This emission is equivalent to {result.co2e_kg ? (result.co2e_kg / 2.3).toFixed(2) : '0'} liters 
                            of gasoline consumed or driving {result.co2e_kg ? (result.co2e_kg / 0.411).toFixed(1) : '0'} km 
                            in an average passenger car.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!result && !error && !loading && (
                  <div className="p-8 text-center text-gray-400">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zM7 8a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p>Fill out the form to calculate carbon emissions</p>
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

export default ClimatiqPage;