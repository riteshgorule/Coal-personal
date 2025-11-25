import React from 'react';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';

const AnalysisResults = ({ result }) => {
  if (!result) return null;

  const { detectionResults, emissionMetrics, imageName, location, analysisDate } = result;
  const predictions = detectionResults?.predictions || [];

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'high':
        return 'text-red-400 bg-red-500/10 border-red-500/50';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/50';
      case 'low':
        return 'text-green-400 bg-green-500/10 border-green-500/50';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/50';
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-2">Analysis Results</h3>
        <p className="text-sm text-gray-400">
          {imageName} {location && `• ${location}`}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(analysisDate).toLocaleString()}
        </p>
      </div>

      {/* Emission Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Coal Gangue</p>
          <p className="text-2xl font-bold text-white">{emissionMetrics.coalGangueCount}</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Push Top</p>
          <p className="text-2xl font-bold text-white">{emissionMetrics.pushTopCount}</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Push Panel</p>
          <p className="text-2xl font-bold text-white">{emissionMetrics.pushPanelCount}</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Scraper</p>
          <p className="text-2xl font-bold text-white">{emissionMetrics.scraperCount}</p>
        </div>
      </div>

      {/* Estimated Emission */}
      <div className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 rounded-lg p-6 mb-6 border border-emerald-700/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-emerald-300 mb-1">Estimated CO₂ Emissions</p>
            <p className="text-3xl font-bold text-white">
              {emissionMetrics.estimatedEmission.toFixed(2)} <span className="text-lg">kg</span>
            </p>
          </div>
          <Activity className="w-12 h-12 text-emerald-400" />
        </div>
      </div>

      {/* Mining Intensity */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-2">Mining Intensity</p>
        <div
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border ${getIntensityColor(
            emissionMetrics.miningIntensity
          )}`}
        >
          {emissionMetrics.miningIntensity === 'high' && <TrendingUp className="w-4 h-4" />}
          {emissionMetrics.miningIntensity === 'medium' && <Minus className="w-4 h-4" />}
          {emissionMetrics.miningIntensity === 'low' && <TrendingDown className="w-4 h-4" />}
          <span className="font-semibold capitalize">{emissionMetrics.miningIntensity}</span>
        </div>
      </div>

      {/* Detections List */}
      {predictions.length > 0 && (
        <div>
          <p className="text-sm text-gray-400 mb-3">Detections ({predictions.length})</p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {predictions.map((pred, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-900/50 rounded-lg p-3 border border-gray-700"
              >
                <div>
                  <p className="text-white font-medium capitalize">{pred.class}</p>
                  <p className="text-xs text-gray-400">
                    Position: ({Math.round(pred.x)}, {Math.round(pred.y)})
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-semibold">
                    {(pred.confidence * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-400">confidence</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
