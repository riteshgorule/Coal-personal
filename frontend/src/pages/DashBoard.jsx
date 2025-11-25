import React, { useState, useEffect } from 'react';
import { TrendingUp, Factory, Users, Zap } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        console.log('Dashboard: Fetching statistics...');
        const response = await fetch('http://localhost:5000/api/data/statistics');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch statistics: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Dashboard: Statistics received:', data);
        setStats(data);
      } catch (err) {
        console.error('Dashboard: Error fetching statistics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-300">Loading coal mine statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-xl text-red-400 mb-4">Error loading statistics</p>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Coal Mine Analytics Dashboard</h1>
          <p className="text-gray-400">Monitor India's coal mining sector performance and environmental impact</p>
        </div>

        {/* Key Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-blue-600/10">
                <Factory className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="mb-2">
              <span className="text-3xl font-bold text-white">{stats?.totalMines || 0}</span>
              <span className="text-gray-400 ml-2">mines</span>
            </div>
            <p className="text-gray-400 text-sm font-medium mb-1">Total Coal Mines</p>
            <p className="text-green-400 text-sm">{stats?.operatingMines || 0} currently operating</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-yellow-600/10">
                <Zap className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <div className="mb-2">
              <span className="text-3xl font-bold text-white">{stats?.totalCapacity || 0}</span>
              <span className="text-gray-400 ml-2">Mtpa</span>
            </div>
            <p className="text-gray-400 text-sm font-medium mb-1">Total Capacity</p>
            <p className="text-blue-400 text-sm">{stats?.totalProduction || 0} Mtpa production</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-red-600/10">
                <TrendingUp className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <div className="mb-2">
              <span className="text-3xl font-bold text-white">{stats?.totalEmissions || 0}</span>
              <span className="text-gray-400 ml-2">M tonnes/yr</span>
            </div>
            <p className="text-gray-400 text-sm font-medium mb-1">Methane Emissions</p>
            <p className="text-red-400 text-sm">Environmental impact monitoring</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-green-600/10">
                <Users className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="mb-2">
              <span className="text-3xl font-bold text-white">{stats?.totalWorkforce?.toLocaleString() || 0}</span>
              <span className="text-gray-400 ml-2">people</span>
            </div>
            <p className="text-gray-400 text-sm font-medium mb-1">Total Workforce</p>
            <p className="text-green-400 text-sm">Employment in coal sector</p>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Top States */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Top States by Mine Count</h2>
            <div className="space-y-4">
              {stats?.stateDistribution && Object.entries(stats.stateDistribution).slice(0, 5).map(([state, count], index) => (
                <div key={state} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-white font-medium">{state}</div>
                      <div className="text-sm text-gray-400">{count} mines</div>
                    </div>
                  </div>
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min((count / Math.max(...Object.values(stats.stateDistribution))) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coal Types */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Coal Type Distribution</h2>
            <div className="space-y-4">
              {stats?.coalTypeDistribution && Object.entries(stats.coalTypeDistribution).map(([type, count], index) => (
                <div key={type} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${
                      index === 0 ? 'bg-emerald-500' :
                      index === 1 ? 'bg-blue-500' :
                      index === 2 ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}></div>
                    <div>
                      <div className="text-white font-medium">{type}</div>
                      <div className="text-sm text-gray-400">{count} mines</div>
                    </div>
                  </div>
                  <div className="text-white font-bold">
                    {Math.round((count / (stats?.totalMines || 1)) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Key Insights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">
                {stats?.operatingMines && stats?.totalMines ? 
                  Math.round((stats.operatingMines / stats.totalMines) * 100) : 0}%
              </div>
              <p className="text-gray-400">Mines Currently Operating</p>
              <p className="text-sm text-gray-500 mt-1">Active production facilities</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">
                {stats?.totalCapacity && stats?.totalProduction ? 
                  Math.round((stats.totalProduction / stats.totalCapacity) * 100) : 0}%
              </div>
              <p className="text-gray-400">Capacity Utilization</p>
              <p className="text-sm text-gray-500 mt-1">Production efficiency</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">
                {stats?.proposedMines || 0}
              </div>
              <p className="text-gray-400">Proposed Mines</p>
              <p className="text-sm text-gray-500 mt-1">Future capacity expansion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}