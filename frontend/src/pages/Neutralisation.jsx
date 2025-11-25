import { Target, Award, Zap, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function Neutralisation() {
  const initiatives = [
    {
      id: 1,
      name: 'Solar Power Installation',
      category: 'Renewable Energy',
      impact: 1250,
      status: 'completed',
      progress: 100,
      startDate: '2024-01-15',
      completionDate: '2025-09-30',
    },
    {
      id: 2,
      name: 'Fleet Electrification Program',
      category: 'Transportation',
      impact: 890,
      status: 'in-progress',
      progress: 65,
      startDate: '2025-03-01',
      completionDate: '2026-06-30',
    },
    {
      id: 3,
      name: 'Energy Efficiency Upgrades',
      category: 'Operations',
      impact: 670,
      status: 'in-progress',
      progress: 45,
      startDate: '2025-06-01',
      completionDate: '2025-12-31',
    },
    {
      id: 4,
      name: 'Carbon Offset Purchasing',
      category: 'Offset',
      impact: 2100,
      status: 'active',
      progress: 30,
      startDate: '2025-08-01',
      completionDate: '2026-12-31',
    },
  ];

  const categories = [
    {
      name: 'Renewable Energy',
      impact: 1250,
      percentage: 28,
      icon: Zap,
      color: 'yellow',
    },
    {
      name: 'Transportation',
      impact: 890,
      percentage: 20,
      icon: Target,
      color: 'blue',
    },
    {
      name: 'Operations',
      impact: 670,
      percentage: 15,
      icon: Award,
      color: 'purple',
    },
    {
      name: 'Carbon Offsets',
      impact: 2100,
      percentage: 47,
      icon: CheckCircle,
      color: 'emerald',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-500';
      case 'in-progress':
        return 'bg-yellow-500/10 text-yellow-500';
      default:
        return 'bg-blue-500/10 text-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Carbon Neutralisation</h1>
          <p className="text-gray-400">Track initiatives and progress toward net-zero emissions</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Net Emissions</div>
            <div className="text-3xl font-bold text-white mb-2">4,220</div>
            <div className="text-sm text-gray-500">tons CO₂/year</div>
            <div className="text-sm text-emerald-500 mt-2">-15% reduction</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Neutralised</div>
            <div className="text-3xl font-bold text-white mb-2">4,910</div>
            <div className="text-sm text-gray-500">tons CO₂/year</div>
            <div className="text-sm text-gray-400 mt-2">54% of total</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Target Progress</div>
            <div className="text-3xl font-bold text-white mb-2">66%</div>
            <div className="text-sm text-gray-500">of 2030 goal</div>
            <div className="text-sm text-emerald-500 mt-2">On track</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-1">Active Initiatives</div>
            <div className="text-3xl font-bold text-white mb-2">12</div>
            <div className="text-sm text-gray-500">programs</div>
            <div className="text-sm text-gray-400 mt-2">Across all sites</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Neutralisation by Category</h2>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${category.color}-600/10`}>
                        <category.icon className={`w-5 h-5 text-${category.color}-500`} />
                      </div>
                      <div>
                        <div className="text-white font-medium">{category.name}</div>
                        <div className="text-sm text-gray-400">{category.impact.toLocaleString()} tons CO₂</div>
                      </div>
                    </div>
                    <div className="text-emerald-500 font-bold text-lg">{category.percentage}%</div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`bg-${category.color}-600 h-2 rounded-full transition-all`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Progress to Net-Zero</h2>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90 w-48 h-48">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-gray-800"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - 0.66)}`}
                    className="text-emerald-600"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white">66%</span>
                  <span className="text-sm text-gray-400 mt-1">Complete</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Current Emissions</span>
                <span className="text-white font-medium">4,220 tons CO₂</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">2030 Target</span>
                <span className="text-emerald-500 font-medium">0 tons CO₂</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estimated Completion</span>
                <span className="text-white font-medium">Q4 2029</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Active Initiatives</h2>
          <div className="space-y-4">
            {initiatives.map((initiative) => (
              <div
                key={initiative.id}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="flex items-start space-x-3 mb-4 lg:mb-0">
                    {getStatusIcon(initiative.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{initiative.name}</h3>
                      <div className="flex items-center space-x-3 text-sm">
                        <span className="text-gray-400">{initiative.category}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(initiative.status)}`}>
                          {initiative.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-500">
                      {initiative.impact.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">tons CO₂ reduction</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Start Date</div>
                    <div className="text-white font-medium">{initiative.startDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Target Completion</div>
                    <div className="text-white font-medium">{initiative.completionDate}</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-emerald-500 font-medium">{initiative.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all"
                      style={{ width: `${initiative.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}