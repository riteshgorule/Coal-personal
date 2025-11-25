import { useState } from 'react';
import { Calendar, MapPin, Filter, Plus, Search, X, CheckCircle } from 'lucide-react';
import { useEmissions } from '../EmissionsContext';

export default function EmissionsComponent() {
  const { currentFormData, setCurrentFormData, currentCalculations, emissionsSummary, addEmissionRecord, emissionRecords } = useEmissions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedRecord, setSavedRecord] = useState(null);

  const emissionData = [
    { id: 1, site: 'Mine Site A - North Sector', location: 'Region 1', amount: 2450, date: '2025-11-24', source: 'Excavation', status: 'normal' },
    { id: 2, site: 'Mine Site B - East Sector', location: 'Region 2', amount: 3120, date: '2025-11-24', source: 'Transportation', status: 'warning' },
    { id: 3, site: 'Mine Site C - West Sector', location: 'Region 1', amount: 1890, date: '2025-11-23', source: 'Processing', status: 'normal' },
    { id: 4, site: 'Mine Site D - South Sector', location: 'Region 3', amount: 2760, date: '2025-11-23', source: 'Excavation', status: 'alert' },
    { id: 5, site: 'Mine Site E - Central Sector', location: 'Region 2', amount: 2230, date: '2025-11-22', source: 'Transportation', status: 'normal' },
  ];

  const handleChange = (e) => {
    setCurrentFormData({ ...currentFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newRecord = addEmissionRecord(currentFormData);
    setSavedRecord(newRecord);
    setShowSuccess(true);
    console.log('Record saved:', newRecord); // Debug log
    console.log('All records:', emissionRecords); // Debug log
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSection(0);
    setShowSuccess(false);
    setSavedRecord(null);
    setCurrentFormData({
      site: '', location: '', excavation: '', transportation: '', fuel: '', equipment: '', workers: '', output: '', fuelType: '', reduction: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const resetForm = () => {
    setShowSuccess(false);
    setSavedRecord(null);
    setCurrentSection(0);
    setCurrentFormData({
      site: '', location: '', excavation: '', transportation: '', fuel: '', equipment: '', workers: '', output: '', fuelType: '', reduction: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-white mb-2">Emissions Tracking</h1>
            <p className="text-gray-400">Monitor and analyze carbon emissions from all mining sites</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all">
            <Plus className="w-5 h-5 mr-2" />
            Add Emission Record
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Today's Emissions</div>
            <div className="text-3xl font-bold text-white mb-2">{emissionsSummary.today.toFixed(0)}</div>
            <div className="text-sm text-gray-500">kg CO₂</div>
            <div className="text-sm text-orange-500 mt-2">Real-time calculation</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">This Week</div>
            <div className="text-3xl font-bold text-white mb-2">{emissionsSummary.week.toFixed(0)}</div>
            <div className="text-sm text-gray-500">kg CO₂</div>
            <div className="text-sm text-emerald-500 mt-2">From global state</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">This Month</div>
            <div className="text-3xl font-bold text-white mb-2">{emissionsSummary.month.toFixed(0)}</div>
            <div className="text-sm text-gray-500">kg CO₂</div>
            <div className="text-sm text-orange-500 mt-2">From global state</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Stored Records</div>
            <div className="text-3xl font-bold text-white mb-2">{emissionRecords.length}</div>
            <div className="text-sm text-gray-500">in Context</div>
            <div className="text-sm text-gray-400 mt-2">Available globally</div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
            <h2 className="text-xl font-semibold text-white">Emission Records</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="Search sites..." className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
              </div>
              <button className="inline-flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all">
                <Filter className="w-5 h-5 mr-2" />Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-800">
                  <th className="pb-3 text-gray-400 font-medium text-sm">Site</th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">Location</th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">Amount (kg CO₂)</th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">Date</th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">Source</th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {emissionRecords.length > 0 ? (
                  emissionRecords.map((record) => {
                    const emissions = record.calculations?.totalEmissions || 0;
                    const status = emissions > 3000 ? 'alert' : emissions > 2000 ? 'warning' : 'normal';
                    
                    return (
                      <tr key={record.id} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                        <td className="py-4 text-white font-medium">{record.site}</td>
                        <td className="py-4"><div className="flex items-center text-gray-400"><MapPin className="w-4 h-4 mr-1" />{record.location}</div></td>
                        <td className="py-4 text-white font-semibold">{emissions.toFixed(0)}</td>
                        <td className="py-4"><div className="flex items-center text-gray-400"><Calendar className="w-4 h-4 mr-1" />{record.date}</div></td>
                        <td className="py-4 text-gray-400">Multiple Sources</td>
                        <td className="py-4">
                          <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${status === 'alert' ? 'bg-red-500/10 text-red-500' : status === 'warning' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      No emission records yet. Click "Add Emission Record" to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{showSuccess ? 'Record Saved' : 'Add Emission Record'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors"><X className="w-6 h-6" /></button>
            </div>

            <div className="p-6">
              {!showSuccess ? (
                <div>
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <span>Step {currentSection + 1} of 10</span>
                      <span>{Math.round(((currentSection + 1) / 10) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full transition-all duration-300" style={{ width: `${((currentSection + 1) / 10) * 100}%` }}></div>
                    </div>
                  </div>

                  {currentSection === 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mine Site Name:</label>
                      <input type="text" name="site" value={currentFormData.site} onChange={handleChange} placeholder="e.g., Mine Site A" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                    </div>
                  )}

                  {currentSection === 1 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location/Region:</label>
                      <input type="text" name="location" value={currentFormData.location} onChange={handleChange} placeholder="e.g., Region 1" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                    </div>
                  )}

                  {currentSection === 2 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Excavation (tons):</label>
                      <input type="number" name="excavation" value={currentFormData.excavation} onChange={handleChange} step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                    </div>
                  )}

                  {currentSection === 3 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Transportation (km):</label>
                      <input type="number" name="transportation" value={currentFormData.transportation} onChange={handleChange} step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                    </div>
                  )}

                  {currentSection === 4 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Consumption (liters):</label>
                      <input type="number" name="fuel" value={currentFormData.fuel} onChange={handleChange} step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                    </div>
                  )}

                  {currentSection === 5 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Usage (hours):</label>
                      <input type="number" name="equipment" value={currentFormData.equipment} onChange={handleChange} step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                    </div>
                  )}

                  {currentSection === 6 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number of Workers:</label>
                      <input type="number" name="workers" value={currentFormData.workers} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                    </div>
                  )}

                  {currentSection === 7 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type:</label>
                      <select name="fuelType" value={currentFormData.fuelType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500">
                        <option value="">Select Fuel Type</option>
                        <option value="coal">Coal</option>
                        <option value="oil">Oil</option>
                        <option value="naturalGas">Natural Gas</option>
                        <option value="biomass">Biomass</option>
                      </select>
                    </div>
                  )}

                  {currentSection === 8 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Emissions after Mitigation:</label>
                      <input type="number" name="reduction" value={currentFormData.reduction} onChange={handleChange} step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                    </div>
                  )}

                  {currentSection === 9 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Annual Coal Production (tons):</label>
                      <input type="number" name="output" value={currentFormData.output} onChange={handleChange} step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                      
                      {currentFormData.output && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600 mb-2 font-semibold">Live Preview:</p>
                          <div className="text-xs text-gray-700 space-y-1">
                            <div>Total Emissions: {currentCalculations.totalEmissions.toFixed(2)} kg CO₂</div>
                            <div>Carbon Credits: {currentCalculations.carboncredits.toFixed(2)}</div>
                            <div>Worth: ${currentCalculations.worth.toFixed(2)}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    <button onClick={() => setCurrentSection(Math.max(0, currentSection - 1))} disabled={currentSection === 0} className={`px-4 py-2 rounded-md transition-all ${currentSection === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-600 text-white hover:bg-gray-700'}`}>
                      Previous
                    </button>
                    {currentSection < 9 ? (
                      <button onClick={() => setCurrentSection(currentSection + 1)} className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-all">Next</button>
                    ) : (
                      <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all">Save Record</button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center py-8">
                    <CheckCircle className="w-16 h-16 text-emerald-600 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Record Saved!</h3>
                    <p className="text-gray-600 text-center mb-4">Your data is stored and will appear on the Dashboard.</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 w-full">
                      <p className="text-sm text-gray-600 mb-2">Calculated Results:</p>
                      <div className="bg-white p-3 rounded border border-gray-300 text-xs space-y-1">
                        <div><strong>Total Emissions:</strong> {savedRecord?.calculations?.totalEmissions.toFixed(2)} kg CO₂</div>
                        <div><strong>Carbon Credits:</strong> {savedRecord?.calculations?.carboncredits.toFixed(2)}</div>
                        <div><strong>Worth:</strong> ${savedRecord?.calculations?.worth.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button onClick={resetForm} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-all">Add Another</button>
                    <button onClick={closeModal} className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-all">Done</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}