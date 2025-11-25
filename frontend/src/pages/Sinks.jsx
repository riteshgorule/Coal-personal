import { useState, useMemo } from 'react';
import { Trees, Leaf, Zap, Factory, Mountain, DollarSign, Save, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { useEmissions } from '../EmissionsContext';

export default function Sinks() {
  const { emissionsSummary, emissionRecords } = useEmissions();
  
  // Calculate total emissions from all records
  const totalEmissions = useMemo(() => {
    return emissionRecords.reduce((sum, record) => {
      return sum + (record.calculations?.totalEmissions || 0);
    }, 0);
  }, [emissionRecords]);

  // Form state for sink inputs
  const [sinkData, setSinkData] = useState({
    // Tree/Reforestation
    numberOfTrees: '',
    treeAge: '',
    forestArea: '',
    
    // Renewable Energy
    solarCapacity: '',
    windCapacity: '',
    hydroCapacity: '',
    
    // Carbon Capture
    captureCapacity: '',
    captureEfficiency: '',
    
    // Soil Management
    soilArea: '',
    soilType: 'agricultural',
    managementPractice: 'conventional',
    
    // Carbon Credits
    creditsAcquired: '',
    creditValue: '',
  });

  // Calculation constants
  const TREE_FACTORS = {
    young: 5,    // kg CO2 per tree per year (0-5 years)
    medium: 20,  // kg CO2 per tree per year (6-15 years)
    mature: 50,  // kg CO2 per tree per year (15+ years)
    perHectare: 10000, // kg CO2 per hectare per year
  };

  const RENEWABLE_FACTORS = {
    solar: 0.5,  // kg CO2 offset per kW per day
    wind: 0.6,   // kg CO2 offset per kW per day
    hydro: 0.4,  // kg CO2 offset per kW per day
  };

  const SOIL_FACTORS = {
    agricultural: { conventional: 100, conservation: 500, organic: 800 },
    grassland: { conventional: 300, conservation: 600, organic: 900 },
    wetland: { conventional: 800, conservation: 1200, organic: 1500 },
  };

  // Calculate individual sinks
  const calculations = useMemo(() => {
    // Tree Sink
    let treeSink = 0;
    const numTrees = parseFloat(sinkData.numberOfTrees) || 0;
    const treeAge = parseFloat(sinkData.treeAge) || 0;
    const forestArea = parseFloat(sinkData.forestArea) || 0;
    
    if (numTrees && treeAge) {
      let factor = TREE_FACTORS.young;
      if (treeAge >= 15) factor = TREE_FACTORS.mature;
      else if (treeAge >= 6) factor = TREE_FACTORS.medium;
      treeSink += numTrees * factor * 365; // Annual
    }
    
    if (forestArea) {
      treeSink += forestArea * TREE_FACTORS.perHectare;
    }

    // Renewable Sink
    let renewableSink = 0;
    const solar = parseFloat(sinkData.solarCapacity) || 0;
    const wind = parseFloat(sinkData.windCapacity) || 0;
    const hydro = parseFloat(sinkData.hydroCapacity) || 0;
    
    if (solar) renewableSink += solar * RENEWABLE_FACTORS.solar * 365;
    if (wind) renewableSink += wind * RENEWABLE_FACTORS.wind * 365;
    if (hydro) renewableSink += hydro * RENEWABLE_FACTORS.hydro * 365;

    // Capture Sink
    let captureSink = 0;
    const capacity = parseFloat(sinkData.captureCapacity) || 0;
    const efficiency = parseFloat(sinkData.captureEfficiency) || 0;
    
    if (capacity && efficiency) {
      captureSink = (capacity * 1000 * efficiency) / 100; // tons to kg
    }

    // Soil Sink
    let soilSink = 0;
    const soilArea = parseFloat(sinkData.soilArea) || 0;
    
    if (soilArea) {
      const factor = SOIL_FACTORS[sinkData.soilType]?.[sinkData.managementPractice] || 0;
      soilSink = soilArea * factor;
    }

    // Carbon Credit Sink
    let carbonCreditSink = 0;
    const credits = parseFloat(sinkData.creditsAcquired) || 0;
    const creditValue = parseFloat(sinkData.creditValue) || 0;
    
    if (credits && creditValue) {
      carbonCreditSink = credits * creditValue;
    }

    // Total Sink
    const totalSink = treeSink + renewableSink + captureSink + soilSink + carbonCreditSink;

    // Net Carbon Balance
    const netCarbonBalance = totalEmissions - totalSink;

    return {
      treeSink,
      renewableSink,
      captureSink,
      soilSink,
      carbonCreditSink,
      totalSink,
      netCarbonBalance,
      status: netCarbonBalance > 0 ? 'carbon-positive' : 'carbon-negative',
    };
  }, [sinkData, totalEmissions]);

  const handleInputChange = (field, value) => {
    setSinkData(prev => ({ ...prev, [field]: value }));
  };

  const [savedSinks, setSavedSinks] = useState([]);

  const handleSave = () => {
    const newSink = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      data: { ...sinkData },
      calculations: { ...calculations },
    };
    setSavedSinks(prev => [newSink, ...prev]);
    
    // Reset form
    setSinkData({
      numberOfTrees: '', treeAge: '', forestArea: '',
      solarCapacity: '', windCapacity: '', hydroCapacity: '',
      captureCapacity: '', captureEfficiency: '',
      soilArea: '', soilType: 'agricultural', managementPractice: 'conventional',
      creditsAcquired: '', creditValue: '',
    });
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Carbon Sinks Calculator</h1>
          <p className="text-gray-400">Calculate your total carbon sink and view net carbon balance</p>
        </div>

        {/* Carbon Balance Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Total Emissions</div>
            <div className="text-3xl font-bold text-red-400 mb-2">
              {(totalEmissions / 1000).toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">tons CO₂</div>
            <div className="text-xs text-gray-400 mt-2">From {emissionRecords.length} records</div>
          </div>
          {/* <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Total Sink</div>
            <div className="text-3xl font-bold text-emerald-400 mb-2">
             {(calculations.totalSink / 1000).toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">tons CO₂ offset</div>
            <div className="text-xs text-gray-400 mt-2">Current calculation</div>
          </div> */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Net Carbon Balance</div>
            <div className={`text-3xl font-bold mb-2 flex items-center ${
              calculations.netCarbonBalance > 0 ? 'text-red-400' : 'text-emerald-400'
            }`}>
              {calculations.netCarbonBalance > 0 ? (
                <TrendingUp className="w-6 h-6 mr-2" />
              ) : (
                <TrendingDown className="w-6 h-6 mr-2" />
              )}
              {(calculations.netCarbonBalance / 1000).toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">
              {calculations.status === 'carbon-positive' ? '⚠️ Carbon Positive' : '✅ Carbon Negative'}
            </div>
          </div>
        </div>

        {/* Sink Breakdown */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-900 border border-emerald-800 rounded-lg p-4">
            <Trees className="w-8 h-8 text-emerald-500 mb-2" />
            <div className="text-lg font-bold text-white">{(calculations.treeSink / 1000).toFixed(2)}</div>
            <div className="text-xs text-gray-400">tons CO₂ - Trees</div>
          </div>
          <div className="bg-gray-900 border border-yellow-800 rounded-lg p-4">
            <Zap className="w-8 h-8 text-yellow-500 mb-2" />
            <div className="text-lg font-bold text-white">{(calculations.renewableSink / 1000).toFixed(2)}</div>
            <div className="text-xs text-gray-400">tons CO₂ - Renewable</div>
          </div>
          <div className="bg-gray-900 border border-blue-800 rounded-lg p-4">
            <Factory className="w-8 h-8 text-blue-500 mb-2" />
            <div className="text-lg font-bold text-white">{(calculations.captureSink / 1000).toFixed(2)}</div>
            <div className="text-xs text-gray-400">tons CO₂ - Capture</div>
          </div>
          <div className="bg-gray-900 border border-amber-800 rounded-lg p-4">
            <Mountain className="w-8 h-8 text-amber-500 mb-2" />
            <div className="text-lg font-bold text-white">{(calculations.soilSink / 1000).toFixed(2)}</div>
            <div className="text-xs text-gray-400">tons CO₂ - Soil</div>
          </div>
          <div className="bg-gray-900 border border-green-800 rounded-lg p-4">
            <DollarSign className="w-8 h-8 text-green-500 mb-2" />
            <div className="text-lg font-bold text-white">{(calculations.carbonCreditSink / 1000).toFixed(2)}</div>
            <div className="text-xs text-gray-400">tons CO₂ - Credits</div>
          </div>
        </div>

        {/* Input Forms */}
        <div className="space-y-6">
          {/* Tree/Reforestation Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Trees className="w-6 h-6 text-emerald-500 mr-3" />
              <h2 className="text-xl font-semibold text-white">Tree Planting / Reforestation</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Number of Trees</label>
                <input
                  type="number"
                  value={sinkData.numberOfTrees}
                  onChange={(e) => handleInputChange('numberOfTrees', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tree Age (years)</label>
                <input
                  type="number"
                  value={sinkData.treeAge}
                  onChange={(e) => handleInputChange('treeAge', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">0-5: Young, 6-15: Medium, 15+: Mature</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Forest Area (hectares)</label>
                <input
                  type="number"
                  value={sinkData.forestArea}
                  onChange={(e) => handleInputChange('forestArea', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Renewable Energy Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-yellow-500 mr-3" />
              <h2 className="text-xl font-semibold text-white">Renewable Energy</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Solar Capacity (kW)</label>
                <input
                  type="number"
                  value={sinkData.solarCapacity}
                  onChange={(e) => handleInputChange('solarCapacity', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Wind Capacity (kW)</label>
                <input
                  type="number"
                  value={sinkData.windCapacity}
                  onChange={(e) => handleInputChange('windCapacity', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Hydro Capacity (kW)</label>
                <input
                  type="number"
                  value={sinkData.hydroCapacity}
                  onChange={(e) => handleInputChange('hydroCapacity', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Carbon Capture Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Factory className="w-6 h-6 text-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-white">Carbon Capture & Storage</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Capture Capacity (tons CO₂/year)</label>
                <input
                  type="number"
                  value={sinkData.captureCapacity}
                  onChange={(e) => handleInputChange('captureCapacity', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Capture Efficiency (%)</label>
                <input
                  type="number"
                  value={sinkData.captureEfficiency}
                  onChange={(e) => handleInputChange('captureEfficiency', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0-100"
                />
              </div>
            </div>
          </div>

          {/* Soil Management Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Mountain className="w-6 h-6 text-amber-500 mr-3" />
              <h2 className="text-xl font-semibold text-white">Soil Management</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Soil Area (hectares)</label>
                <input
                  type="number"
                  value={sinkData.soilArea}
                  onChange={(e) => handleInputChange('soilArea', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Soil Type</label>
                <select
                  value={sinkData.soilType}
                  onChange={(e) => handleInputChange('soilType', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="agricultural">Agricultural</option>
                  <option value="grassland">Grassland</option>
                  <option value="wetland">Wetland</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Management Practice</label>
                <select
                  value={sinkData.managementPractice}
                  onChange={(e) => handleInputChange('managementPractice', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="conventional">Conventional</option>
                  <option value="conservation">Conservation</option>
                  <option value="organic">Organic</option>
                </select>
              </div>
            </div>
          </div>

          {/* Carbon Credits Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="w-6 h-6 text-green-500 mr-3" />
              <h2 className="text-xl font-semibold text-white">Carbon Credits</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Credits Acquired</label>
                <input
                  type="number"
                  value={sinkData.creditsAcquired}
                  onChange={(e) => handleInputChange('creditsAcquired', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Credit Value (kg CO₂ per credit)</label>
                <input
                  type="number"
                  value={sinkData.creditValue}
                  onChange={(e) => handleInputChange('creditValue', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="1000"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full flex justify-center items-center py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-lg transition-all"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Sink Calculation
          </button>
        </div>

        {/* Saved Calculations */}
        {savedSinks.length > 0 && (
          <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Saved Sink Records</h2>
            <div className="space-y-4">
              {savedSinks.map((sink) => (
                <div key={sink.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-400">
                        {new Date(sink.timestamp).toLocaleString()}
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Total Sink:</span>
                          <span className="text-emerald-400 font-bold ml-2">
                            {(sink.calculations.totalSink / 1000).toFixed(2)} tons
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Net Balance:</span>
                          <span className={`font-bold ml-2 ${
                            sink.calculations.netCarbonBalance > 0 ? 'text-red-400' : 'text-emerald-400'
                          }`}>
                            {(sink.calculations.netCarbonBalance / 1000).toFixed(2)} tons
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Status:</span>
                          <span className="ml-2">
                            {sink.calculations.status === 'carbon-positive' ? '⚠️' : '✅'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-8 bg-blue-900/20 border border-blue-800 rounded-xl p-6">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Formula Used</h3>
              <p className="text-gray-300 mb-2">
                <strong>Total Sink = </strong>Tree Sink + Renewable Sink + Capture Sink + Soil Sink + Carbon Credit Sink
              </p>
              <p className="text-gray-300">
                <strong>Net Carbon Balance = </strong>Total Emissions - Total Sink
              </p>
              <p className="text-sm text-gray-400 mt-3">
                • Total emissions are fetched from your saved emission records<br />
                • All sink values are calculated based on industry-standard factors<br />
                • Negative balance means you're carbon negative (good!) ✅
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
