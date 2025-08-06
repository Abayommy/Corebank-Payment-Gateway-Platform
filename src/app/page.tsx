'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatedCounter, FloatingCard } from '../components/UtilityComponents';
import Navigation from '../components/Navigation';

export default function EnhancedHomepage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    { , title: "Bank-Grade Security", desc: "ISO 27001 certified with end-to-end encryption" },
    { , title: "Lightning Fast", desc: "Sub-200ms response times globally" },
    { , title: "Real-time Analytics", desc: "Comprehensive transaction monitoring" },
    { , title: "Global Reach", desc: "847+ enterprise clients worldwide" }
  ];

  const metrics = [
    { label: "Transaction Volume", value: 50.2, suffix: "B", prefix: "$", color: "text-emerald-400" },
    { label: "Active Clients", value: 847, suffix: "+", prefix: "", color: "text-blue-400" },
    { label: "Avg Response Time", value: 180, suffix: "ms", prefix: "<", color: "text-purple-400" },
    { label: "Uptime", value: 99.97, suffix: "%", prefix: "", color: "text-green-400" }
  ];

  const caseStudies = [
    {
      company: "Global Bank Corp",
      industry: "Investment Banking",
      improvement: "40% faster settlements",
      volume: "$12.3B monthly",
      logo: "🏦"
    },
    {
      company: "FinTech Solutions",
      industry: "Digital Payments",
      improvement: "99.8% success rate",
      volume: "$8.7B monthly",
      logo: "💳"
    },
    {
      company: "Enterprise Retail",
      industry: "E-commerce",
      improvement: "60% cost reduction",
      volume: "$5.1B monthly",
      logo: "🛒"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Add floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section with Enhanced Animations */}
      <section className="relative px-6 py-20 text-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <FloatingCard>
            <h1 className={`text-5xl md:text-7xl font-bold text-white mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Next-Generation
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Payment Gateway
              </span>
              <br />
              Platform
            </h1>
          </FloatingCard>

          <p className={`text-xl text-gray-300 mb-12 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Powering enterprise-scale financial infrastructure with bank-grade security, 
            lightning-fast processing, and seamless integration capabilities.
          </p>

          {/* Action Buttons with Hover Effects */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link href="/payment-demo">
              <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-pulse-glow">
                Interactive Demo
                
              </button>
            </Link>
            <Link href="/analytics">
              <button className="group border-2 border-gray-600 hover:border-blue-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-blue-400/10">
                View Analytics
                
              </button>
            </Link>
          </div>

          {/* Animated Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <FloatingCard key={metric.label} delay={index * 0.2}>
                <div className="group bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700 hover:border-blue-500/50 rounded-xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl">
                  <div className={`text-3xl font-bold ${metric.color} mb-2`}>
                    {metric.prefix}
                    
                    {metric.suffix}
                  </div>
                  <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {metric.label}
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Interactive Elements */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Why Choose <span className="text-blue-400">CoreBank CPGP</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group cursor-pointer p-6 rounded-xl transition-all duration-500 hover:scale-105 ${
                    activeFeature === index 
                      ? 'bg-blue-600/20 border-blue-400 border-2' 
                      : 'bg-slate-800/30 border border-slate-700 hover:border-blue-500/50'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-center space-x-4">
                      className={`transition-all duration-300 ${
                        activeFeature === index ? 'text-blue-400 scale-110' : 'text-gray-400 group-hover:text-blue-400'
                      }`} 
                      size={32} 
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <FloatingCard delay={1}>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      {}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{features[activeFeature].title}</h3>
                    <p className="text-gray-300">{features[activeFeature].desc}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Performance</span>
                      <span className="text-green-400">99.97%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full animate-pulse" style={{ width: '99.97%' }}></div>
                    </div>
                  </div>
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </section>

      {/* Client Case Studies */}
      <section id="case-studies" className="px-6 py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Success <span className="text-blue-400">Stories</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <FloatingCard key={index} delay={index * 0.3}>
                <div className="group bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-blue-500/50 rounded-xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer">
                  <div className="text-4xl mb-4">{study.logo}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {study.company}
                  </h3>
                  <p className="text-blue-400 text-sm mb-4">{study.industry}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-green-400">
                      
                      <span className="text-sm">{study.improvement}</span>
                    </div>
                    <div className="flex items-center text-purple-400">
                      
                      <span className="text-sm">{study.volume}</span>
                    </div>
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Payment Infrastructure?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 847+ enterprise clients who trust CoreBank CPGP for their mission-critical transactions.
          </p>
          <Link href="/contact">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              Schedule Demo
              
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
