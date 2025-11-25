import { Trees, Droplets, Wind, Plus, TrendingUp } from 'lucide-react';

export default function Sinks() {
  const sinkProjects = [
    {
      id: 1,
      name: 'Reforestation Project Alpha',
      type: 'Forest',
      location: 'North Region',
      capacity: 3200,
      current: 2890,
      status: 'active',
      progress: 90,
    },
    {
      id: 2,
      name: 'Wetland Restoration Beta',
      type: 'Wetland',
      location: 'East Region',
      capacity: 1800,
      current: 1620,
      status: 'active',
      progress: 90,
    },
    {
      id: 3,
      name: 'Grassland Conservation Gamma',
      type: 'Grassland',
      location: 'West Region',
      capacity: 2400,
      current: 1920,
      status: 'active',
      progress: 80,
    },
    {
      id: 4,
      name: 'Mangrove Planting Delta',
      type: 'Mangrove',
      location: 'South Region',
      capacity: 1500,
      current: 450,
      status: 'developing',
      progress: 30,
    },
  ];

  const sinkTypes = [
    {
      type: 'Reforestation',
      icon: Trees,
      count: 8,
      absorption: '4,200 tons/year',
      color: 'emerald',
    },
    {
      type: 'Wetlands',
      icon: Droplets,
      count: 5,
      absorption: '2,800 tons/year',
      color: 'blue',
    },
    {
      type: 'Grasslands',
      icon: Wind,
      count: 4,
      absorption: '1,230 tons/year',
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-white mb-2">Carbon Sinks</h1>
            <p className="text-gray-400">Manage natural and artificial carbon sequestration projects</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all">
            <Plus className="w-5 h-5 mr-2" />
            Add New Sink
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Total Capacity</div>
            <div className="text-3xl font-bold text-white mb-2">8,900</div>
            <div className="text-sm text-gray-500">tons CO₂/year</div>
            <div className="flex items-center text-sm text-emerald-500 mt-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12% growth
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Current Absorption</div>
            <div className="text-3xl font-bold text-white mb-2">6,880</div>
            <div className="text-sm text-gray-500">tons CO₂/year</div>
            <div className="text-sm text-gray-400 mt-2">77% of capacity</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Active Projects</div>
            <div className="text-3xl font-bold text-white mb-2">17</div>
            <div className="text-sm text-gray-500">sink sites</div>
            <div className="text-sm text-gray-400 mt-2">Across all regions</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Area Covered</div>
            <div className="text-3xl font-bold text-white mb-2">2,450</div>
            <div className="text-sm text-gray-500">hectares</div>
            <div className="text-sm text-emerald-500 mt-2">+180 ha this year</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {sinkTypes.map((sink, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-emerald-600 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${sink.color}-600/10`}>
                  <sink.icon className={`w-6 h-6 text-${sink.color}-500`} />
                </div>
                <span className="text-2xl font-bold text-white">{sink.count}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{sink.type}</h3>
              <div className="text-emerald-500 font-medium mb-1">{sink.absorption}</div>
              <div className="text-sm text-gray-400">Carbon absorption rate</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Active Sink Projects</h2>
          <div className="space-y-4">
            {sinkProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          project.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                        {project.type}
                      </span>
                      <span>{project.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div>
                      <div className="text-2xl font-bold text-white">{project.current.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">
                        of {project.capacity.toLocaleString()} tons CO₂
                      </div>
                    </div>
                    <div className="w-24">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-emerald-500 font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Monthly Absorption Trend</h2>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[45, 52, 58, 62, 68, 72, 75, 78, 82, 85, 88, 90].map((height, index) => (
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
            <h2 className="text-xl font-semibold text-white mb-6">Sink Performance</h2>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Absorption Efficiency</span>
                  <span className="text-emerald-500 font-bold">92%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Project Completion</span>
                  <span className="text-emerald-500 font-bold">77%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '77%' }}></div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Maintenance Score</span>
                  <span className="text-emerald-500 font-bold">88%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Biodiversity Index</span>
                  <span className="text-emerald-500 font-bold">85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
