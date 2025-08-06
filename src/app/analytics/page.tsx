'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Clock, Shield, Filter, Calendar } from 'lucide-react';

// Sample data generators
const generateTransactionData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      hour: `${i}:00`,
      volume: Math.floor(Math.random() * 50000) + 20000,
      transactions: Math.floor(Math.random() * 500) + 100,
      successRate: 99.8 + Math.random() * 0.15,
    });
  }
  return data;
};

const generateRegionalData = () => [
  { region: 'North America', volume: 18500000000, transactions: 2400000, color: '#3B82F6' },
  { region: 'Europe', volume: 15200000000, transactions: 1950000, color: '#8B5CF6' },
  { region: 'Asia Pacific', volume: 12800000000, transactions: 3200000, color: '#10B981' },
  { region: 'Latin America', volume: 2100000000, transactions: 450000, color: '#F59E0B' },
  { region: 'Middle East & Africa', volume: 1600000000, transactions: 320000, color: '#EF4444' },
];

const generatePaymentMethodData = () => [
  { name: 'Wire Transfer', value: 45, amount: '$22.5B', color: '#3B82F6' },
  { name: 'ACH', value: 30, amount: '$15.1B', color: '#8B5CF6' },
  { name: 'Real-time Payments', value: 15, amount: '$7.5B', color: '#10B981' },
  { name: 'Cross-border', value: 10, amount: '$5.0B', color: '#F59E0B' },
];

const generatePerformanceMetrics = () => [
  { metric: 'Response Time', value: 180, unit: 'ms', trend: -5.2, status: 'excellent' },
  { metric: 'Success Rate', value: 99.97, unit: '%', trend: 0.12, status: 'excellent' },
  { metric: 'Throughput', value: 2847, unit: 'TPS', trend: 8.5, status: 'good' },
  { metric: 'Error Rate', value: 0.03, unit: '%', trend: -12.3, status: 'excellent' },
];

export default function AnalyticsDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('volume');
  const [isRealTime, setIsRealTime] = useState(true);
  const [transactionData, setTransactionData] = useState(generateTransactionData());
  const [regionalData] = useState(generateRegionalData());
  const [paymentMethodData] = useState(generatePaymentMethodData());
  const [performanceMetrics, setPerformanceMetrics] = useState(generatePerformanceMetrics());

  // Simulate real-time updates
  useEffect(() => {
    if (!isRealTime) return;
    
    const interval = setInterval(() => {
      setTransactionData(generateTransactionData());
      setPerformanceMetrics(generatePerformanceMetrics());
    }, 5000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  const MetricCard = ({ metric, value, unit, trend, status }: any) => (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-300 text-sm font-medium">{metric}</h3>
        <div className={`flex items-center space-x-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ?  : }
          <span className="text-xs">{Math.abs(trend)}%</span>
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <span className={`text-3xl font-bold ${
          status === 'excellent' ? 'text-green-400' : 
          status === 'good' ? 'text-blue-400' : 'text-yellow-400'
        }`}>
          {value}
        </span>
        <span className="text-gray-400 text-sm">{unit}</span>
      </div>
      <div className="mt-3">
        <div className={`h-1 rounded-full ${
          status === 'excellent' ? 'bg-green-400' : 
          status === 'good' ? 'bg-blue-400' : 'bg-yellow-400'
        }`} style={{ width: `${Math.min(value, 100)}%` }}></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Real-time payment processing insights</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <label className="text-gray-300 text-sm">Real-time Updates:</label>
              <button
                onClick={() => setIsRealTime(!isRealTime)}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  isRealTime ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  isRealTime ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
            
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            
          ))}
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Transaction Volume Chart */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-700/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Transaction Volume (24h)</h2>
              <div className="flex items-center space-x-2">
                
                <span className="text-green-400 font-semibold">
                  {formatCurrency(transactionData.reduce((sum, item) => sum + item.volume, 0))}
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={transactionData}>
                <defs>
                  <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                
                
                <YAxis stroke="#9CA3AF" tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  formatter={(value) => [formatCurrency(value as number), 'Volume']}
                />
                <Area 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#volumeGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Success Rate Chart */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-700/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Success Rate Trend</h2>
              <div className="flex items-center space-x-2">
                <Shield className="text-green-400" size={20} />
                <span className="text-green-400 font-semibold">99.97%</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionData}>
                
                
                <YAxis 
                  stroke="#9CA3AF" 
                  domain={[99.5, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  formatter={(value) => [`${(value as number).toFixed(2)}%`, 'Success Rate']}
                />
                <Line 
                  type="monotone" 
                  dataKey="successRate" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#065F46' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Performance and Payment Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* FIXED Regional Distribution */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-700/30 transition-all duration-300">
            <h2 className="text-xl font-bold text-white mb-6">Regional Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={regionalData}
                margin={{ top: 5, right: 30, left: 20, bottom: 80 }}
              >
                
                <XAxis 
                  dataKey="region" 
                  stroke="#9CA3AF"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  formatter={(value) => [formatCurrency(value as number), 'Volume']}
                />
                <Bar dataKey="volume" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            
            {/* Regional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {regionalData.slice(0, 4).map((region, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: region.color }}
                    ></div>
                    <span className="text-white text-xs font-medium">{region.region}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-semibold text-xs">
                      {formatCurrency(region.volume)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-700/30 transition-all duration-300">
            <h2 className="text-xl font-bold text-white mb-6">Payment Methods</h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                    formatter={(value) => [`${value}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {paymentMethodData.map((method, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: method.color }}
                  ></div>
                  <div>
                    <div className="text-white text-sm font-medium">{method.name}</div>
                    <div className="text-gray-400 text-xs">{method.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Real-time Activity</h2>
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-white text-sm">
                      Wire transfer processed: ${(Math.random() * 1000000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </div>
                    <div className="text-gray-400 text-xs">
                      Client: {['HSBC', 'JPMorgan', 'Goldman Sachs', 'Bank of America', 'Wells Fargo'][Math.floor(Math.random() * 5)]}
                    </div>
                  </div>
                </div>
                <div className="text-gray-400 text-xs">
                  {Math.floor(Math.random() * 60)}s ago
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
