import React from 'react';
import { CheckCircle, XCircle, TrendingUp, BarChart, User } from 'lucide-react';
import type { Lead } from '../types';

interface ConversionViewProps {
  leads: Lead[]; // Accept leads data
}

export function ConversionView({ leads }: ConversionViewProps) {
  // Filter leads - assuming 'closed' status needs further differentiation
  // For now, let's assume half are won, half are lost for demonstration
  const closedLeads = leads.filter(lead => lead.status === 'closed');
  const wonLeads = closedLeads.slice(0, Math.ceil(closedLeads.length / 2)); // Example split
  const lostLeads = closedLeads.slice(Math.ceil(closedLeads.length / 2)); // Example split
  
  // Calculate conversion rate based on ALL leads (or define a different base if needed)
  const totalLeadsConsidered = leads.length; // Or filter by date range, etc.
  const conversionRate = totalLeadsConsidered > 0 ? (wonLeads.length / totalLeadsConsidered) * 100 : 0;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Conversion Analysis</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Leads Won</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{wonLeads.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
          <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Leads Lost</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{lostLeads.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
          <TrendingUp className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Conversion Rate</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{conversionRate.toFixed(1)}%</p>
        </div>
      </div>

      {/* Placeholder for Insights */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
          <BarChart className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
          Key Conversion Insights (Placeholder)
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>This section will display key insights derived from won and lost leads.</p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Analysis of common reasons for lost deals.</li>
            <li>Characteristics of high-converting leads.</li>
            <li>Effectiveness of different lead sources.</li>
            <li>Time-to-conversion analysis.</li>
          </ul>
          <p><i>(Data processing and visualization components to be implemented)</i></p>
        </div>
      </div>

       {/* Won/Lost Lead Lists */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
           <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Won Leads ({wonLeads.length})</h2>
           {wonLeads.length > 0 ? (
             <ul className="space-y-3">
               {wonLeads.map(lead => (
                 <li key={lead.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                   <div className="flex items-center">
                     <User className="h-4 w-4 mr-2 text-green-500"/>
                     <span className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</span>
                     <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({lead.company})</span>
                   </div>
                   {/* Add more details or actions if needed */}
                 </li>
               ))}
             </ul>
           ) : (
             <p className="text-sm text-gray-500 dark:text-gray-400 italic">No leads marked as 'Won' in this period.</p>
           )}
         </div>
         <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
           <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Lost Leads ({lostLeads.length})</h2>
            {lostLeads.length > 0 ? (
             <ul className="space-y-3">
               {lostLeads.map(lead => (
                 <li key={lead.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                   <div className="flex items-center">
                     <User className="h-4 w-4 mr-2 text-red-500"/>
                     <span className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</span>
                     <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({lead.company})</span>
                   </div>
                   {/* Add more details or actions if needed */}
                 </li>
               ))}
             </ul>
           ) : (
             <p className="text-sm text-gray-500 dark:text-gray-400 italic">No leads marked as 'Lost' in this period.</p>
           )}
         </div>
       </div>
    </div>
  );
}
