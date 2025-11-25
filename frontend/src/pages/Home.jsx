import { ArrowRight, BarChart3, Leaf, FileText, TrendingDown, CheckCircle, Users, Globe, Zap, Shield, Clock } from 'lucide-react';
import HeroSection from '../components/Hero';

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
      <div className="w-full min-h-screen">
  <HeroSection />
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

      <div className="bg-gradienzt-to-r from-emerald-900/20 to-gray-900/20 border-t border-b border-gray-800 py-16">
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

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Get started with CarbonTrack in three simple steps and begin your journey towards carbon neutrality.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="bg-emerald-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-4">1</div>
            <h3 className="text-xl font-semibold text-white mb-3">Connect Your Data</h3>
            <p className="text-gray-400">Integrate your mining operations data through our secure API or manual upload system.</p>
            <div className="hidden md:block absolute top-5 left-14 w-full h-0.5 bg-gradient-to-r from-emerald-600 to-transparent"></div>
          </div>
          <div className="relative">
            <div className="bg-emerald-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-4">2</div>
            <h3 className="text-xl font-semibold text-white mb-3">Monitor & Analyze</h3>
            <p className="text-gray-400">Our AI-powered platform analyzes your emissions and identifies optimization opportunities.</p>
            <div className="hidden md:block absolute top-5 left-14 w-full h-0.5 bg-gradient-to-r from-emerald-600 to-transparent"></div>
          </div>
          <div>
            <div className="bg-emerald-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-4">3</div>
            <h3 className="text-xl font-semibold text-white mb-3">Reduce & Report</h3>
            <p className="text-gray-400">Implement reduction strategies and generate compliance-ready reports automatically.</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose CarbonTrack?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Industry-leading features designed specifically for coal mining operations.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="bg-emerald-600/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Real-Time Processing</h3>
                <p className="text-gray-400 text-sm">Process millions of data points in real-time for accurate emission tracking.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-emerald-600/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Enterprise Security</h3>
                <p className="text-gray-400 text-sm">Bank-grade encryption and compliance with international data standards.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-emerald-600/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Global Compliance</h3>
                <p className="text-gray-400 text-sm">Meet regulatory requirements across all major jurisdictions worldwide.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-emerald-600/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Dedicated Support</h3>
                <p className="text-gray-400 text-sm">24/7 expert support from our team of environmental specialists.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-emerald-600/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Quick Setup</h3>
                <p className="text-gray-400 text-sm">Get up and running in minutes with our streamlined onboarding process.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-emerald-600/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Verified Accuracy</h3>
                <p className="text-gray-400 text-sm">Third-party verified algorithms ensure precise emission calculations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Industry Leaders</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">See what our clients say about their experience with CarbonTrack.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-300 mb-4">"CarbonTrack has revolutionized how we monitor our environmental impact. The real-time insights have helped us reduce emissions by 30%."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">JM</div>
              <div>
                <div className="text-white font-medium">James Mitchell</div>
                <div className="text-gray-500 text-sm">CEO, GreenMine Corp</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-300 mb-4">"The compliance reporting alone has saved us hundreds of hours. Our audits are now seamless and stress-free."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">SP</div>
              <div>
                <div className="text-white font-medium">Sarah Patel</div>
                <div className="text-gray-500 text-sm">Environmental Officer, CoalTech</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-300 mb-4">"Outstanding platform with incredible accuracy. The team's support has been exceptional throughout our implementation."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">RK</div>
              <div>
                <div className="text-white font-medium">Robert Kim</div>
                <div className="text-gray-500 text-sm">Operations Director, MineWorks</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-emerald-900/40 to-emerald-700/20 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Net-Zero Journey?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Join hundreds of mining operations already using CarbonTrack to reduce their environmental impact and meet sustainability goals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-emerald-600/30"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 border border-emerald-500 text-emerald-400 hover:bg-emerald-900/30 font-semibold rounded-lg transition-all">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-emerald-600 p-2 rounded-lg">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xl font-bold">CarbonTrack</span>
              </div>
              <p className="text-gray-400 text-sm">Empowering coal mining operations to achieve carbon neutrality through advanced tracking and analytics.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-emerald-500 transition">Features</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition">Integrations</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-emerald-500 transition">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition">Careers</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-emerald-500 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2025 CarbonTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
