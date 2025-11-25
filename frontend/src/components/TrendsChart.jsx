import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Calendar } from 'lucide-react';

const TrendsChart = ({ trendsData }) => {
  if (!trendsData || !trendsData.timeSeries || trendsData.timeSeries.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Emission Trends</h3>
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <Calendar className="w-16 h-16 mb-4 opacity-50" />
          <p>No trend data available yet</p>
          <p className="text-sm mt-2">Analyze more images to see trends</p>
        </div>
      </div>
    );
  }

  const { totalEmissions, averageEmission, trend, prediction, timeSeries, totalAnalyses } = trendsData;

  // Format data for charts
  const chartData = timeSeries.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    emission: item.emission,
    intensity: item.intensity === 'high' ? 3 : item.intensity === 'medium' ? 2 : 1,
  }));

  const getTrendIcon = () => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="w-5 h-5 text-red-400" />;
      case 'decreasing':
        return <TrendingDown className="w-5 h-5 text-green-400" />;
      default:
        return <Minus className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'increasing':
        return 'text-red-400 bg-red-500/10 border-red-500/50';
      case 'decreasing':
        return 'text-green-400 bg-green-500/10 border-green-500/50';
      default:
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/50';
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 p-6">
      <h3 className="text-xl font-bold text-white mb-6">Emission Trends & Predictions</h3>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Total Analyses</p>
          <p className="text-2xl font-bold text-white">{totalAnalyses}</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Total Emissions</p>
          <p className="text-2xl font-bold text-white">{totalEmissions.toFixed(1)}</p>
          <p className="text-xs text-gray-400">kg CO₂</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Average</p>
          <p className="text-2xl font-bold text-white">{averageEmission.toFixed(1)}</p>
          <p className="text-xs text-gray-400">kg CO₂</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Trend</p>
          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded border ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-semibold capitalize">{trend}</span>
          </div>
        </div>
      </div>

      {/* Prediction */}
      {prediction && (
        <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg p-4 mb-6 border border-purple-700/50">
          <p className="text-sm text-purple-300 mb-1">Predicted Next Period</p>
          <p className="text-2xl font-bold text-white">
            {prediction.toFixed(2)} <span className="text-lg">kg CO₂</span>
          </p>
          <p className="text-xs text-purple-200 mt-1">Based on historical data and trends</p>
        </div>
      )}

      {/* Emission Timeline Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">Emission Timeline</h4>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorEmission" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Area
              type="monotone"
              dataKey="emission"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorEmission)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Mining Intensity Chart */}
      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-3">Mining Intensity Over Time</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} domain={[0, 3]} ticks={[1, 2, 3]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value) => {
                const intensities = ['', 'Low', 'Medium', 'High'];
                return intensities[value];
              }}
            />
            <Bar dataKey="intensity" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendsChart;
