import { FileText, Download, Calendar, Filter, TrendingUp, BarChart3, FileSpreadsheet } from 'lucide-react';

export default function Reports() {
  const recentReports = [
    {
      id: 1,
      title: 'Q4 2025 Emissions Summary',
      type: 'Quarterly Report',
      date: '2025-11-20',
      size: '2.4 MB',
      status: 'ready',
    },
    {
      id: 2,
      title: 'Annual Carbon Audit 2025',
      type: 'Annual Report',
      date: '2025-11-15',
      size: '5.8 MB',
      status: 'ready',
    },
    {
      id: 3,
      title: 'Neutralisation Progress - November',
      type: 'Monthly Report',
      date: '2025-11-10',
      size: '1.2 MB',
      status: 'ready',
    },
    {
      id: 4,
      title: 'Sink Performance Analysis',
      type: 'Custom Report',
      date: '2025-11-05',
      size: '3.1 MB',
      status: 'ready',
    },
    {
      id: 5,
      title: 'Compliance Report - October',
      type: 'Compliance',
      date: '2025-10-28',
      size: '1.8 MB',
      status: 'archived',
    },
  ];

  const reportTemplates = [
    {
      name: 'Emissions Summary',
      description: 'Comprehensive overview of carbon emissions across all sites',
      icon: BarChart3,
      color: 'emerald',
    },
    {
      name: 'Neutralisation Progress',
      description: 'Track progress of carbon neutralisation initiatives',
      icon: TrendingUp,
      color: 'blue',
    },
    {
      name: 'Compliance Report',
      description: 'Regulatory compliance and certification documentation',
      icon: FileText,
      color: 'purple',
    },
    {
      name: 'Custom Analytics',
      description: 'Build custom reports with selected metrics and timeframes',
      icon: FileSpreadsheet,
      color: 'orange',
    },
  ];

  const metrics = [
    { label: 'Reports Generated', value: '156', period: 'This Year' },
    { label: 'Total Downloads', value: '1,243', period: 'All Time' },
    { label: 'Scheduled Reports', value: '8', period: 'Active' },
    { label: 'Avg. Generation Time', value: '3.2s', period: 'Last 30 days' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
          <p className="text-gray-400">Generate and manage carbon emissions reports</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
              <div className="text-xs text-gray-500">{metric.period}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Generate New Report</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTemplates.map((template, index) => (
              <button
                key={index}
                className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-emerald-600 rounded-lg p-6 text-left transition-all group"
              >
                <div className={`p-3 rounded-lg bg-${template.color}-600/10 w-fit mb-4 group-hover:bg-${template.color}-600/20 transition-all`}>
                  <template.icon className={`w-6 h-6 text-${template.color}-500`} />
                </div>
                <h3 className="text-white font-semibold mb-2">{template.name}</h3>
                <p className="text-sm text-gray-400">{template.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-semibold text-white mb-4 md:mb-0">Recent Reports</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button className="inline-flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all">
                <Calendar className="w-5 h-5 mr-2" />
                Date Range
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all">
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-all"
              >
                <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                  <div className="p-2 bg-emerald-600/10 rounded-lg">
                    <FileText className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{report.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{report.type}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      report.status === 'ready'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {report.status}
                  </span>
                  <button className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 pt-4 border-t border-gray-800">
            <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-all">
              Load More Reports
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Report Schedule</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <div className="text-white font-medium mb-1">Monthly Emissions Summary</div>
                  <div className="text-sm text-gray-400">Next: December 1, 2025</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <div className="text-white font-medium mb-1">Quarterly Compliance Report</div>
                  <div className="text-sm text-gray-400">Next: January 1, 2026</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <div className="text-white font-medium mb-1">Annual Carbon Audit</div>
                  <div className="text-sm text-gray-400">Next: January 15, 2026</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Export Options</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-all">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-emerald-500" />
                  <span className="text-white font-medium">PDF Document</span>
                </div>
                <Download className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-all">
                <div className="flex items-center space-x-3">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
                  <span className="text-white font-medium">Excel Spreadsheet</span>
                </div>
                <Download className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-lg transition-all">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-emerald-500" />
                  <span className="text-white font-medium">CSV Data</span>
                </div>
                <Download className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
