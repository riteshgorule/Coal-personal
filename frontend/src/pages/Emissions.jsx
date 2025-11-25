import { Calendar, MapPin, Filter, Plus, Search } from 'lucide-react';

export default function Emissions() {
  const emissionData = [
    {
      id: 1,
      site: 'Mine Site A - North Sector',
      location: 'Region 1',
      amount: 2450,
      date: '2025-11-24',
      source: 'Excavation',
      status: 'normal',
    },
    {
      id: 2,
      site: 'Mine Site B - East Sector',
      location: 'Region 2',
      amount: 3120,
      date: '2025-11-24',
      source: 'Transportation',
      status: 'warning',
    },
    {
      id: 3,
      site: 'Mine Site C - West Sector',
      location: 'Region 1',
      amount: 1890,
      date: '2025-11-23',
      source: 'Processing',
      status: 'normal',
    },
    {
      id: 4,
      site: 'Mine Site D - South Sector',
      location: 'Region 3',
      amount: 2760,
      date: '2025-11-23',
      source: 'Excavation',
      status: 'alert',
    },
    {
      id: 5,
      site: 'Mine Site E - Central Sector',
      location: 'Region 2',
      amount: 2230,
      date: '2025-11-22',
      source: 'Transportation',
      status: 'normal',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-white mb-2">Emissions Tracking</h1>
            <p className="text-gray-400">Monitor and analyze carbon emissions from all mining sites</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all">
            <Plus className="w-5 h-5 mr-2" />
            Add Emission Record
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Today's Emissions</div>
            <div className="text-3xl font-bold text-white mb-2">5,570</div>
            <div className="text-sm text-gray-500">tons CO₂</div>
            <div className="text-sm text-orange-500 mt-2">+8% from yesterday</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">This Week</div>
            <div className="text-3xl font-bold text-white mb-2">32,450</div>
            <div className="text-sm text-gray-500">tons CO₂</div>
            <div className="text-sm text-emerald-500 mt-2">-3% from last week</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">This Month</div>
            <div className="text-3xl font-bold text-white mb-2">128,900</div>
            <div className="text-sm text-gray-500">tons CO₂</div>
            <div className="text-sm text-orange-500 mt-2">+5% from last month</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Active Sources</div>
            <div className="text-3xl font-bold text-white mb-2">24</div>
            <div className="text-sm text-gray-500">emission points</div>
            <div className="text-sm text-gray-400 mt-2">Across all sites</div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
            <h2 className="text-xl font-semibold text-white">Emission Records</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search sites..."
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <button className="inline-flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all">
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-800">
                  <th className="pb-3 text-gray-400 font-medium text-sm">Site</th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">Location</th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">Amount (tons CO₂)</th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">Date</th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">Source</th>
                  <th className="pb-3 text-gray-400 font-medium text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {emissionData.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
                  >
                    <td className="py-4 text-white font-medium">{record.site}</td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-400">
                        <MapPin className="w-4 h-4 mr-1" />
                        {record.location}
                      </div>
                    </td>
                    <td className="py-4 text-white font-semibold">{record.amount.toLocaleString()}</td>
                    <td className="py-4">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {record.date}
                      </div>
                    </td>
                    <td className="py-4 text-gray-400">{record.source}</td>
                    <td className="py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          record.status === 'alert'
                            ? 'bg-red-500/10 text-red-500'
                            : record.status === 'warning'
                            ? 'bg-yellow-500/10 text-yellow-500'
                            : 'bg-emerald-500/10 text-emerald-500'
                        }`}
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
            <div className="text-sm text-gray-400">Showing 5 of 142 records</div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded transition-all text-sm">
                Previous
              </button>
              <button className="px-3 py-1 bg-emerald-600 text-white rounded transition-all text-sm">
                1
              </button>
              <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded transition-all text-sm">
                2
              </button>
              <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded transition-all text-sm">
                3
              </button>
              <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded transition-all text-sm">
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Emissions by Source</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">Excavation</span>
                <span className="text-emerald-500 font-semibold">45%</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">5,602 tons</div>
              <div className="text-sm text-gray-500">Last 30 days</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">Transportation</span>
                <span className="text-emerald-500 font-semibold">30%</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">3,735 tons</div>
              <div className="text-sm text-gray-500">Last 30 days</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">Processing</span>
                <span className="text-emerald-500 font-semibold">25%</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">3,113 tons</div>
              <div className="text-sm text-gray-500">Last 30 days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}