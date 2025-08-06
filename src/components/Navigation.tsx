'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Home, 
  BarChart3, 
  CreditCard, 
  Code, 
  MessageCircle, 
  ArrowRight,
  Zap
} from 'lucide-react';

const navigationItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/payment-demo', label: 'Payment Demo', icon: CreditCard },
  { href: '/api-playground', label: 'API Playground', icon: Code },
  { href: '/contact', label: 'Contact', icon: MessageCircle },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                CoreBank <span className="text-blue-400">CPGP</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group ${
                      isActive
                        ? 'text-blue-400 bg-blue-900/30'
                        : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
              
              {/* CTA Button */}
              <Link href="/contact">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 group">
                  <span>Get Started</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ${
          isOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50">
            <div className="px-6 py-4 space-y-3">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-blue-400 bg-blue-900/30'
                        : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t border-slate-700">
                <Link href="/contact">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>Get Started</span>
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-16"></div>
    </>
  );
}
