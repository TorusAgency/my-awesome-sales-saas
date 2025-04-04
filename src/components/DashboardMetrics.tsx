import React from 'react';
import { ArrowUpRight, ArrowDownRight, Users, Phone, Target, DollarSign } from 'lucide-react';
import type { SalesMetric } from '../types';

interface DashboardMetricsProps {
  onNavigate: (view: string) => void;
}

const metrics: SalesMetric[] = [
  {
    id: '1',
    name: 'Total Leads',
    value: 2547,
    trend: 12.5,
    icon: 'users',
    linkTo: 'leads'
  },
  {
    id: '2',
    name: 'Calls Analyzed',
    value: 1123,
    trend: 8.2,
    icon: 'phone',
    linkTo: 'calls'
  },
  {
    id: '3',
    name: 'Conversion Rate',
    value: 28.6,
    trend: -2.4,
    icon: 'target',
    linkTo: 'conversion' // Added link to conversion page
  },
  {
    id: '4',
    name: 'Revenue',
    value: 845720,
    trend: 15.3,
    icon: 'dollar'
    // No link for revenue in this example
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'users':
      return <Users className="w-6 h-6 text-indigo-600" />; 
    case 'phone':
      return <Phone className="w-6 h-6 text-blue-600" />; 
    case 'target':
      return <Target className="w-6 h-6 text-green-600" />; 
    case 'dollar':
      return <DollarSign className="w-6 h-6 text-yellow-600" />; 
    default:
      return null;
  }
};

export function DashboardMetrics({ onNavigate }: DashboardMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 ${ // Added border
            metric.linkTo ? 'cursor-pointer hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700' : ''
          } transition-all duration-200`}
          onClick={() => metric.linkTo && onNavigate(metric.linkTo)}
          role={metric.linkTo ? 'button' : 'presentation'}
          tabIndex={metric.linkTo ? 0 : undefined} 
           onKeyDown={(e) => { if (metric.linkTo && (e.key === 'Enter' || e.key === ' ')) onNavigate(metric.linkTo); }} 
        >
          <div className="flex items-center justify-between">
            {/* Icon background */}
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"> 
              {getIcon(metric.icon)}
            </div>
            {/* Trend indicator */}
            <span className={`flex items-center text-sm font-medium ${ 
              metric.trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' 
            }`}>
              {metric.trend >= 0 ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              {Math.abs(metric.trend)}%
            </span>
          </div>
          <div className="mt-4">
            {/* Metric name */}
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{metric.name}</h3>
            {/* Metric value */}
            <p className="text-3xl font-semibold mt-1 text-gray-900 dark:text-white"> 
              {metric.icon === 'dollar' ? '$' : ''}
              {metric.value.toLocaleString()}
              {metric.icon === 'target' ? '%' : ''}
            </p>
          </div>
          {/* View details link */}
          {metric.linkTo && (
            <div className="mt-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline"> 
              View details →
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
