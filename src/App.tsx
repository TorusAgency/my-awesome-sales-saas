import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { SearchBar } from './components/SearchBar';
import { LeadsTable } from './components/LeadsTable';
import { DashboardMetrics } from './components/DashboardMetrics';
import { CallsView } from './components/CallsView';
import { SettingsView } from './components/SettingsView'; 
import { ConversionView } from './components/ConversionView'; 
import { SalesTrainingView } from './components/SalesTrainingView'; 
import { DateRangeFilter } from './components/DateRangeFilter'; 
import { Menu } from 'lucide-react';
import type { Lead, SearchHistory } from './types';

// Mock data for demonstration
const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 555-0123',
    company: 'Tech Corp',
    score: 85,
    status: 'qualified',
    lastContact: new Date('2024-03-10'),
    source: 'Website',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 555-0124',
    company: 'Design Co',
    score: 65,
    status: 'contacted',
    lastContact: new Date('2024-03-12'),
    source: 'LinkedIn',
    createdAt: new Date('2024-03-01'),
  },
   { 
    id: '3',
    name: 'Mike Davis',
    email: 'mike@example.com',
    phone: '+1 555-0125',
    company: 'Innovate Ltd',
    score: 95,
    status: 'closed', // Assuming 'closed' means won/lost for now
    lastContact: new Date('2024-03-05'),
    source: 'Referral',
    createdAt: new Date('2024-01-20'),
  },
   { 
    id: '4',
    name: 'Emily White',
    email: 'emily@example.com',
    phone: '+1 555-0126',
    company: 'Solutions Inc',
    score: 70,
    status: 'closed', // Another closed lead
    lastContact: new Date('2024-03-15'),
    source: 'Website',
    createdAt: new Date('2024-02-28'),
  },
];

const mockSearchHistory: SearchHistory[] = [
  { id: '1', query: 'Tech companies', timestamp: new Date('2024-03-12') },
  { id: '2', query: 'High value leads', timestamp: new Date('2024-03-11') },
  { id: '3', query: 'Recent contacts', timestamp: new Date('2024-03-10') },
];

// Helper to get default date range (e.g., last 30 days)
const getDefaultDateRange = (): [Date, Date] => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 30);
  return [startDate, endDate];
};

// Placeholder component for unhandled views
const PlaceholderView = ({ viewName }: { viewName: string }) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700">
    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Placeholder: {viewName}</h2>
    <p className="mt-2 text-gray-500 dark:text-gray-400">This view ({viewName}) has not been implemented yet.</p>
  </div>
);


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); 
  const [[startDate, endDate], setDateRange] = useState<[Date, Date]>(getDefaultDateRange()); // Date range state

  // Check initial dark mode state on load
  React.useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true' || 
        (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);


  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  const handleSort = (sort: { field: keyof Lead; direction: 'asc' | 'desc' }) => {
    console.log('Sorting by:', sort);
  };

  const handleBulkAction = (action: string, leadIds: string[]) => {
    console.log('Bulk action:', action, 'on leads:', leadIds);
  };

  const handleDateChange = (start: Date, end: Date) => {
    setDateRange([start, end]);
    console.log('Date range changed:', start, end);
    // TODO: Trigger data refetching based on the new date range
  };

  // Function to render the current view based on state
  const renderCurrentView = () => {
    // Simple routing based on the view string
    if (currentView === 'dashboard') {
       return (
          <div className="space-y-6">
            <DateRangeFilter 
              startDate={startDate} 
              endDate={endDate} 
              onDateChange={handleDateChange} 
            />
            <DashboardMetrics onNavigate={setCurrentView} />
          </div>
        );
    }
    if (currentView === 'leads') {
       return <LeadsTable leads={mockLeads} onSort={handleSort} onBulkAction={handleBulkAction} onNavigate={setCurrentView} />;
    }
    if (currentView === 'calls') {
       return <CallsView onNavigate={setCurrentView} />;
    }
     if (currentView === 'conversion' || currentView === 'deals/conversions') { // Handle main and subitem view
       return <ConversionView leads={mockLeads} />; 
    }
     if (currentView === 'salesTraining' || currentView.startsWith('salesTraining/')) { // Handle main and subitem views
       return <SalesTrainingView leads={mockLeads} />; 
    }
    if (currentView === 'settings') {
       return <SettingsView />;
    }
    
    // Fallback for other views (Prospection, Automations, Call Planning, Deals subitems, Analytics)
    // You can create specific components for these later
    if (currentView.startsWith('prospection/') || 
        currentView.startsWith('automations/') || 
        currentView.startsWith('callPlanning/') || 
        currentView.startsWith('deals/') ||
        currentView === 'analytics') {
       return <PlaceholderView viewName={currentView} />;
    }

    // Default fallback to dashboard
    return (
       <div className="space-y-6">
        <DateRangeFilter 
          startDate={startDate} 
          endDate={endDate} 
          onDateChange={handleDateChange} 
        />
        <DashboardMetrics onNavigate={setCurrentView} />
      </div>
    );
  };

  return (
    // Apply dark mode classes to the main container
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex text-gray-900 dark:text-gray-100"> 
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        currentView={currentView}
        onNavigate={setCurrentView} 
      />
      
      <div className="flex-1 flex flex-col">
        {/* Apply dark mode to header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700"> 
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button
                className="md:hidden p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex-1 ml-4 md:ml-0">
                <SearchBar
                  recentLeads={mockLeads}
                  searchHistory={mockSearchHistory}
                  onSearch={handleSearch}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8"> {/* Added padding */}
          <div className="max-w-7xl mx-auto">
            {renderCurrentView()} 
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
