import { TrendingUp, TrendingDown, Activity, AlertTriangle } from 'lucide-react';
import { useEmissions } from '../EmissionsContext.jsx';
import DoughnutChart from '../components/DoughnutChart';

export default function Dashboard() {
  const { emissionRecords, emissionsSummary } = useEmissions();

  // Calculate statistics from context data
  const totalEmissions = emissionRecords.reduce((sum, record) => 
    sum + (record.calculations?.totalEmissions || 0), 0
  );

  const totalCarbonCredits = emissionRecords.reduce((sum, record) => 
    sum + (record.calculations?.carboncredits || 0), 0
  );

  const totalWorth = emissionRecords.reduce((sum, record) => 
    sum + (record.calculations?.worth || 0), 0
  );

  const alertCount = emissionRecords.filter(record => 
    (record.calculations?.totalEmissions || 0) > 3000
  ).length;

  const stats = [
    {
      label: 'Total Emissions',
      value: totalEmissions.toFixed(0),
      unit: 'kg CO₂',
      change: `${emissionRecords.length} records`,
      trend: 'up',
      icon: TrendingUp,
    },
    {
      label: 'Carbon Credits',
      value: totalCarbonCredits.toFixed(0),
      unit: 'credits',
      change: `$${totalWorth.toFixed(0)}`,
      trend: 'up',
      icon: Activity,
    },
    {
      label: 'This Month',
      value: emissionsSummary.month.toFixed(0),
      unit: 'kg CO₂',
      change: `${Math.round((emissionsSummary.month / totalEmissions) * 100)}%`,
      trend: 'down',
      icon: TrendingDown,
    },
    {
      label: 'High Alerts',
      value: alertCount.toString(),
      unit: 'sites',
      change: `${emissionRecords.length} total`,
      trend: 'up',
      icon: AlertTriangle,
    },
  ];

  // Get recent activity from emission records (last 4)
  const recentActivity = emissionRecords
    .slice(-4)
    .reverse()
    .map(record => {
      const emissions = record.calculations?.totalEmissions || 0;
      const status = emissions > 3000 ? 'alert' : emissions > 2000 ? 'warning' : 'normal';
      const timeAgo = Math.floor((Date.now() - new Date(record.timestamp).getTime()) / (1000 * 60 * 60));
      
      return {
        site: record.site || 'Unknown Site',
        emission: `${emissions.toFixed(0)} kg CO₂`,
        status: status,
        time: `${timeAgo} hours ago`
      };
    });

  // Calculate emission source percentages
  const totalExcavation = emissionRecords.reduce((sum, r) => 
    sum + (r.calculations?.excavationEmissions || 0), 0
  );
  const totalTransportation = emissionRecords.reduce((sum, r) => 
    sum + (r.calculations?.transportationEmissions || 0), 0
  );
  const totalEquipment = emissionRecords.reduce((sum, r) => 
    sum + (r.calculations?.equipmentEmissions || 0), 0
  );

  const excavationPercent = totalEmissions > 0 ? (totalExcavation / totalEmissions * 100) : 0;
  const transportationPercent = totalEmissions > 0 ? (totalTransportation / totalEmissions * 100) : 0;
  const equipmentPercent = totalEmissions > 0 ? (totalEquipment / totalEmissions * 100) : 0;

  // Calculate neutralization progress (carbon credits vs baseline)
  const totalBaseline = emissionRecords.reduce((sum, r) => 
    sum + (r.calculations?.baseline || 0), 0
  );
  const neutralizationProgress = totalBaseline > 0 
    ? ((totalCarbonCredits / totalBaseline) * 100).toFixed(0) 
    : 0;

  // Latest record (for breakdown/doughnut)
  const latestRecord = emissionRecords.length > 0 ? emissionRecords[emissionRecords.length - 1] : null;
  const latestResults = latestRecord?.calculations || {};

  return (
    <div className="min-h-screen pt-24 bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Monitor your carbon emissions in real-time</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${
                  stat.trend === 'down' ? 'bg-emerald-600/10' : 'bg-orange-600/10'
                }`}>
                  <stat.icon className={`w-5 h-5 ${
                    stat.trend === 'down' ? 'text-emerald-500' : 'text-orange-500'
                  }`} />
                </div>
                <span className={`text-sm font-medium ${
                  stat.trend === 'down' ? 'text-emerald-500' : 'text-orange-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm mb-1">{stat.unit}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Emissions Breakdown</h2>
            <div className="h-64 flex items-center justify-center">
              {latestRecord ? (
                <div className="w-full">
                  <DoughnutChart data={{
                    excavation: latestResults.excavationEmissions ?? 0,
                    transportation: latestResults.transportationEmissions ?? 0,
                    equipment: latestResults.equipmentEmissions ?? 0
                  }} />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No data available. Add emission records to see breakdown.
                </div>
              )}
            </div>
            <div className="text-center text-gray-400 text-sm mt-4">
              {latestRecord ? `Latest: ${latestRecord.site || 'Record'}` : 'No Records'}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'alert'
                          ? 'bg-red-500'
                          : activity.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-emerald-500'
                      }`}></div>
                      <div>
                        <div className="text-white font-medium">{activity.site}</div>
                        <div className="text-sm text-gray-400">{activity.emission}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No recent activity. Add emission records to see updates.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Emission Sources</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Excavation</span>
                  <span className="text-white">{excavationPercent.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${excavationPercent}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Transportation</span>
                  <span className="text-white">{transportationPercent.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${transportationPercent}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Equipment</span>
                  <span className="text-white">{equipmentPercent.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${equipmentPercent}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Carbon Credits Progress</h3>
            <div className="flex items-center justify-center h-40">
              <div className="relative w-32 h-32">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-800"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - neutralizationProgress / 100)}`}
                    className="text-emerald-600"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{neutralizationProgress}%</span>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-400 text-sm mt-4">Credits vs Baseline</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Summary Statistics</h3>
            <div className="space-y-3">
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">Total Sites</div>
                <div className="text-xl font-bold text-white">{emissionRecords.length}</div>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">Today's Emissions</div>
                <div className="text-xl font-bold text-white">{emissionsSummary.today.toFixed(0)} kg</div>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">Total Worth</div>
                <div className="text-xl font-bold text-emerald-500">${totalWorth.toFixed(0)}</div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Detailed Results Section */}
        {emissionRecords.length > 0 && (
          <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-white">Latest Emission Record Details</h2>
            {(() => {
              const latestRecord = emissionRecords[emissionRecords.length - 1];
              const results = latestRecord.calculations;
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Excavation Results */}
                  <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-2">Excavation</h4>
                    <p className="text-sm text-gray-300">Total: <span className="font-bold text-white">{(results.excavationEmissions ?? 0).toFixed(2)} kg CO₂</span></p>
                    <p className="text-sm text-gray-300">Per Capita: <span className="font-bold text-white">{(results.excavationPerCapita ?? 0).toFixed(2)} kg</span></p>
                    <p className="text-sm text-gray-300">Per Output: <span className="font-bold text-white">{(results.excavationPerOutput ?? 0).toFixed(2)} kg</span></p>
                  </div>

                  {/* Transportation Results */}
                  <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-2">Transportation</h4>
                    <p className="text-sm text-gray-300">Total: <span className="font-bold text-white">{(results.transportationEmissions ?? 0).toFixed(2)} kg CO₂</span></p>
                    <p className="text-sm text-gray-300">Per Capita: <span className="font-bold text-white">{(results.transportationPerCapita ?? 0).toFixed(2)} kg</span></p>
                    <p className="text-sm text-gray-300">Per Output: <span className="font-bold text-white">{(results.transportationPerOutput ?? 0).toFixed(2)} kg</span></p>
                  </div>

                  {/* Equipment Results */}
                  <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-2">Equipment</h4>
                    <p className="text-sm text-gray-300">Total: <span className="font-bold text-white">{(results.equipmentEmissions ?? 0).toFixed(2)} kg CO₂</span></p>
                    <p className="text-sm text-gray-300">Per Capita: <span className="font-bold text-white">{(results.equipmentPerCapita ?? 0).toFixed(2)} kg</span></p>
                    <p className="text-sm text-gray-300">Per Output: <span className="font-bold text-white">{(results.equipmentPerOutput ?? 0).toFixed(2)} kg</span></p>
                  </div>

                  {/* Total Results */}
                  <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-2">Total</h4>
                    <p className="text-sm text-gray-300">Total: <span className="font-bold text-white">{(results.totalEmissions ?? 0).toFixed(2)} kg CO₂</span></p>
                    <p className="text-sm text-gray-300">Per Capita: <span className="font-bold text-white">{(results.perCapitaEmissions ?? 0).toFixed(2)} kg</span></p>
                    <p className="text-sm text-gray-300">Per Output: <span className="font-bold text-white">{(results.perOutputEmissions ?? 0).toFixed(2)} kg</span></p>
                  </div>

                  

                  {/* Collected Info */}
                  <div className="md:col-span-2 bg-gray-800 border border-gray-700 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-2">Collected Info</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                      <p>Excavation: <span className="font-bold text-white">{latestRecord.excavation}</span></p>
                      <p>Transportation: <span className="font-bold text-white">{latestRecord.transportation}</span></p>
                      <p>Fuel: <span className="font-bold text-white">{latestRecord.fuel}</span></p>
                      <p>Equipment: <span className="font-bold text-white">{latestRecord.equipment}</span></p>
                      <p>Workers: <span className="font-bold text-white">{latestRecord.workers}</span></p>
                      <p>Fuel Type: <span className="font-bold text-white">{latestRecord.fuelType}</span></p>
                      <p>After Mitigation: <span className="font-bold text-white">{latestRecord.reduction}</span></p>
                      <p>Coal Production: <span className="font-bold text-white">{latestRecord.output}</span></p>
                    </div>
                  </div>

                  {/* Carbon Credits */}
                  <div className="md:col-span-2 bg-gray-800 border border-gray-700 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-2">Carbon Credits</h4>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>Baseline Emissions: <span className="font-bold text-white">{(results.baseline ?? 0).toFixed(2)} kg CO₂</span></p>
                      <p>After Mitigation: <span className="font-bold text-white">{(results.reduced ?? 0).toFixed(2)} kg CO₂</span></p>
                      <p>Total Carbon Credits: <span className="font-bold text-white">{(results.carboncredits ?? 0).toFixed(2)}</span></p>
                      <p>Net Worth: <span className="font-bold text-white">${(results.worth ?? 0).toFixed(2)}</span></p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}