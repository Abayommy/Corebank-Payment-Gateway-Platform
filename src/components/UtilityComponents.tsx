'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X, Loader2, TrendingUp, TrendingDown } from 'lucide-react';
import React from 'react';

// ============================================================================
// LOADING COMPONENTS
// ============================================================================

export function LoadingSpinner({ size = 'md', className = '' }: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    
  );
}

export function LoadingCard() {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-slate-600 rounded w-3/4"></div>
        <div className="h-3 bg-slate-600 rounded w-1/2"></div>
        <div className="h-8 bg-slate-600 rounded w-full"></div>
      </div>
    </div>
  );
}

export function LoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
        
        <p className="text-white font-medium">{message}</p>
      </div>
    </div>
  );
}

// ============================================================================
// METRIC DISPLAY COMPONENTS
// ============================================================================

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  suffix?: string;
  prefix?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  suffix = '', 
  prefix = '', 
  trend = 'neutral',
  className = '' 
}: MetricCardProps) {
  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400'
  };


  return (
    <div className={`bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        {change !== undefined && TrendIcon && (
          <div className={`flex items-center space-x-1 ${trendColors[trend]}`}>
            
            <span className="text-xs">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>
    </div>
  );
}

// ============================================================================
// PROGRESS COMPONENTS
// ============================================================================

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

export function ProgressBar({ 
  value, 
  max = 100, 
  className = '', 
  showLabel = true,
  color = 'blue' 
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span>Progress</span>
          <span>{percentage.toFixed(1)}%</span>
        </div>
      )}
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div 
          className={`${colors[color]} h-2 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

// ============================================================================
// STATUS BADGE COMPONENT
// ============================================================================

interface StatusBadgeProps {
  status: 'success' | 'error' | 'warning' | 'info' | 'pending';
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, label, size = 'md' }: StatusBadgeProps) {
  const styles = {
    success: 'bg-green-900/30 text-green-400 border-green-500/30',
    error: 'bg-red-900/30 text-red-400 border-red-500/30',
    warning: 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30',
    info: 'bg-blue-900/30 text-blue-400 border-blue-500/30',
    pending: 'bg-gray-900/30 text-gray-400 border-gray-500/30'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`inline-flex items-center border rounded-full font-medium ${styles[status]} ${sizes[size]}`}>
      <span className={`w-2 h-2 rounded-full mr-2 ${
        status === 'success' ? 'bg-green-400' :
        status === 'error' ? 'bg-red-400' :
        status === 'warning' ? 'bg-yellow-400' :
        status === 'info' ? 'bg-blue-400' :
        'bg-gray-400'
      }`}></span>
      {label}
    </span>
  );
}

// ============================================================================
// MODAL COMPONENT
// ============================================================================

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className={`inline-block align-bottom bg-slate-800 border border-slate-700 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full ${sizes[size]}`}>
          <div className="px-6 py-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ANIMATED COUNTER (Enhanced)
// ============================================================================

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({ 
  end, 
  start = 0, 
  duration = 2000, 
  suffix = '', 
  prefix = '', 
  decimals = 0,
  className = ''
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = start + (end - start) * easeOutQuart;
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, start, duration, hasAnimated]);

  const formatNumber = (num: number) => {
    return decimals > 0 ? num.toFixed(decimals) : Math.floor(num).toLocaleString();
  };

  return (
    <span className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}

// ============================================================================
// FLOATING CARD COMPONENT
// ============================================================================

interface FloatingCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FloatingCard({ children, delay = 0, className = '' }: FloatingCardProps) {
  return (
    <div 
      className={`animate-float ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animation: `float 6s ease-in-out infinite ${delay}s`
      }}
    >
      {children}
    </div>
  );
}
