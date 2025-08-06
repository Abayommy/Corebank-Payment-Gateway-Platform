'use client';

import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { ArrowUp, MessageCircle, Phone, Mail, Linkedin, Github } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  showScrollToTop?: boolean;
  showLiveChat?: boolean;
}

export default function AppLayout({ 
  children, 
  showFooter = true, 
  showScrollToTop = true,
  showLiveChat = true 
}: LayoutProps) {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showChatWidget, setShowChatWidget] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <main className="relative">
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
        <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">CB</span>
                  </div>
                  <span className="text-xl font-bold text-white">
                    CoreBank <span className="text-blue-400">CPGP</span>
                  </span>
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  Next-generation payment gateway platform powering enterprise-scale 
                  financial infrastructure with bank-grade security and lightning-fast processing.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                    <Github size={20} />
                  </a>
                  <a href="mailto:contact@corebank-cpgp.com" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                    <Mail size={20} />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Platform</h3>
                <div className="space-y-2">
                  <a href="/analytics" className="block text-gray-400 hover:text-white transition-colors duration-300">Analytics</a>
                  <a href="/payment-demo" className="block text-gray-400 hover:text-white transition-colors duration-300">Payment Demo</a>
                  <a href="/api-playground" className="block text-gray-400 hover:text-white transition-colors duration-300">API Playground</a>
                  <a href="/contact" className="block text-gray-400 hover:text-white transition-colors duration-300">Contact</a>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-white font-semibold mb-4">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Mail size={16} />
                    <span className="text-sm">sales@corebank-cpgp.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Phone size={16} />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    <div>123 Financial District</div>
                    <div>New York, NY 10004</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 CoreBank CPGP. Built by Abayomi Ajayi - Senior Product Manager & Banking Solutions Architect
              </p>
              <p className="text-gray-500 text-xs mt-2 md:mt-0">
                11+ Years Experience | Enterprise Payment Systems | Product Strategy
              </p>
            </div>
          </div>
        </footer>
      )}

      {/* Scroll to Top Button */}
      {showScrollToTop && showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg z-40"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Live Chat Widget */}
      {showLiveChat && (
        <div className="fixed bottom-8 left-8 z-40">
          {showChatWidget && (
            <div className="mb-4 w-80 bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-2xl animate-slideUp">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold">Need Help?</h3>
                <button
                  onClick={() => setShowChatWidget(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <span className="sr-only">Close</span>
                  <div className="w-5 h-5 flex items-center justify-center">×</div>
                </button>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Have questions about our payment platform? Our team is here to help!
              </p>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-slate-700 rounded transition-colors duration-200">
                  💬 Start a conversation
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-slate-700 rounded transition-colors duration-200">
                  📧 Send us an email
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-slate-700 rounded transition-colors duration-200">
                  📞 Schedule a call
                </button>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setShowChatWidget(!showChatWidget)}
            className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <MessageCircle size={24} />
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
