import { TrendingUp, TrendingDown, Activity, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      label: 'Total Emissions',
      value: '12,450',
      unit: 'tons CO₂',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      label: 'Carbon Sinks',
      value: '8,230',
      unit: 'tons CO₂',
      change: '+8%',
      trend: 'up',
      icon: Activity,
    },
    {
      label: 'Net Emissions',
      value: '4,220',
      unit: 'tons CO₂',
      change: '-15%',
      trend: 'down',
      icon: TrendingDown,
    },
    {
      label: 'Active Alerts',
      value: '7',
      unit: 'incidents',
      change: '+2',
      trend: 'up',
      icon: AlertTriangle,
    },
  ];

  const recentActivity = [
    { site: 'Mine Site A', emission: '2,450 tons CO₂', status: 'normal', time: '2 hours ago' },
    { site: 'Mine Site B', emission: '3,120 tons CO₂', status: 'warning', time: '4 hours ago' },
    { site: 'Mine Site C', emission: '1,890 tons CO₂', status: 'normal', time: '6 hours ago' },
    { site: 'Mine Site D', emission: '2,760 tons CO₂', status: 'alert', time: '8 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 py-8">
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
            <h2 className="text-xl font-semibold text-white mb-6">Emissions Trend</h2>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[65, 75, 60, 80, 70, 85, 75, 90, 80, 85, 75, 70].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-linear-to-t from-emerald-600 to-emerald-400 rounded-t transition-all hover:from-emerald-500 hover:to-emerald-300"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{index + 1}</span>
                </div>
              ))}
            </div>
            <div className="text-center text-gray-400 text-sm mt-4">Last 12 Months</div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
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
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Emission Sources</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Excavation</span>
                  <span className="text-white">45%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Transportation</span>
                  <span className="text-white">30%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Processing</span>
                  <span className="text-white">25%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Neutralisation Progress</h3>
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
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.66)}`}
                    className="text-emerald-600"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">66%</span>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-400 text-sm mt-4">Of target achieved</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg transition-all text-sm font-medium">
                Generate Report
              </button>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-all text-sm font-medium">
                Add New Site
              </button>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-all text-sm font-medium">
                View Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
