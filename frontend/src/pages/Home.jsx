import { ArrowRight, BarChart3, Leaf, FileText, TrendingDown } from 'lucide-react';

export default function Home({ onNavigate }) {
  const features = [
    {
      icon: BarChart3,
      title: 'Real-time Monitoring',
      description: 'Track carbon emissions from coal mining operations in real-time with advanced analytics.',
    },
    {
      icon: Leaf,
      title: 'Carbon Sinks',
      description: 'Manage and monitor carbon sequestration efforts through natural and artificial sinks.',
    },
    {
      icon: TrendingDown,
      title: 'Neutralisation Strategies',
      description: 'Implement and track carbon neutralisation initiatives to achieve net-zero goals.',
    },
    {
      icon: FileText,
      title: 'Comprehensive Reports',
      description: 'Generate detailed reports for compliance, auditing, and strategic decision-making.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-900/20 via-gray-950 to-gray-950"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Track, Reduce, Neutralise
              <span className="block text-emerald-500 mt-2">Carbon Emissions</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
              Comprehensive carbon emissions tracking and management system for coal mining operations.
              Monitor, analyze, and reduce your environmental impact with data-driven insights.
            </p>
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-emerald-600/30"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-emerald-600 transition-all hover:shadow-lg hover:shadow-emerald-600/10"
            >
              <div className="bg-emerald-600/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-linear-to-r from-emerald-900/20 to-gray-900/20 border-t border-b border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-500 mb-2">500+</div>
              <div className="text-gray-400">Active Monitoring Sites</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-500 mb-2">2.5M</div>
              <div className="text-gray-400">Tons CO₂ Tracked</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-500 mb-2">98%</div>
              <div className="text-gray-400">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
